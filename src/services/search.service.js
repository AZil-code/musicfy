import { httpService } from './http.service';

export const searchService = { search, fetchYtbId };

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
      console.log(ytbId);
      return ytbId;
   } catch (err) {
      console.error(err);
      throw err;
   }
}
