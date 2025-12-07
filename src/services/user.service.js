import { httpService } from './http.service.js';
import { stationService } from './station.service.js';

const STORAGE_KEY_LOGGEDIN = 'user';
const BASE_URL = 'user';
const AUTH_URL = 'auth';

export const userService = {
   getLoggedinUser,
   login,
   logout,
   signup,
   getById,
   query,
   getEmptyCredentials,
   setRecentlyPlayed,
   getRecentlyPlayed,
   setLoggedinUser,
   saveUser,
};

async function query(filterBy = {}) {
   return httpService.get(BASE_URL, filterBy);
}

async function getById(userId) {
   return httpService.get(`${BASE_URL}/${userId}`);
}

async function getRecentlyPlayed(userId) {
   const id = userId || (getLoggedinUser() && getLoggedinUser()._id);
   if (!id) return [];
   try {
      const user = await getById(id);
      return Array.isArray(user.recentlyPlayed) ? user.recentlyPlayed.slice(0, 8) : [];
   } catch (error) {
      console.log('Error in user service (getRecentlyPlayed): ', error);
      throw error;
   }
}

async function login(credentials) {
   const user = await httpService.post(`${AUTH_URL}/login`, credentials);
   return _setLoggedinUser(_formatMiniUser(user));
}

async function signup(credentials) {
   // Backend should return the newly created user (with any seeded savedStations)
   const user = await httpService.post(`${AUTH_URL}/signup`, credentials);

   // Fallback: ensure liked playlist exists if backend didn't attach it
   if (!Array.isArray(user.savedStations) || !user.savedStations.length) {
      try {
         const likedEntry = await stationService.createLikedSongs();
         user.savedStations = [likedEntry];
      } catch (err) {
         console.error('signup -> failed to create liked songs entry', err);
      }
   }

   return _setLoggedinUser(_formatMiniUser(user));
}

async function logout() {
   await httpService.post(`${AUTH_URL}/logout`);
   sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN);
}

async function setRecentlyPlayed(stationToAdd) {
   try {
      const loggedInUser = getLoggedinUser();
      if (!loggedInUser) throw new Error('No logged in User');
      const user = await getById(loggedInUser._id);
      const recentlyPlayed = Array.isArray(user.recentlyPlayed) ? [...user.recentlyPlayed] : [];

      const filtered = recentlyPlayed.filter((station) => station._id !== stationToAdd._id);
      filtered.unshift(stationToAdd);

      const updatedUser = { ...user, recentlyPlayed: filtered };
      const saved = await saveUser(updatedUser);

      _setLoggedinUser({ ...loggedInUser, recentlyPlayed: filtered });
      return saved;
   } catch (e) {
      console.log('Error in user service: ', e);
      throw e;
   }
}

async function saveUser(user) {
   if (!user || !user._id) throw new Error('User is required to save');
   return httpService.put(`${BASE_URL}/${user._id}`, user);
}

function getLoggedinUser() {
   return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN));
}

function _formatMiniUser(user) {
   if (!user) return null;
   return {
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      recentlyPlayed: Array.isArray(user.recentlyPlayed) ? user.recentlyPlayed : [],
      savedStations: Array.isArray(user.savedStations) ? user.savedStations : [],
   };
}

function _setLoggedinUser(user) {
   const userToSave = _formatMiniUser(user);
   sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave));
   return userToSave;
}

function setLoggedinUser(user) {
   return _setLoggedinUser(user);
}

function getEmptyCredentials() {
   return {
      fullName: '',
      userName: '',
      password: '',
   };
}
