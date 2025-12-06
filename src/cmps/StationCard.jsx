import { useNavigate } from 'react-router-dom';
import { selectStation } from '../store/actions/station.actions';
import { useSelector } from 'react-redux';
import { PlayButton } from './PlayButton';
import { ShortenedTxt } from '../cmps/ShortenedTxt.jsx';

export function StationCard({ station, onClickCard }) {
   const { isPlaying, currentStation } = useSelector((store) => store.playerModule);
   const navigate = useNavigate();
   const songs = station && Array.isArray(station.songs) ? station.songs : [];
   const firstSong = songs.length ? songs[0] : null;
   const hasCover = station && typeof station.coverImage === 'string' && station.coverImage.trim().length;
   const coverImage =
      (hasCover && station.coverImage) ||
      (firstSong && firstSong.imgUrl) ||
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=200&q=60';
   const subtitle =
      firstSong && Array.isArray(firstSong.artists) && firstSong.artists.length
         ? firstSong.artists.map((artist) => artist.name).join(', ')
         : 'Handpicked playlist';
   const isCurrentStation = currentStation && currentStation._id === station._id;
   const isStationPlaying = Boolean(isPlaying && isCurrentStation);

   function onSelectStation(stationId) {
      selectStation(stationId);
      navigate(`/station/${stationId}`);
   } 

   return (
      <div className="station-card" onClick={() => onSelectStation(station._id)}>
         {/* <div className="thumbnail-container"> */}
         <div className="thumbnail-btn thumbnail-container" >
            <PlayButton
               className="circle-btn"
               variant="card"
               isPlaying={isStationPlaying}
               alwaysShow={isStationPlaying}
               onClick={(ev) => onClickCard(station, ev)}
            />
            <img className="thumbnail" src={coverImage} alt={`${station.name} cover`} loading="lazy" />
         </div>
         {/* </div> */}
         <ShortenedTxt text={station.name} numOfCharToDisplay={20} className="station-name"></ShortenedTxt>
         {/* <div className={`details ${isColapsed ? 'display-none' : '' }`}>
            <div className={`title ${isSelected ? 'station-selected' : ''}`}>{station.name}</div>
            <div className="subtitle">{subtitle}</div>
         </div> */}
      </div>
   );
}
