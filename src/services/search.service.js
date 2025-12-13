import { httpService } from './http.service';

export const searchService = { search, fetchYtbId, getCategories };

async function search(searchStr) {
   const endpoint = `search/spotify`;
   try {
      const songs = await httpService.get(endpoint, { q: searchStr });
      return songs;
   } catch (err) {
      console.error(err);
      throw err;
   }
}

async function fetchYtbId(songName) {
   const endpoint = `search/youtube`;
   try {
      const ytbId = await httpService.get(endpoint, { q: songName });
      return ytbId;
   } catch (err) {
      console.error(err);
      throw err;
   }
}

async function getCategories() {
   const endpoint = `search`;
   try {
      const categories = await httpService.get(endpoint);
      return categories;
   } catch (err) {
      console.error(err);
      throw err;
   }
}
