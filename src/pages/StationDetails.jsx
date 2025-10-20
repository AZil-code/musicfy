import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { SongList } from '../cmps/SongList.jsx'
import { setCurrentSong as setCurrentSongAction, play, pause } from '../store/actions/player.actions.js'
import { fetchStations, removeSong as removeSongFromStation } from '../store/actions/station.actions.js'

export function StationDetails({ stationId }) {
    const params = useParams()
    const selectedStationId = useSelector((storeState) => storeState.stationModule.selectedStationId)
    const stations = useSelector((storeState) => storeState.stationModule.stations)
    const { currentSong, isPlaying } = useSelector((storeState) => storeState.playerModule)

    const activeStationId = selectedStationId || stationId || params.stationID

    useEffect(() => {
        if (!stations.length) fetchStations()
    }, [stations.length])

    const station = useMemo(() => {
        if (!activeStationId) return null
        return (
            stations.find((currStation) => currStation && currStation._id === activeStationId) || null
        )
    }, [stations, activeStationId])

    const songs = station?.songs || []

    const handleSelectSong = (song) => {
        if (!song) return
        const selectedId = song._id
        const currentId = currentSong?._id

        if (selectedId && currentId && String(selectedId) === String(currentId)) {
            if (isPlaying) pause()
            else play()
        } else {
            setCurrentSongAction(song)
            play()
        }
    }

    const handleRemoveSong = async (song) => {
        if (!station || !song) return
        try {
            await removeSongFromStation(
                {
                    ...station,
                    songs: [...(station.songs || [])],
                },
                song
            )
        } catch (error) {
            console.error('StationDetails -> failed to remove song', error)
        }
    }

    if (!station) {
        return (
            <div className="page-station-details">
                <p>{stations.length ? 'Station not found.' : 'Loading station…'}</p>
            </div>
        )
    }

    return (
        <div className="page-station-details">
            <header className="station-details__header">
                <h1>{station.name || 'Untitled station'}</h1>
                {station.description ? <p>{station.description}</p> : null}
            </header>

            <SongList songs={songs} onSelectSong={handleSelectSong} onRemoveSong={handleRemoveSong} />
        </div>
    )
}
