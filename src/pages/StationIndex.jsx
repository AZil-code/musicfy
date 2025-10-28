import { useSelector } from 'react-redux';
import { SongSuggestion } from '../cmps/SongSuggestion';
import { pause, play, setCurrentSong, setCurrentStation } from '../store/actions/player.actions';

const categories = ['For You', 'Top Hits', 'Best of 2025'];

export function StationIndex() {
   const { currentStation, isPlaying } = useSelector((store) => store.playerModule);

   function onPlay(station, ev = {}) {
      if (!currentStation || station._id !== currentStation._id) {
         setCurrentStation(station);
         setCurrentSong(station.songs[0]);
         play();
      } else if (isPlaying) pause();
      else play();
      ev.stopPropagation();
   }

   return (
      <div className="page-home">
         {categories.map((category) => (
            <SongSuggestion title={category} onPlay={onPlay} />
         ))}
      </div>
   );
}
