import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import './assets/styles/layouts.css';
import { AppHeader } from './cmps/AppHeader.jsx';
import { SideNav } from './cmps/SideNav.jsx';
import { PlayerBar } from './cmps/PlayerBar.jsx';
import { MobileNav } from './cmps/MobileNav.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { StationIndex } from './pages/StationIndex.jsx';
import { StationDetails } from './pages/StationDetails.jsx';
import { UserMsg } from './cmps/UserMsg.jsx';
import { SearchResults } from './pages/SearchResults.jsx';

import { store } from './store/store.js';
import { BrowsePage } from './pages/BrowsePage.jsx';

function App() {
   const loggedInUser = useSelector((storeState) => storeState.userModule.user);
   const [isMobileLibraryOpen, setIsMobileLibraryOpen] = useState(false);

   return (
      <HashRouter>
         {loggedInUser ? (
            <div className={`spotify-layout ${isMobileLibraryOpen ? 'mobile-library-open' : ''}`}>
               <header className="spotify-layout-header" aria-label="Top navigation">
                  <AppHeader />
               </header>

               <aside className="spotify-layout-sidebar" aria-label="Library sidebar">
                  <SideNav onCloseMobileLibrary={() => setIsMobileLibraryOpen(false)} />
               </aside>

               <main className="spotify-layout-main" aria-label="Main content">
                  <MobileBackButton
                     isLibraryOpen={isMobileLibraryOpen}
                     onOpenLibrary={() => setIsMobileLibraryOpen(true)}
                  />
                  <Routes>
                     <Route path="/" element={<Navigate to="/home" replace />} />
                     <Route path="/home" element={<StationIndex />} />
                     <Route path="/station/:stationID" element={<StationDetails />} />
                     <Route path="/search" element={<BrowsePage />} />
                     <Route path="/search/:searchStr" element={<SearchResults />} />
                  </Routes>
               </main>

               <footer className="spotify-layout-player" aria-label="Player controls">
                  <PlayerBar />
               </footer>
               {isMobileLibraryOpen && (
                  <div
                     className="mobile-library-backdrop"
                     onClick={() => setIsMobileLibraryOpen(false)}
                     aria-hidden="true"
                  />
               )}
               <div className="spotify-layout-mobile-nav" aria-label="Mobile navigation">
                  <MobileNav
                     isLibraryOpen={isMobileLibraryOpen}
                     onToggleLibrary={() => setIsMobileLibraryOpen((prev) => !prev)}
                     onCloseLibrary={() => setIsMobileLibraryOpen(false)}
                  />
               </div>
            </div>
         ) : (
            <LoginPage />
         )}
         <UserMsg />
      </HashRouter>
   );
}

function MobileBackButton({ isLibraryOpen, onOpenLibrary }) {
   const navigate = useNavigate();
   const location = useLocation();
   const isHomeRoute = location.pathname === '/home' || location.pathname === '/';
   const fromLibrary = Boolean(location.state && location.state.fromLibrary);

   if (isHomeRoute || isLibraryOpen) return null;

   return (
      <div className="mobile-back-bar">
         <button
            className="mobile-back-button"
            type="button"
            aria-label="Go back"
            onClick={() => {
               if (fromLibrary && typeof onOpenLibrary === 'function') {
                  onOpenLibrary();
                  navigate(-1);
                  return;
               }
               navigate(-1);
            }}
         >
            <svg viewBox="0 0 16 16" aria-hidden="true">
               <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0"></path>
            </svg>
         </button>
      </div>
   );
}

export default App;
