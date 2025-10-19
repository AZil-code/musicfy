import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { SongList } from '../cmps/SongList.jsx'
import { loadSongs } from '../store/actions/song.actions.js'
import { setCurrentSong as setCurrentSongAction } from '../store/actions/player.actions.js'

export function StationDetails({ stationId }) {
    const params = useParams()
    const effectiveId = stationId || params.stationID

    const { songs, isLoading } = useSelector((storeState) => storeState.songModule)

    useEffect(() => {
        loadSongs()
    }, [])

    const songIds = useMemo(() => songs.map((song) => song._id || song.id).filter(Boolean), [songs])

    const handleSelectSong = (song) => {
        if (!song) return
        setCurrentSongAction(song)
    }

    if (!songIds.length && isLoading) {
        return (
            <div className="page-station-details">
                <p>Loading station…</p>
            </div>
        )
    }

    return (
        <div className="page-station-details">
            <header className="station-details__header">
                <h1>{'Untitled station'}</h1>
                <p>{'test'}</p>
            </header>

            {isLoading ? (
                <div className="song-list--loading">Loading songs…</div>
            ) : (
                <SongList songIds={songIds} songs={songs} onSelectSong={handleSelectSong} />
            )}
        </div>
    )
}
