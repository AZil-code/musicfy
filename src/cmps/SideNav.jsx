import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StationFilter } from './StationFilter';
import { createStation, deleteStation, fetchStations, saveStation } from '../store/actions/station.actions';
import { StationList } from './StationList';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { EditStationModal } from './EditModal';
import { pause, play, setCurrentSong, setCurrentStation } from '../store/actions/player.actions';

export function SideNav() {
   const [category, setCategory] = useState('');
   const [filterTxt, setFilterTxt] = useState('');
   const [stationToEdit, setStationToEdit] = useState(null);
   const [isColapsed, setIsColapsed] = useState(false);
   const stations = useSelector((storeState) => storeState.stationModule.stations);
   const { currentStation, isPlaying } = useSelector((store) => store.playerModule);

   function onPlay( station , ev={}) {

      // if (!station) return

      console.log('station: ', station)

      if (!currentStation || station._id !== currentStation._id) {
         setCurrentStation(station);
         setCurrentSong(station.songs[0], {
               queue: station.songs,
               queueIndex: 0,
         })
         play();
      } else if (isPlaying) pause();
      else play();
      ev.stopPropagation();
   }

   useEffect(() => {
      loadStations();
   }, []);

   // Adjust the main layout columns from the sidebar
   useEffect(() => {
      const layoutEl = document.querySelector('.spotify-layout');
      const original = layoutEl.style.gridTemplateColumns;
      layoutEl.style.gridTemplateColumns = isColapsed ? '82px 1fr' : '360px 1fr';
      return () => {
         // restore on unmount
         layoutEl.style.gridTemplateColumns = original;
      };
   }, [isColapsed]);

   async function loadStations() {
      await fetchStations();
   }

   async function onCreateClick() {
      await createStation();
      showSuccessMsg('Added to your Library');
   }

   async function onRemoveStation(stationId) {
      await deleteStation(stationId);
      showSuccessMsg('Succesfully Removed!');
   }

   async function onEditStation(station) {
      try {
         await saveStation(station);
      } catch (error) {
         showErrorMsg('Cannot edit playlist!');
      }
   }

   function onSetIsEditOpen(station) {
      setStationToEdit(station);
   }

   function onClickColapse() {
      setIsColapsed(isColapsed ? false : true);
   }

   return (
      <div className="side-nav">
         <header>
            <div className="side-nav-info-container">
               <button className="collapse-btn" onClick={onClickColapse}>
                  <svg
                     className={`collapse-btn-open ${isColapsed ? '' : 'display-none'}`}
                     role="img"
                     aria-hidden="true"
                     viewBox="0 0 24 24"
                  >
                     <path d="M14.457 15.207a1 1 0 0 1-1.414-1.414L14.836 12l-1.793-1.793a1 1 0 0 1 1.414-1.414l2.5 2.5a1 1 0 0 1 0 1.414z"></path>
                     <path d="M20 22a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zM4 20V4h4v16zm16 0H10V4h10z"></path>
                  </svg>
                  <svg
                     className={`collapse-btn-close ${isColapsed ? 'display-none' : ''}`}
                     role="img"
                     aria-hidden="true"
                     viewBox="0 0 16 16"
                  >
                     <path d="M10.97 5.47a.75.75 0 1 1 1.06 1.06L10.56 8l1.47 1.47a.75.75 0 1 1-1.06 1.06l-2-2a.75.75 0 0 1 0-1.06z"></path>
                     <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm.5 1.5H5v13H1.5zm13 13h-8v-13h8z"></path>
                  </svg>
                  <h2 className={`${isColapsed ? 'display-none' : ''}`}>Your Library</h2>
               </button>
               <button
                  className={`circle-btn add-station-btn ${isColapsed ? 'display-none' : ''}`}
                  onClick={onCreateClick}
                  aria-label="create"
               >
                  <svg width="16" height="16">
                     <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75"></path>
                  </svg>
                  <span>Create</span>
               </button>
               <button
                  className="circle-btn expand-btn"
                  onClick={() => showSuccessMsg('Expand! (not implemented)')}
                  aria-label="expand"
               >
                  <svg width="16" height="16">
                     <path d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0"></path>
                  </svg>
               </button>
            </div>
         </header>
         <div className="side-nav-content">
            <StationFilter
               category={category}
               setCategory={setCategory}
               setFilterTxt={setFilterTxt}
               filterTxt={filterTxt}
               isColapsed={isColapsed}
            />
            <StationList
               stations={stations}
               onEditStation={onSetIsEditOpen}
               onRemoveStation={onRemoveStation}
               filterTxt={filterTxt}
               isColapsed={isColapsed}
               onPlay={onPlay}
            />
         </div>
         {stationToEdit && (
            <EditStationModal onSetIsEditOpen={onSetIsEditOpen} station={stationToEdit} onSaveStation={onEditStation} />
         )}
      </div>
   );
}
