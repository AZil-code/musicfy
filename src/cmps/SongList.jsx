import { useMemo } from 'react'

import { SongPreview } from './SongPreview.jsx'

export function SongList({ songIds = [], songs = [], onSelectSong }) {
    const normalizedIds = useMemo(
        () => songIds.filter(Boolean).map(String),
        [songIds]
    )

    const orderedSongs = useMemo(() => {
        if (!Array.isArray(songs) || !songs.length) return []
        if (!normalizedIds.length) return songs

        const songMap = new Map(
            songs.map((song, idx) => [String(song._id || song.id || idx), song])
        )

        const arranged = normalizedIds
            .map((id) => songMap.get(id))
            .filter(Boolean)

        if (arranged.length) return arranged
        return songs
    }, [normalizedIds, songs])

    if (!orderedSongs.length) {
        return (
            <div className="song-list--empty">
                No songs yet. Add something to get the party started.
            </div>
        )
    }

    return (
        <ul className="song-list">
            {orderedSongs.map((song, idx) => (
                <SongPreview
                    key={song._id || song.id || idx}
                    idx={idx}
                    song={song}
                    onSelect={onSelectSong}
                />
            ))}
        </ul>
    )
}
