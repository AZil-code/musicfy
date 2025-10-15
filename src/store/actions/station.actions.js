import { stationService } from '../../services/station.service';

export async function createStation() {
   try {
      return await stationService.save({
         ...stationService.getDefaultStation(),
         createdBy: '', // Use user reducer or take user ID as an argument? add logic
         createdAt: Date.now(),
      });
   } catch (error) {
      console.error('station actions -> cannot create station! ', error);
      throw error;
   }
}

export async function addSong(station, song) {
   station.songs.push(song);
   try {
      const newStation = await stationService.save(station);
      return newStation.songs;
   } catch (error) {
      console.error('station actions -> cannot add song to station! ', error);
      throw error;
   }
}

export async function removeSong(station, songToRmv) {
   const songIdx = station.songs.findIndex((song) => song._id === songToRmv._id);
   station.songs.splice(songIdx, 1);
   try {
      const newStation = await stationService.save(station);
      return newStation.songs;
   } catch (error) {
      console.error('station actions -> cannot remove song from station! ', error);
      throw error;
   }
}

// For different uses - for example make station public/private
export async function saveStation(station) {
   //    const type = station._id ? 'UPDATE_station' : 'ADD_station';
   try {
      const newstation = await stationService.save(station);
      //   store.dispatch({ type: type, station: newstation });
      return newstation;
   } catch (error) {
      console.error('station actions -> Cannot save station: ', error);
      throw error;
   }
}

// Also need to remove from user liked songs - may be a different story
export async function deleteStation(station) {
   try {
      await stationService.remove(station._id);
   } catch (error) {
      console.error('station actions -> cannot delete station! ', error);
      throw error;
   }
}
