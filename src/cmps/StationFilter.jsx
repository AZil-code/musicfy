import { useEffect, useRef } from 'react';
import { debounce } from '../services/util.service';

// TODO: need to take svgs out of the cmp and put them in a shared folder

const validCategories = ['Playlists', 'Artists', 'Albums']; // for development

export function StationFilter({ category, setCategory, setFilterTxt, filterTxt }) {
   const searchBarRef = useRef(null);
   const carouselRef = useRef(null);
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

   function onSearchClick({ currentTarget: searchBtn }) {
      const { current: searchBar } = searchBarRef;
      searchBtn.style.display = 'none';
      onOutsideSeachBarClick(searchBar, searchBtn);
      searchBar.style.display = '';
      searchBar.focus();
   }

   function onOutsideSeachBarClick(searchBar, searchBtn) {
      const controller = new AbortController();
      document.addEventListener(
         'click',
         ({ target }) => {
            if (!searchBar.contains(target)) {
               searchBtn.style.display = '';
               searchBar.style.display = 'none';
               searchBar.value = '';
               setFilterTxt('');
               controller.abort();
            }
         },
         { signal: controller.signal, capture: true }
      );
   }

   function onScrollBtnClick(scrollAmnt) {
      const { current: carousel } = carouselRef;
      carousel.scrollBy({ left: scrollAmnt * carousel.scrollWidth, behavior: 'smooth' });
   }

   function onCarouselScroll({ target }) {
      const { current: carousel } = carouselRef;
      const left = carousel.querySelector('.left');
      const right = carousel.querySelector('.right');
      left.style.display = target.scrollLeft <= 15 ? 'none' : '';
      right.style.display = target.scrollWidth - target.clientWidth <= target.scrollLeft + 10 ? 'none' : '';
   }

   return (
      <div className="station-filter-container">
         <div className="category-carousel" ref={carouselRef} onScroll={onCarouselScroll}>
            <button
               className="circle-btn scroll-btn left"
               onClick={() => onScrollBtnClick(-1)}
               style={{ display: `${(carouselRef && carouselRef.current, screenLeft > 0 ? '' : 'none')}` }}
            >
               ‹
            </button>
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

            {/* Bug - when selecting category ('arist'), page renders button in view before scrollWidth, making it visible */}
            <button
               className="circle-btn scroll-btn right"
               onClick={() => onScrollBtnClick(1)}
               style={{
                  display: `${
                     carouselRef.current && carouselRef.current.scrollWidth > carouselRef.current.clientWidth
                        ? ''
                        : 'none'
                  }`,
               }}
            >
               ›
            </button>
         </div>
         <input
            ref={searchBarRef}
            type="text"
            className="searchbar"
            style={{ display: 'none' }}
            placeholder="Search in Your Library"
            onChange={({ target }) => filterTxtDebounce(target.value)}
         />
         <div className="search-section">
            <button className="circle-btn search-btn" onClick={onSearchClick}>
               <svg width="16" height="16">
                  <path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5M.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7"></path>
               </svg>
            </button>
         </div>
      </div>
   );
}
