import { useState } from 'react';
import { StationFilter } from './StationFilter';

export function SideNav() {
   const [category, setCategory] = useState('');
   const [filterTxt, setFilterTxt] = useState('');

   return (
      <div className="side-nav">
         <header>
            <button className="collpase-btn">
               <h1>Your Library</h1>
            </button>
            <div className="header-actions">
               <button className="circle-btn" aria-label="create">
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
         {/* Playlist list */}
      </div>
   );
}
