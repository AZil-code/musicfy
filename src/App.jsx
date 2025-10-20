import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import './assets/styles/layouts.css';
import { AppHeader } from './cmps/AppHeader.jsx';
import { SideNav } from './cmps/SideNav.jsx';
import { PlayerBar } from './cmps/PlayerBar.jsx';
import { StationIndex } from './pages/StationIndex.jsx';
import { StationDetails } from './pages/StationDetails.jsx';
import { UserMsg } from './cmps/UserMsg.jsx';
import { SearchResults } from './pages/SearchResults.jsx';

function App() {
   return (
      <HashRouter>
         <div className="spotify-layout">
            <header className="spotify-layout-header" aria-label="Top navigation">
               <AppHeader />
            </header>

            <aside className="spotify-layout-sidebar" aria-label="Library sidebar">
               <SideNav />
            </aside>

            <main className="spotify-layout-main" aria-label="Main content">
               <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<StationIndex />} />
                  <Route path="/station/:stationID" element={<StationDetails />} />
                  <Route path="/search/:searchStr" element={<SearchResults />} />
               </Routes>
            </main>

            <footer className="spotify-layout-player" aria-label="Player controls">
               <PlayerBar />
            </footer>
         </div>
         <UserMsg />
      </HashRouter>
   );
}

export default App;
