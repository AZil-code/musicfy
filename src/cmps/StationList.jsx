import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StationPreview } from './StationPreview';
import { selectStation } from '../store/actions/station.actions';
import { ContextMenu } from './ContextMenu';
import { useState } from 'react';

const likedSongsImgSrc = 'https://misc.scdn.co/liked-songs/liked-songs-64.png';

export function StationList({ stations, onRemoveStation, filterTxt, onEditStation, isColapsed, onPlay }) {
   const navigate = useNavigate();
   const selectedStationId = useSelector((storeState) => storeState.stationModule.selectedStationId);
   const [contextMenu, setContextMenu] = useState({
      visible: false,
      x: 0,
      y: 0,
      items: null,
   });

   function onSelectStation(stationId) {
      selectStation(stationId);
      navigate(`/station/${stationId}`);
   }

   function onOpenContextMenu(ev, station) {
      ev.preventDefault();
      setContextMenu({
         visible: true,
         x: ev.pageX,
         y: ev.pageY,
         items: new Map([
            ['Delete', () => onRemoveStation(station._id)],
            ['Edit', () => onEditStation(station)],
         ]),
      });
   }

   function onCloseContextMenu() {
      setContextMenu({
         visible: false,
         x: 0,
         y: 0,
         items: null,
      });
   }

   const filteredStations = stations.filter(({ name }) => name.toLowerCase().includes(filterTxt.toLowerCase()));

   return (
      <div className="station-list-container">
         <ul className="clean-list">
            {filteredStations.map((station) => (
               <li
                  key={station._id}
                  onClick={() => onSelectStation(station._id)}
                  onContextMenu={(ev) => onOpenContextMenu(ev, station)}
                  className={selectedStationId === station._id ? 'selected' : ''}
               >
                  <StationPreview
                     isSelected={station._id === selectedStationId ? true : false}
                     station={station}
                     isColapsed={isColapsed}
                     onClick={onPlay}
                  />
               </li>
            ))}
         </ul>
         {contextMenu.visible && <ContextMenu menuData={contextMenu} onClose={onCloseContextMenu} />}
      </div>
   );
}
