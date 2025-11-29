import { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import { youtubeService } from '../services/youtube.service';
import { SongPreview } from './SongPreview';
import { X } from '../svgs/Icons';

export function FindMore({ onClose }) {
   const [songs, setSongs] = useState([]);

   async function onSearchSongs(searchStr) {
      setSongs(await youtubeService.searchSongs(searchStr));
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
                     song={youtubeService.formatSong(song)}
                     onSelect={() => null}
                     onRemove={() => null}
                     onContextMenu={() => null}
                     type={'FindMore'}
                  />
               ))}
            </ul>
         )}
      </section>
   );
}
