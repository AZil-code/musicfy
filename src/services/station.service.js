import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';

const STATION_KEY = 'stationDB';

// {
// 	"_id": "",
// 	"name": "",
// 	"songs": [
// 		{
// 			"_id": "Question - keep ytbId/url or fetch from DB",
// 			"imgUrl": "",
// 			"title": "",
// 			"artists": [
// 				{
// 					"name": "",
// 					"_id": ""
// 				}
// 			],
// 			"album": "",
// 			"length": 12,
// 			"dateAdded": 1
// 		}
// 	],
// 	"tags": [
// 		"funk",
// 		"happy"
// 	],
// 	"createdBy": {
// 		"_id": "",
// 		"username": "",
// 		"imgUrl": ""
// 	},
//	"isPrivate": false,
// 	"likedByUsers": ["user id", "Do we need it? can be used to dispaly total saves"],
// 	"isLikedSongsPlaylist": false,
//  "createdAt": 0
// }

export const stationService = {
   query,
   get,
   remove,
   save,
   getDefaultStation,
   getDefaultFilter,
   //    getDefaultSort,
};

// _createStations();

// Filter options: createdBy user, liked by user (?), tags, name
// Created by spotify filter is available
async function query(filterBy = {}) {
   try {
      let stations = await storageService.query(STATION_KEY);
      if (filterBy.name) {
         const regex = new RegExp(filterBy.name, 'i');
         stations = stations.filter((station) => regex.test(station.name));
      }
      if (filterBy.tags) stations.filter((station) => station.tags.some((tag) => filterBy.tags.includes(tag)));
      if (filterBy.createdBy) stations.filter((station) => station.createdBy._id === filterBy.createdBy);
      if (filterBy.userStations) stations.filter((station) => filterBy.userStations.includes(station._id));
      return stations;
   } catch (error) {
      console.error(error);
      throw error;
   }
}

async function get(stationId) {
   return await storageService.get(STATION_KEY, stationId);
}

async function remove(stationId) {
   return await storageService.remove(STATION_KEY, stationId);
}

async function save(station) {
   return await (station._id
      ? storageService.put(STATION_KEY, station)
      : storageService.post(STATION_KEY, { ...station, createdAt: Date.now() }));
}

function getDefaultFilter() {
   return {
      name: '',
      createdBy: '',
      tags: [],
      userStations: [], // An array of stations IDs liked by a user
   };
}

function getDefaultStation() {
   return {
      name: '',
      songs: [],
      tags: [],
      createdBy: {},
      likedByUsers: [], // May be removed
      isLikedSongsPlaylist: false,
      isPrivate: false,
   };
}

// function getDefaultSort() {
//    return { field: '', isDesc: true };
// }

// incomplete
// async function _createStations() {
//    let stations = utilService.loadFromStorage(STATION_KEY);
//    if (!stations || !stations.length) {
//       stations = [
//          {
//             _id: utilService.makeId(),
//             name: 'Talking Doll',
//          },
//       ];
//       utilService.saveToStorage(STATION_KEY, stations);
//    }
// }
