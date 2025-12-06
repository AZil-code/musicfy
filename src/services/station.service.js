import { httpService } from './http.service.js';

const BASE_URL = 'station';

export const stationService = {
   query,
   get,
   remove,
   save,
   getDefaultStation,
   getDefaultFilter,
};

async function query(filterBy = {}) {
   try {
      const stations = await httpService.get(BASE_URL, filterBy);
      return stations;
   } catch (error) {
      console.error(error);
      throw error;
   }
}

async function get(stationId) {
   try {
      return await httpService.get(`${BASE_URL}/${stationId}`);
   } catch (error) {
      console.error(error);
      throw error;
   }
}

async function remove(stationId) {
   return await httpService.delete(`${BASE_URL}/${stationId}`);
}

async function save(station) {
   return await (station._id
      ? httpService.put(`${BASE_URL}/${station._id}`, station)
      : httpService.post(BASE_URL, { ...station, createdAt: Date.now() }));
}

function getDefaultFilter() {
   return {
      name: '',
      createdBy: '',
      tags: [],
      userStations: [],
   };
}

function getDefaultStation() {
   return {
      name: '',
      songs: [],
      coverImage: '',
      tags: [],
      createdBy: {},
      likedByUsers: [],
      isLikedSongsPlaylist: false,
      isPrivate: false,
   };
}
