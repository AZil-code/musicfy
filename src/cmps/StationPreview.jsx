import { useSelector } from 'react-redux';
import { AddToStationsButton } from './AddToStationsButton.jsx';


export function StationPreview({ station, isColapsed, isSelected, modalVersion=false, songToAdd=null, onPlay}) {
   const { currentStation, isPlaying } = useSelector((store) => store.playerModule);
   const songs = station && Array.isArray(station.songs) ? station.songs : [];
   const firstSong = songs.length ? songs[0] : null;
   const hasCover =
      station &&
      typeof station.coverImage === 'string' &&
      station.coverImage.trim().length;
   const coverImage = (station.name === 'Liked Songs') ? 'https://misc.scdn.co/liked-songs/liked-songs-300.jpg' :
      (hasCover && station.coverImage) ||
      (firstSong && firstSong.imgUrl) ||
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=200&q=60';
   const subtitle =
      firstSong && Array.isArray(firstSong.artists) && firstSong.artists.length
         ? firstSong.artists.map((artist) => artist.name).join(', ')
         : 'Handpicked playlist';

   const isCurrentStation = currentStation && currentStation._id === station._id;
   const isStationPlaying = Boolean(isCurrentStation && isPlaying);

   return (
      <div className="station-preview">
         <div className="thumbnail-container">
            { 
               modalVersion || 
                  <button className="play-button" onClick={(ev) => {
                     ev.stopPropagation();
                     onPlay && onPlay(station, ev);
                  }}>
                     <svg
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                     >
                        {isStationPlaying ? (
                           <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7z"></path>
                        ) : (
                           <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path>
                        )}
                     </svg>
                  </button>
            }
            <img className="thumbnail" src={coverImage} alt={`${station.name} cover`} loading="lazy" />
         </div>
         <div className={`details ${isColapsed ? 'display-none' : '' }`}>
            <div className={`title ${(isSelected && modalVersion) || isStationPlaying ? 'station-selected' : ''}`}>{station.name}</div>
            { modalVersion || 
               
                  
                  <div className="subtitle">
                     {
                        station.isPinned && 
                           <svg viewBox="0 0 16 16">
                              <path d="M8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-3.678 3.678-1.337 4.988-4.486-4.486L1.28 15.78a.75.75 0 0 1-1.06-1.06l4.422-4.422L.156 5.812l4.987-1.337z"></path>
                           </svg>
                     }
                     <span>{subtitle}</span>
                     
                  </div> 
               
            }
            { modalVersion && <AddToStationsButton inModal={true} song={songToAdd} station={station}/>}
         </div>
      </div>
   );
}
