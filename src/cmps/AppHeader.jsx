import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { ContextMenu } from './ContextMenu.jsx';
import { logoutUser } from '../store/actions/user.actions.js';
import userImg from '../assets/imgs/user.jpeg';
import appLogo from '../assets/imgs/logo.png';

export function AppHeader() {
   const navigate = useNavigate();
   const location = useLocation();
   const searchBarRef = useRef(null);
   const searchContainerRef = useRef(null);
   const [searchStr, setSearchStr] = useState(null);
   const [isActive, setIsActive] = useState(false);
   const [menuData, setMenuData] = useState({
      visible: false,
      x: 0,
      y: 0,
      items: new Map(),
   });

   useEffect(() => {
      if (searchStr) {
         navigate(`/search/${searchStr}`);
      }
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

   function onHome() {
      navigate('/');
      setSearchStr('');
      searchBarRef.current.value = '';
   }

   function handleSearchClick(ev) {
      setIsActive(true);
   }

   function onSearch(str) {
      setSearchStr(str);
   }

   function handleImgClick(ev){
      const rect = ev.currentTarget.getBoundingClientRect();
      setMenuData({
         visible: true,
         x: rect.left - 160,
         y: rect.bottom + 4,
         items: new Map([
            ['Logout', async () => { 
               await logoutUser(); 
               navigate('/'); 
            }],
         ])
      })
   }

   function onCloseMenu(){
      setMenuData((prev) => ({ ...prev, visible: false }))
   }

   return (
      <div className="app-header">
         <button className="app-header-logo-container" onClick={onHome}>
            <img src={appLogo} alt="Musicfy logo" className="app-header-logo" />
         </button>
         <div className="app-header-middle">
            <button className={`circle-btn`} onClick={onHome}>
               <svg
                  data-encore-id="icon"
                  role="img"
                  aria-hidden="true"
                  className={location.pathname === '/home' ? '' : 'transparent'}
                  viewBox="0 0 24 24"
               >
                  <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732z"></path>
               </svg>
            </button>
            <SearchBar placeholderTxt={'What do you want to play?'} onSearch={onSearch} searchBarRef={searchBarRef} />
         </div>
         <div className='header-img-container' onClick={handleImgClick}>
            <div className="header-img-ring">
               <img src={userImg} alt="User avatar" className="header-img-avatar"/>
            </div>
         </div>
         {menuData.visible && <ContextMenu menuData={menuData} onClose={onCloseMenu} />}
      </div>
   );
}
