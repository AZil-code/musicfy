import { searchService } from '../../services/search.service.js';
import { SET_SEARCH_RESULTS, SET_YTB_ID } from '../reducers/seach.reducer.js';
import { store } from '../store.js';

// export async function searchYoutube(searchStr) {
//     try {
//         const items = await youtubeService.searchSongs(searchStr)
//         if (!Array.isArray(items)) return []
//         return items
//             .map((item) => youtubeService.formatSong(item))
//             .filter(Boolean)
//     } catch (error) {
//         console.error('youtube actions -> cannot search songs! ', error)
//         throw error
//     }
// }
export async function searchSong(searchStr) {
   try {
      const songs = await searchService.search(searchStr);
      store.dispatch({ songs, type: SET_SEARCH_RESULTS });
      if (!Array.isArray(songs)) return [];
      return songs;
   } catch (error) {
      console.error('search actions -> cannot search songs! ', error);
      throw error;
   }
}

export async function fetchYtbId(song) {
   console.log('fetchYtbId');
   try {
      const { ytbId } = await searchService.fetchYtbId(`${song.artists[0]} - ${song.title}`);
      if (!ytbId) throw new Error('Failed fetching Youtube ID');
      song.ytbId = ytbId;
      store.dispatch({ song, type: SET_YTB_ID });
      return ytbId;
   } catch (error) {
      console.error('search actions -> cannot fetch yotube ID! ', error);
      throw error;
   }
}
