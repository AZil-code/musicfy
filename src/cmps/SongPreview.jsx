import { formatTime } from '../services/util.service.js';
import { AddToStationsButton } from './AddToStationsButton.jsx';

export function SongPreview({
   idx = null,
   song,
   onSelect,
   onRemove,
   isCurrent = false,
   isPlaying = false,
   onContextMenu,
   type = 'StationDetails',
}) {
   const artistNames = Array.isArray(song.artists) ? song.artists.map(artist => artist.name).join(', ') : 'Unknown artist';

   const formattedDuration = formatTime(song.duration);

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

   function createActions() {
      switch (type) {
         case 'FindMore':
            return <button className="circle-btn">Add</button>;
         default:
            return (
               <>
                  <div className="song-preview-album" title={albumName}>
                     {albumName}
                  </div>

                  <AddToStationsButton className="song-preview-add-button" song={song} />

                  <div className="song-preview-duration">{formattedDuration}</div>
               </>
            );
      }
   }

   return (
      <li
         className="song-preview"
         data-current={isCurrent}
         onClick={handleSelect}
         onContextMenu={(ev) => onContextMenu(ev, song)}
      >
         {type === 'StationDetails' && (
            <div className="song-preview-index">
               <span className="song-preview-number">{idx !== null ? idx + 1 : idx}</span>
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
         )}

         <div className="song-preview-artwork-container">
            <img
               className="song-preview-img"
               src={artworkUrl}
               alt={`${song.title || 'Song'} cover art`}
               loading="lazy"
            />
         </div>

         <div className="song-preview-meta">
            <div className="song-preview-title">{song.title || 'Untitled song'}</div>
            <div className="song-preview-artists">{artistNames}</div>
         </div>

         {createActions()}
      </li>
   );
}
