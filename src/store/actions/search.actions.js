import { searchService } from '../../services/search.service.js';
import { SET_SEARCH_RESULTS, SET_YTB_ID } from '../reducers/seach.reducer.js';
import { store } from '../store.js';

export async function searchSong(searchStr) {
   try {
      if (!searchStr || !String(searchStr).trim().length) return [];
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
   try {
      const firstArtist =
         Array.isArray(song.artists) && song.artists.length
            ? typeof song.artists[0] === 'string'
               ? song.artists[0]
               : song.artists[0]?.name || ''
            : '';
      const { ytbId } = await searchService.fetchYtbId(`${firstArtist} - ${song.title}`);
      if (!ytbId) throw new Error('Failed fetching Youtube ID');
      song.ytbId = ytbId;
      store.dispatch({ song, type: SET_YTB_ID });
      return ytbId;
   } catch (error) {
      console.error('search actions -> cannot fetch yotube ID! ', error);
      throw error;
   }
}

export async function fetchCategories() {
   try {
      return await searchService.getCategories();
   } catch (error) {
      console.error('search actions -> cannot fetch yotube ID! ', error);
      throw error;
   }
}
