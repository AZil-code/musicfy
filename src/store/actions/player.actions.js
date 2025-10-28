import {
   SET_CURRENT_SONG,
   SET_IS_PLAYING,
   SET_IS_SHUFFLE,
   SET_IS_REPEAT,
   SET_PLAY_ORDER,
   SET_CURRENT_STATION,
} from '../reducers/player.reducer.js';
import { store } from '../store.js';
import { getRandomIntInclusive, getIndexArray } from '../../services/util.service.js';

const { dispatch } = store;
const getState = () => store.getState();

export const play = () => {
   try {
      const state = getState();
      dispatch({ type: SET_IS_PLAYING, isPlaying: true });
   } catch (e) {
      console.log('Error in player action: ', e);
      throw e;
   }
};

export const pause = () => {
   try {
      dispatch({ type: SET_IS_PLAYING, isPlaying: false });
   } catch (e) {
      console.log('Error in player action: ', e);
      throw e;
   }
};

export const playPause = (isPlaying) => {
   try {
      dispatch({ type: SET_IS_PLAYING, isPlaying: !isPlaying });
   } catch (e) {
      console.log('Error in player action: ', e);
      throw e;
   }
};

export const shuffle = (shuffle) => {
   try {
      const state = getState();
      const queue = state.playerModule.queue;
      const orderObject = getIndexArray(queue);
      const playOrder = shuffle ? orderObject.randomizedIndexes : orderObject.orderedIndexes;

      dispatch({ type: SET_IS_SHUFFLE, isShuffle: shuffle });
      dispatch({ type: SET_PLAY_ORDER, playOrder: playOrder });
   } catch (e) {
      console.log('Error in player action: ', e);
      throw e;
   }
};

export const repeat = (repeat) => {
   try {
      const state = getState();
      const isShuffle = state.playerModule.isShuffle;
      dispatch({ type: SET_IS_REPEAT, isRepeat: repeat });
      if (isShuffle) dispatch({ type: SET_IS_SHUFFLE, isShuffle: false });
   } catch (e) {
      console.log('Error in player action: ', e);
      throw e;
   }
};

export const setCurrentSong = (song, options = {}) => {
   try {
      dispatch({
         type: SET_CURRENT_SONG,
         currentSong: song,
         currentSongId: (song && song._id) || '',
         queue: options.queue,
         queueIndex: options.queueIndex,
      });
   } catch (e) {
      console.log('Error in player action: ', e);
      throw e;
   }
};

export const setCurrentStation = (station) => {
   try {
      dispatch({
         type: SET_CURRENT_STATION,
         currentStation: station,
      });
   } catch (e) {
      console.log('Error in player action: ', e);
      throw e;
   }
};

export const playNext = () => {
   try {
      const state = getState();
      const { queue = [], queueIndex = -1, isShuffle, playOrder = [], isRepeat } = state.playerModule || {};
      let nextIndex;
      if (isShuffle && Array.isArray(playOrder) && playOrder.length === queue.length) {
         const pos = playOrder.indexOf(queueIndex);
         const nextPos = (pos + 1) % playOrder.length;
         nextIndex = playOrder[nextPos];
      } else if (isRepeat) {
         nextIndex = queueIndex;
      } else {
         nextIndex = (queueIndex + 1) % queue.length;
      }

      console.log('nextIndex: ', nextIndex);
      const nextSong = queue[nextIndex];
      if (!nextSong) return;
      setCurrentSong(nextSong, { queue, queueIndex: nextIndex });
      play();
   } catch (e) {
      console.log('Error in player action (playNext): ', e);
      throw e;
   }
};

export const playPrev = () => {
   try {
      const state = getState();
      const { queue = [], queueIndex = -1, isShuffle, playOrder = [], isRepeat } = state.playerModule || {};
      let nextIndex;
      if (isShuffle && Array.isArray(playOrder) && playOrder.length === queue.length) {
         const pos = playOrder.indexOf(queueIndex);
         const nextPos = (pos - 1 + playOrder.length) % playOrder.length;
         nextIndex = playOrder[nextPos];
      } else if (isRepeat) {
         nextIndex = queueIndex;
      } else {
         nextIndex = (queueIndex - 1 + playOrder.length) % queue.length;
      }

      const nextSong = queue[nextIndex];
      if (!nextSong) return;
      setCurrentSong(nextSong, { queue, queueIndex: nextIndex });
      play();
   } catch (e) {
      console.log('Error in player action (playPrev): ', e);
      throw e;
   }
};
