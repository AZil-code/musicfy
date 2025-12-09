import { stationService } from '../../services/station.service';
import { addRecentlyPlayed } from './user.actions.js';
import { ADD_STATION, REMOVE_STATION, SELECT_STATION, SET_STATIONS, UPDATE_STATION } from '../reducers/station.reducer';
import { store } from '../store';
import { utilService } from '../../services/util.service.js';

export async function fetchStations(filterBy) {
   try {
      const stations = await stationService.query(filterBy);
      store.dispatch({ stations, type: SET_STATIONS });
   } catch (error) {
      console.error('station actions -> cannot load stations! ', error);
      throw error;
   }
}

export async function createStation() {
   const state = store.getState();
   try {
      const station = await stationService.save({
         ...stationService.getDefaultStation(),
         createdBy: '', // Use user reducer or take user ID as an argument? add logic OR let backend hanlde it with auth
         createdAt: Date.now(),
         name: `My Playlist #${state.userModule.user.savedStations.length + 1}`,
         // add to user liked playlists - or do it in cmp
      });
      store.dispatch({ station, type: ADD_STATION });
      return station;
   } catch (error) {
      console.error('station actions -> cannot create station! ', error);
      throw error;
   }
}

export async function addSong(oldStation, song) {
   const songToAdd = song && song._id ? song : { ...song, _id: utilService.makeId() };
   oldStation.songs.push(songToAdd);
   try {
      const station = await stationService.save(oldStation);
      store.dispatch({ station, type: UPDATE_STATION });
      return station.songs;
   } catch (error) {
      console.error('station actions -> cannot add song to station! ', error);
      throw error;
   }
}

export async function removeSong(oldStation, songToRmv) {
   const songIdx = oldStation.songs.findIndex((song) => song._id === songToRmv._id);
   oldStation.songs.splice(songIdx, 1);
   try {
      const station = await stationService.save(oldStation);
      store.dispatch({ station, type: UPDATE_STATION });
      return station.songs;
   } catch (error) {
      console.error('station actions -> cannot remove song from station! ', error);
      throw error;
   }
}

export async function updateStationArtwork(stationId, coverImage) {
   if (!stationId || !coverImage) return;
   const { stationModule } = store.getState();
   const existingStation = stationModule.stations.find((station) => station._id === stationId);
   if (!existingStation) return;
   if (existingStation.coverImage === coverImage) return existingStation;

   const stationToSave = { ...existingStation, coverImage };

   try {
      const updatedStation = await stationService.save(stationToSave);
      store.dispatch({ station: updatedStation, type: UPDATE_STATION });
      return updatedStation;
   } catch (error) {
      console.error('station actions -> cannot update station artwork! ', error);
      throw error;
   }
}

// For different uses - for example make station public/private
export async function saveStation(station) {
   const type = station._id ? UPDATE_STATION : ADD_STATION;
   try {
      const newstation = await stationService.save(station);
      store.dispatch({ type: type, station: newstation });
      return newstation;
   } catch (error) {
      console.error('station actions -> Cannot save station: ', error);
      throw error;
   }
}

// Also need to remove from user liked songs - may be a different story
export async function deleteStation(stationId) {
   try {
      await stationService.remove(stationId);
      store.dispatch({ stationId, type: REMOVE_STATION });
   } catch (error) {
      console.error('station actions -> cannot delete station! ', error);
      throw error;
   }
}

export function selectStation(stationId) {
   try {
      // addRecentlyPlayed()
      store.dispatch({ stationId, type: SELECT_STATION });
   } catch (error) {
      console.error('station actions -> cannot select station! ', error);
      throw error;
   }
}
