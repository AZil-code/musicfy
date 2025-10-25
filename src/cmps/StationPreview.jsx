export function StationPreview({ station, isColapsed, isSelected }) {
   const songs = station && Array.isArray(station.songs) ? station.songs : [];
   const firstSong = songs.length ? songs[0] : null;
   const hasCover =
      station &&
      typeof station.coverImage === 'string' &&
      station.coverImage.trim().length;
   const coverImage =
      (hasCover && station.coverImage) ||
      (firstSong && firstSong.imgUrl) ||
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=200&q=60';
   const subtitle =
      firstSong &&
      Array.isArray(firstSong.artists) &&
      firstSong.artists.length
         ? firstSong.artists.map((artist) => artist.name).join(', ')
         : 'Handpicked playlist';

   return (
      <div className="station-preview">
         <div className="thumbnail-container">
            <button className="play-button">
               <svg
                  data-encore-id="icon"
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  height={25}
                  width={25}
               >
                  <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path>
               </svg>
            </button>
            <img className="thumbnail" src={coverImage} alt={`${station.name} cover`} loading="lazy" />
         </div>
         <div className={`details ${isColapsed ? 'display-none' : '' }`}>
            <div className={`title ${isSelected ? 'station-selected' : ''}`}>{station.name}</div>
            <div className="subtitle">{subtitle}</div>
         </div>
      </div>
   );
}
