import { useEffect, useState } from 'react';
import { searchYoutube } from '../store/actions/search.actions';
import { useParams } from 'react-router-dom';
import { SongList } from '../cmps/SongList';

export function SearchResults() {
   const [searchResults, setSearchResults] = useState(null);
   const { searchStr } = useParams();

   useEffect(() => {
      loadSearchResults();
   }, [searchStr]);

   async function loadSearchResults() {
      setSearchResults(await searchYoutube(searchStr));
   }

   if (!searchResults) return <div></div>;

   return (
      <div>
         <SongList songs={searchResults} />
      </div>
   );
}
