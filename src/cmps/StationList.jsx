import { useSelector } from 'react-redux';
import { StationPreview } from './StationPreview';
import { selectStation } from '../store/actions/station.actions';

const likedSongsImgSrc = 'https://misc.scdn.co/liked-songs/liked-songs-64.png';

export function StationList({ stations, onRemoveStation, filterTxt }) {
   const selectedStationId = useSelector((storeState) => storeState.stationModule.selectedStationId);

   function onSelectStation(stationId) {
      selectStation(stationId);
   }

   const filteredStations = stations.filter((station) => station.name.includes(filterTxt));
   const contextMenuOptMap = new Map([['Delete', onRemoveStation]]);

   return (
      <div className="station-list-container">
         <ul className="clean-list">
            {filteredStations.map((station) => (
               <li
                  key={station._id}
                  onClick={() => onSelectStation(station._id)}
                  // For future implementation
                  // onContextMenu={(ev) => {
                  //    ev.preventDefault();
                  //    console.log('delet!');
                  // }}
                  className={selectedStationId === station._id ? 'selected' : ''}
               >
                  <StationPreview station={station} />
                  {/* Temp solution, just to have the functionality */}
                  <button className="remove-btn" onClick={() => onRemoveStation(station._id)}>
                     X
                  </button>
               </li>
            ))}
         </ul>
      </div>
   );
}
