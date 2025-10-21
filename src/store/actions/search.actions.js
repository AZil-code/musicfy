import { youtubeService } from '../../services/youtube.service.js';
import { SET_RESULTS } from '../reducers/seach.reducer.js';
import { store } from '../store.js';

export async function searchYoutube(searchStr) {
   try {
      const res = await youtubeService.searchSongs(searchStr);
      const items = (await res.json()).items;
      store.dispatch({ items, type: SET_RESULTS }); // Might be deprecated
      return items.map((item) => youtubeService.formatSong(item));
   } catch (error) {
      console.error('youtube actions -> cannot search songs! ', error);
      throw error;
   }
}
