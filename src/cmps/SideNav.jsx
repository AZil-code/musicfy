import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StationFilter } from './StationFilter';
import { createStation, deleteStation, fetchStations, saveStation } from '../store/actions/station.actions';
import { StationList } from './StationList';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { EditStationModal } from './EditModal';

export function SideNav() {
   const [category, setCategory] = useState('');
   const [filterTxt, setFilterTxt] = useState('');
   const [stationToEdit, setStationToEdit] = useState(null);
   const stations = useSelector((storeState) => storeState.stationModule.stations);

   useEffect(() => {
      loadStations();
   }, []);

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

   return (
      <div className="side-nav">
         <header>
            <div className='side-nav-info-container'>
               <button className="collpase-btn">
                  <h2>Your Library</h2>
               </button>
               <button className="circle-btn add-station-btn" onClick={onCreateClick} aria-label="create">
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
            />
            <StationList
               stations={stations}
               onEditStation={onSetIsEditOpen}
               onRemoveStation={onRemoveStation}
               filterTxt={filterTxt}
            />
         </div>
         {stationToEdit && (
            <EditStationModal onSetIsEditOpen={onSetIsEditOpen} station={stationToEdit} onSaveStation={onEditStation} />
         )}
      </div>
   );
}
