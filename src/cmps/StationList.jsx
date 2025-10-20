import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StationPreview } from './StationPreview';
import { selectStation } from '../store/actions/station.actions';

const likedSongsImgSrc = 'https://misc.scdn.co/liked-songs/liked-songs-64.png';

export function StationList({ stations, onRemoveStation, filterTxt }) {
   const navigate = useNavigate();
   const selectedStationId = useSelector((storeState) => storeState.stationModule.selectedStationId);

   function onSelectStation(stationId) {
      selectStation(stationId);
      navigate(`/station/${stationId}`);
   }

   const filteredStations = stations.filter((station) => station.name.includes(filterTxt));

   return (
      <div className="station-list-container">
         <ul className="clean-list">
            {filteredStations.map((station) => (
               <li
                  key={station._id}
                  onClick={() => onSelectStation(station._id)}
                  className={selectedStationId === station._id ? 'selected' : ''}
               >
                  <StationPreview station={station} />
               </li>
            ))}
         </ul>
      </div>
   );
}
