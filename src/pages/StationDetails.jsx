import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { SongList } from '../cmps/SongList.jsx'
import { setCurrentSong, play, pause } from '../store/actions/player.actions.js'
import { fetchStations, removeSong, updateStationArtwork } from '../store/actions/station.actions.js'

export function StationDetails({ stationId }) {
    const params = useParams()
    const selectedStationId = useSelector((storeState) => storeState.stationModule.selectedStationId)
    const stations = useSelector((storeState) => storeState.stationModule.stations)
    const { currentSong, isPlaying } = useSelector((storeState) => storeState.playerModule)

    const activeStationId = selectedStationId || stationId || params.stationID

    useEffect(() => {
        if (!stations.length) fetchStations()
    }, [stations.length])

    const station =
        activeStationId && Array.isArray(stations)
            ? stations.find((currStation) => currStation && currStation._id === activeStationId) || null
            : null

    const songs = station && Array.isArray(station.songs) ? station.songs : []
    const firstSong = songs.length ? songs[0] : null
    const coverFromStation =
        station && typeof station.coverImage === 'string'
            ? station.coverImage.trim()
            : ''
    const coverImage =
        coverFromStation ||
        (firstSong && firstSong.imgUrl) ||
        'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=600&q=60'

    useEffect(() => {
        if (!station || !Array.isArray(station.songs) || !station.songs.length) return
        const leadSong = station.songs[0]
        const firstSongImg = leadSong && leadSong.imgUrl
        if (!firstSongImg) return
        updateStationArtwork(station._id, firstSongImg)
    }, [
        station && station._id,
        firstSong && firstSong.imgUrl,
    ])

    const handleSelectSong = (song) => {
        console.log('song', song)
        if (!song) return
        const selectedId = song._id
        const currentId = currentSong ? currentSong._id : null

        console.log('test')

        if (selectedId && currentId && String(selectedId) === String(currentId)) {
            if (isPlaying) pause()
            else play()
        } else {
            const queue = songs
            const queueIndex = queue.findIndex(
                (currSong) => currSong && String(currSong._id) === String(selectedId)
            )
            const queueId = station ? station._id || '' : ''

            setCurrentSong(song, {
                queue,
                queueId,
                queueIndex: queueIndex >= 0 ? queueIndex : 0,
            })
            play()
        }
    }

    const handleRemoveSong = async (song) => {
        if (!station || !song) return
        try {
            await removeSong(
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
            <div className="station-details-content">
                <header className="station-details-header">
                    <div className="station-details-cover">
                        <img src={coverImage} alt={`${station.name || 'Station'} cover`} />
                    </div>
                    <h1 className="station-details-title">{station.name || 'Untitled station'}</h1>
                </header>

                <SongList
                    songs={songs}
                    onSelectSong={handleSelectSong}
                    onRemoveSong={handleRemoveSong}
                    currentSongId={(currentSong && currentSong._id) || ''}
                    isPlaying={isPlaying}
                />
            </div>
        </div>
    )
}
