import { youtubeService } from '../../services/youtube.service';
import { SET_RESULTS } from '../reducers/seach.reducer';
import { store } from '../store';

export async function searchYoutube(searchStr) {
   try {
      const res = await youtubeService.searchSongs(searchStr);
      const items = (await res.json()).items;
      store.dispatch({ items, type: SET_RESULTS });
      return items;
   } catch (error) {
      console.error('youtube actions -> cannot search songs! ', error);
      throw error;
   }
}
