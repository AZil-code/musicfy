import { useState } from 'react';
import { ContextMenu } from './ContextMenu.jsx';
import { SongPreview } from './SongPreview.jsx';

export function SongList({ songIds = [], songs = [], onSelectSong, onRemoveSong, currentSongId, isPlaying }) {
   const [contextMenu, setContextMenu] = useState({
      visible: false,
      x: 0,
      y: 0,
      items: null,
   });
   const normalizedIds = Array.isArray(songIds) ? songIds.filter(Boolean).map(String) : [];

   let orderedSongs = Array.isArray(songs) ? songs : [];

   if (orderedSongs.length && normalizedIds.length) {
      const songMap = new Map(orderedSongs.map((song) => [String(song._id), song]));
      const arranged = normalizedIds.map((id) => songMap.get(id)).filter(Boolean);

      if (arranged.length) orderedSongs = arranged;
   }

   if (!orderedSongs.length) {
      return <div className="song-list-empty">No songs yet. Add something to get the party started.</div>;
   }

   function onOpenContextMenu(ev, song) {
      console.log('con');
      ev.preventDefault();
      setContextMenu({
         visible: true,
         x: ev.pageX,
         y: ev.pageY,
         items: new Map([['Delete', () => onRemoveSong(song)]]),
      });
   }

   function onCloseContextMenu() {
      setContextMenu({
         visible: false,
         x: 0,
         y: 0,
         items: null,
      });
   }

   const handleSelectSong = typeof onSelectSong === 'function' ? onSelectSong : () => {};
   const handleRemoveSong = typeof onRemoveSong === 'function' ? onRemoveSong : () => {};

   return (
      <div className="song-list-container">
         <ul className="song-list">
            {orderedSongs.map((song, idx) => (
               <SongPreview
                  key={song._id || idx}
                  idx={idx}
                  song={song}
                  onSelect={handleSelectSong}
                  //   onRemove={handleRemoveSong}
                  onContextMenu={(ev) => onOpenContextMenu(ev, song)}
                  isCurrent={Boolean(currentSongId) && currentSongId === song._id}
                  isPlaying={isPlaying}
               />
            ))}
         </ul>

         {contextMenu.visible && <ContextMenu menuData={contextMenu} onClose={onCloseContextMenu} />}
      </div>
   );
}
