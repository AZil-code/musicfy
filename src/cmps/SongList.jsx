import { SongPreview } from './SongPreview.jsx'

export function SongList({ songIds = [], songs = [], onSelectSong, onRemoveSong, currentSongId, isPlaying }) {
    const normalizedIds = Array.isArray(songIds)
        ? songIds.filter(Boolean).map(String)
        : []

    let orderedSongs = Array.isArray(songs) ? songs : []

    if (orderedSongs.length && normalizedIds.length) {
        const songMap = new Map(orderedSongs.map((song) => [String(song._id), song]))
        const arranged = normalizedIds
            .map((id) => songMap.get(id))
            .filter(Boolean)

        if (arranged.length) orderedSongs = arranged
    }

    if (!orderedSongs.length) {
        return (
            <div className="song-list-empty">
                No songs yet. Add something to get the party started.
            </div>
        )
    }

    return (
        <ul className="song-list">
            {orderedSongs.map((song, idx) => (
                <SongPreview
                    key={song._id || idx}
                    idx={idx}
                    song={song}
                    onSelect={onSelectSong}
                    onRemove={onRemoveSong}
                    isCurrent={Boolean(currentSongId) && currentSongId === song._id}
                    isPlaying={isPlaying}
                />
            ))}
        </ul>
    )
}
