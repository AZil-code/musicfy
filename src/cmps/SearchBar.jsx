import { useEffect, useRef, useState } from 'react';
import { debounce } from '../services/util.service';
import { MagnifyingGlass } from '../svgs/Icons.jsx';

export function SearchBar({ onSearch, placeholderTxt, searchBarRef }) {
   const [isActive, setIsActive] = useState(false);
   const [searchStr, setSearchStr] = useState('');
   // const searchBarRef = useRef(null);
   const searchContainerRef = useRef(null);
   const searchStrDebounce = useRef(debounce(handleChange, 750)).current;

   console.log(searchBarRef);

   useEffect(() => {
      onSearch(searchStr);
   }, [searchStr]);

   useEffect(() => {
      function handleClickOutside(ev) {
         if (!searchContainerRef.current) return;
         if (!searchContainerRef.current.contains(ev.target)) {
            setIsActive(false);
         }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   function handleChange({ target }) {
      setSearchStr(target.value || null);
   }

   function handleSearchClick(ev) {
      setIsActive(true);
   }

   return (
      <div
         className={`search-container ${isActive ? 'search-active' : ''}`}
         onClick={handleSearchClick}
         ref={searchContainerRef}
      >
         <MagnifyingGlass />
         <input
            className="search-bar"
            onChange={searchStrDebounce}
            type="text"
            placeholder={placeholderTxt}
            ref={searchBarRef}
         />
      </div>
   );
}
