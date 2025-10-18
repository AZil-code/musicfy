import { useEffect, useRef } from 'react';
import { debounce } from '../services/util.service';

const validCategories = ['Playlists', 'Artists', 'Albums']; // for development

export function StationFilter({ category, setCategory, setFilterTxt, filterTxt }) {
   const searchBarRef = useRef(null);
   const filterTxtDebounce = useRef(debounce(setFilterTxt, 750)).current;

   useEffect(() => {
      filterTxtDebounce(searchBarRef.current.value);
   }, [filterTxt]);

   let categoryBtnsToDisplay;

   switch (category) {
      case '':
         categoryBtnsToDisplay = ['Playlists', 'Artists', 'Albums'];
         break;
      case 'Playlists':
         categoryBtnsToDisplay = ['X', 'Playlists', 'By Spotify', 'By You'];
         break;
      case 'Artists':
         categoryBtnsToDisplay = ['X', 'Artists'];
         break;
      case 'Albums':
         categoryBtnsToDisplay = ['X', 'Albums'];
         break;

      default:
         break;
   }

   function onSetCategory({ target }) {
      setCategory((prevCategory) =>
         validCategories.includes(target.value) && prevCategory !== target.value ? target.value : ''
      );
   }

   function onSearchClick({ target: searchBtn }) {
      const { current: searchBar } = searchBarRef;
      searchBar.removeAttribute('hidden');
      searchBar.focus();
      searchBtn.setAttribute('hidden', 'true');
      onOutsideSeachBarClick(searchBar, searchBtn);
   }

   function onOutsideSeachBarClick(searchBar, searchBtn) {
      const controller = new AbortController();
      document.addEventListener(
         'click',
         ({ target }) => {
            if (!searchBar.contains(target)) {
               searchBtn.removeAttribute('hidden');
               searchBar.setAttribute('hidden', 'true');
               searchBar.value = '';
               setFilterTxt('');
               controller.abort();
            }
         },
         { signal: controller.signal, capture: true }
      );
   }

   return (
      <div className="station-filter-container">
         <div className="category-carousel">
            {categoryBtnsToDisplay.map((btnLabel) => {
               return (
                  <button
                     className={`circle-btn${category === btnLabel ? ' selected' : ''}`}
                     onClick={onSetCategory}
                     value={btnLabel}
                  >
                     {btnLabel}
                  </button>
               );
            })}
         </div>
         <input
            ref={searchBarRef}
            type="text"
            className="searchbar"
            hidden
            placeholder="Search in Your Library"
            onChange={({ target }) => filterTxtDebounce(target.value)}
         />
         <div className="search-section">
            <button className="circle-btn" onClick={onSearchClick}>
               🔍
            </button>
         </div>
      </div>
   );
}
