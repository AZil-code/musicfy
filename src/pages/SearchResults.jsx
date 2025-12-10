import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SongList } from '../cmps/SongList';
import { fetchYtbId, searchSong } from '../store/actions/search.actions.js';
import { setCurrentSong, setCurrentStation, play, pause } from '../store/actions/player.actions.js';
import { selectStation } from '../store/actions/station.actions.js';

export function SearchResults() {
   const [searchResults, setSearchResults] = useState([]);
   const { searchStr } = useParams();
   const { currentSong, isPlaying } = useSelector((state) => state.playerModule);

   useEffect(() => {
      loadSearchResults();
   }, [searchStr]);

   async function loadSearchResults() {
      const results = await searchSong(searchStr);
      setSearchResults(results);
   }

   const handleSelectSong = async (song) => {
      if (!song) return;
      const selectedId = song._id;
      const currentId = currentSong ? currentSong._id : null;

      if (selectedId && currentId && String(selectedId) === String(currentId)) {
         if (isPlaying) pause();
         else play();
      } else {
         const queue = searchResults;
         const queueIndex = queue.findIndex((currSong) => currSong && String(currSong._id) === String(selectedId));
         // Playing from search results is not tied to a station, so clear station selection + currentStation highlight
         selectStation(null);
         setCurrentStation(null);
         setCurrentSong(song, {
            queue,
            queueIndex: queueIndex >= 0 ? queueIndex : 0,
         });
         play();
      }
   };

   return (
      <div className="page-station-details search-results-page">
         <SongList
            songs={searchResults}
            onSelectSong={handleSelectSong}
            currentSongId={(currentSong && currentSong._id) || ''}
            isPlaying={isPlaying}
         />
      </div>
   );
}
