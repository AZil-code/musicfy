import { httpService } from './http.service';

export const searchService = { search };

async function search(searchStr) {
   const endpoint = `search`;
   try {
      const songs = await httpService.get(endpoint, { q: searchStr });
      return songs;
   } catch (err) {
      console.error(err);
      throw err;
   }
}
