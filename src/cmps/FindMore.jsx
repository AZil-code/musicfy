import { useState } from 'react';
import { SearchBar } from './SearchBar.jsx';
import { SongPreview } from './SongPreview.jsx';
import { X } from '../svgs/Icons.jsx';
import { searchSong, fetchYtbId } from '../store/actions/search.actions.js';


export function FindMore({ onClose, onAddSong }) {
   const [songs, setSongs] = useState([]);

   async function onSearchSongs(searchStr) {

      if (!searchStr || searchStr === '') {
         // setSongs([]);
         return;
      }
      try {
         const results = await searchSong(searchStr);
         setSongs(Array.isArray(results) ? results : []);
      } catch (err) {
         console.error('FindMore -> search failed', err);
         setSongs([]);
      }
   }

   async function handleAdd(song) {
      try {
         if (!song.ytbId) {
            await fetchYtbId(song);
         }
         onAddSong(song);
      } catch (err) {
         console.error('FindMore -> add failed', err);
      }
   }

   return (
      <section className="find-more-container">
         <h2>Let's find something for your playlist</h2>
         <div className="header">
            <SearchBar onSearch={onSearchSongs} placeholderTxt={'Search for songs'} />
            <button onClick={onClose}>
               <X />
            </button>
         </div>
         {songs.length > 0 && (
            <ul>
               {songs.map((song) => (
                  <SongPreview
                     song={song}
                     onSelect={() => null}
                     onRemove={() => null}
                     onAdd={handleAdd}
                     onContextMenu={() => null}
                     type={'FindMore'}
                  />
               ))}
            </ul>
         )}
      </section>
   );
}
