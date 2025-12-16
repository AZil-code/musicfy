import { httpService } from './http.service';

export const searchService = { search, fetchYtbId, searchSongs, getPlaylistTracks, getAlbumTracks };

async function search(searchStr) {
   const endpoint = `search/spotifyFull`;
   try {
      const results = await httpService.get(endpoint, { q: searchStr });
      return results;
   } catch (err) {
      console.error(err);
      throw err;
   }
}

async function searchSongs(searchStr) {
   const endpoint = `search/spotify`;
   try {
      const songs = await httpService.get(endpoint, { q: searchStr });

      console.log('songs: ', songs)
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

async function getPlaylistTracks(playlistId) {
   if (!playlistId) throw new Error('playlist id is required');
   const endpoint = `search/playlist/${playlistId}`;
   try {
      return await httpService.get(endpoint);
   } catch (err) {
      console.error(err);
      throw err;
   }
}

async function getAlbumTracks(albumId) {
   if (!albumId) throw new Error('album id is required');
   const endpoint = `search/album/${albumId}`;
   try {
      return await httpService.get(endpoint);
   } catch (err) {
      console.error(err);
      throw err;
   }
}
