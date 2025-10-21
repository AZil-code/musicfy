import { useEffect, useMemo } from 'react'

import { addSong, removeSong } from '../store/actions/station.actions.js'

export function AddToStationsModal({ song, stations = [], onClose }) {
    const playableSong = useMemo(() => {
        if (!song || typeof song !== 'object') return null
        if (song._id) return song
        return null
    }, [song])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    const toggleStation = async (station) => {
        if (!playableSong || !station) return
        const stationCopy = {
            ...station,
            songs: Array.isArray(station.songs) ? [...station.songs] : [],
        }
        const exists = Array.isArray(station.songs) && station.songs.some((item) => item?._id === playableSong._id)
        try {
            if (exists) {
                await removeSong(stationCopy, playableSong)
            } else {
                await addSong(stationCopy, playableSong)
            }
        } catch (error) {
            console.error('AddToStationsModal -> toggle failed', error)
        }
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal-content add-to-stations-modal"
                role="dialog"
                aria-modal="true"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="modal-header">
                    <h1 className="modal-title">Add to playlist</h1>
                    <button type="button" className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className="add-to-stations-body">
                    {!playableSong && <p className="add-to-stations-empty">Select a song to add.</p>}
                    {playableSong && !stations.length && (
                        <p className="add-to-stations-empty">No playlists yet. Create one to get started.</p>
                    )}
                    {playableSong && stations.length ? (
                        <ul className="add-to-stations-modal-list">
                            {stations.map((station) => {
                                const hasSong =
                                    Array.isArray(station?.songs) &&
                                    station.songs.some((item) => item && item._id === playableSong._id)
                                return (
                                    <li key={station._id}>
                                        <button
                                            type="button"
                                            className={`add-to-stations-modal-item ${hasSong ? 'is-added' : ''}`}
                                            onClick={() => toggleStation(station)}
                                        >
                                            <span className="add-to-stations-modal-name">
                                                {station.name || 'Untitled station'}
                                            </span>
                                            <span className="add-to-stations-modal-status">{hasSong ? 'Saved' : 'Add'}</span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
