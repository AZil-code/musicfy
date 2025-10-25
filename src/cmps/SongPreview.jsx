export function SongPreview({ idx, song, onSelect, onRemove, isCurrent, isPlaying, onContextMenu }) {
   const artistNames = Array.isArray(song.artists)
      ? song.artists.map((artist) => artist.name).join(', ')
      : 'Unknown artist';

   const durationSec = Number(song.duration || 0);
   const minutes = Math.floor(durationSec / 60);
   const seconds = Math.floor(durationSec % 60);
   const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

   const albumName = typeof song.album === 'string' && song.album.trim().length ? song.album.trim() : 'Unknown album';

   const fallbackArtwork =
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=200&q=60';
   const artworkUrl = typeof song.imgUrl === 'string' && song.imgUrl.trim().length ? song.imgUrl : fallbackArtwork;

   const handleSelect = () => {
      onSelect(song);
   };

   const handleRemove = (event) => {
      event.stopPropagation();
      onRemove(song);
   };

   return (
      <li
         className="song-preview"
         data-current={isCurrent}
         onClick={handleSelect}
         onContextMenu={(ev) => onContextMenu(ev, song)}
      >
         <div className="song-preview-index">
            <span className="song-preview-number">{idx + 1}</span>
            <button
               className="song-preview-play-btn"
               type="button"
               aria-label={isCurrent && isPlaying ? 'Pause song' : 'Play song'}
               onClick={(event) => {
                  event.stopPropagation();
                  handleSelect();
               }}
            >
               <svg viewBox="0 0 16 16">
                  {isCurrent && isPlaying ? (
                     <path d="M3 2h3v12H3zm7 0h3v12h-3z"></path>
                  ) : (
                     <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
                  )}
               </svg>
            </button>
         </div>

         <div className="song-preview-artwork">
            <img src={artworkUrl} alt={`${song.title || 'Song'} cover art`} loading="lazy" />
         </div>

         <div className="song-preview-meta">
            <div className="song-preview-title">{song.title || 'Untitled song'}</div>
            <div className="song-preview-artists">{artistNames}</div>
         </div>

         <div className="song-preview-album" title={albumName}>
            {albumName}
         </div>

         <div className="song-preview-duration">{formattedDuration}</div>

         {/* <button className="song-preview-more-btn" type="button" aria-label="Song actions" onClick={handleRemove}>
            …
         </button> */}
      </li>
   );
}
