export function SongPreview({ idx, song, onSelect }) {
  const artistNames = Array.isArray(song.artists)
    ? song.artists.map((artist) => artist.name).join(', ')
    : 'Unknown artist'

  const durationSec = Number(song.duration || 0)
  const minutes = Math.floor(durationSec / 60)
  const seconds = Math.floor(durationSec % 60)
  const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`

  const listens =
      song.monthlyListens != null ? Number(song.monthlyListens) : NaN
  const listensDisplay = Number.isFinite(listens)
      ? listens.toLocaleString()
      : ''

  return (
    <li className="song-preview" onClick={() => onSelect?.(song)}>
        <div className="song-preview__index">{idx + 1}</div>

        <div className="song-preview__meta">
            <div className="song-preview__title">{song.title || 'Untitled song'}</div>
            <div className="song-preview__artists">{artistNames}</div>
        </div>

        <div className="song-preview__listens">{listensDisplay}</div>

        <div className="song-preview__duration">{formattedDuration}</div>
    </li>
  )
}
