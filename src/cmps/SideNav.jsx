import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StationFilter } from './StationFilter';
import { createStation, deleteStation, fetchStations } from '../store/actions/station.actions';
import { StationList } from './StationList';
import { showSuccessMsg } from '../services/event-bus.service';

export function SideNav() {
   const [category, setCategory] = useState('');
   const [filterTxt, setFilterTxt] = useState('');
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

   return (
      <div className="side-nav">
         <header>
            <button className="collpase-btn">
               <h3>Your Library</h3>
            </button>
            <div className="header-actions">
               <button className="circle-btn" onClick={onCreateClick} aria-label="create">
                  + Create
               </button>
               <button className="circle-btn" aria-label="expand">
                  Expand Library
               </button>
            </div>
         </header>
         <StationFilter
            category={category}
            setCategory={setCategory}
            setFilterTxt={setFilterTxt}
            filterTxt={filterTxt}
         />
         <StationList stations={stations} onRemoveStation={onRemoveStation} />
      </div>
   );
}
