import { useNavigate, useLocation } from 'react-router-dom';
import { createStation } from '../store/actions/station.actions';
import { MagnifyingGlass } from '../svgs/Icons.jsx';

export function MobileNav({ isLibraryOpen = false, onToggleLibrary, onCloseLibrary }) {
   const navigate = useNavigate();
   const location = useLocation();

   const navItems = [
      { key: 'home', label: 'Home', path: '/home', icon: HomeIcon },
      { key: 'search', label: 'Search', path: '/search', icon: MagnifyingGlass },
      { key: 'library', label: 'Library', path: '/home', icon: LibraryIcon },
   ];

   async function onCreate() {
      try {
         const station = await createStation();
         if (station && station._id) navigate(`/station/${station._id}`);
      } catch (err) {
         console.error('Cannot create station', err);
      }
   }

   const isSearchRoute = location.pathname.startsWith('/search');

   return (
      <nav className="mobile-nav">
         {navItems.map(({ key, label, path, icon: Icon }) => {
            const isActive =
               key === 'library'
                  ? isLibraryOpen
                  : isSearchRoute
                  ? key === 'search'
                  : location.pathname.startsWith(path);
            return (
               <button
                  key={key}
                  className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                     if (key === 'library') {
                        if (typeof onToggleLibrary === 'function') onToggleLibrary();
                        return;
                     }
                     if (typeof onCloseLibrary === 'function') onCloseLibrary();
                     navigate(path);
                  }}
               >
                  <Icon />
                  <span>{label}</span>
               </button>
            );
         })}
         <button className="mobile-nav-item" onClick={onCreate}>
            <PlusIcon />
            <span>Create</span>
         </button>
      </nav>
   );
}

function HomeIcon() {
   return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
         <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732z"></path>
      </svg>
   );
}

function LibraryIcon() {
   return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
         <path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866M16 4.732V20h4V7.041zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1m6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1"></path>
      </svg>
   );
}

function PlusIcon() {
   return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
         <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1"></path>
      </svg>
   );
}
