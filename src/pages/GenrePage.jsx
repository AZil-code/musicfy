import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchGenre } from '../store/actions/search.actions';
import { StationCard } from '../cmps/StationCard';

// TODO: add onCLick

export function GenrePage() {
   const { genreName } = useParams();
   const [stations, setStations] = useState([]);
   const [albums, setAlbums] = useState([]);

   useEffect(() => {
      loadStations();
   }, []);

   async function loadStations() {
      const res = await searchGenre(genreName);
      setStations(res.playlists);
      setAlbums(res.albums);
   }

   return (
      <section>
         <h1>{genreName}</h1>
         <h2>Top {genreName} Playlists</h2>
         <div className="station-row">
            {stations.map((station) => (
               <StationCard station={station} onClickCard={() => console.log('click')} />
            ))}
         </div>
         <h2>Top {genreName} Albums</h2>
         <div className="station-row">
            {albums.map((album) => (
               <StationCard station={album} onClickCard={() => console.log('click')} />
            ))}
         </div>
      </section>
   );
}
