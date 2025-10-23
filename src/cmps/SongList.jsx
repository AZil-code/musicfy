import { SongPreview } from './SongPreview.jsx'

export function SongList({
    songIds = [],
    songs = [],
    onSelectSong,
    onRemoveSong,
    currentSongId,
    isPlaying,
}) {
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

    const handleSelectSong = typeof onSelectSong === 'function' ? onSelectSong : () => {}
    const handleRemoveSong = typeof onRemoveSong === 'function' ? onRemoveSong : () => {}

    return (
        <ul className="song-list">
            <li className='song-preview song-preview-desc-container'>
                <div className='song-preview-desc song-preview-index-desc song-preview-index'>#</div>
                <div className='song-preview-desc song-preview-artwork-desc song-preview-artwork'>Title</div>
                <div className='song-preview-desc song-preview-meta-desc song-preview-meta'></div>
                <div className='song-preview-desc song-preview-album-desc song-preview-album'>Album</div>
                <div className='song-preview-desc song-preview-duration-desc song-preview-duration'>
                    <svg role="img" aria-hidden="true" viewBox="0 0 16 16">
                        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path>
                        <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25"></path>
                    </svg>
                </div>
                <div className='song-preview-more-desc song-preview-more-btn'>...</div>
            </li>
            {orderedSongs.map((song, idx) => (
                <SongPreview
                    key={song._id || idx}
                    idx={idx}
                    song={song}
                    onSelect={handleSelectSong}
                    onRemove={handleRemoveSong}
                    isCurrent={Boolean(currentSongId) && currentSongId === song._id}
                    isPlaying={isPlaying}
                />
            ))}
        </ul>
    )
}
