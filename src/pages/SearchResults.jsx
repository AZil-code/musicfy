import { useEffect, useState } from 'react';
import { searchYoutube } from '../store/actions/search.actions';
import { useParams } from 'react-router-dom';

export function SearchResults() {
   const [searchResults, setSearchResults] = useState(null);
   const { searchStr } = useParams();

   console.log(`search string ` + searchStr);

   useEffect(() => {
      loadSearchResults();
   }, [searchStr]);

   async function loadSearchResults() {
      setSearchResults(await searchYoutube(searchStr));
   }

   if (!searchResults) return <div></div>;

   return (
      <div>
         <ul>
            {searchResults.map((res) => (
               <li>{res.snippet.title}</li>
            ))}
         </ul>
      </div>
   );
}
