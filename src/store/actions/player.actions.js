import { SET_CURRENT_SONG, SET_IS_PLAYING } from '../reducers/player.reducer.js'
import { store } from '../store.js'

const { dispatch } = store

export const play = () => {
    try {
        dispatch({ type: SET_IS_PLAYING, isPlaying: true })
    } catch (e) {
        console.log('Error in player action: ', e)
        throw e
    }
}

export const pause = () => {
    try {
        dispatch({ type: SET_IS_PLAYING, isPlaying: false })
    } catch (e) {
        console.log('Error in player action: ', e)
        throw e
    }
}

export const playPause = (isPlaying) => {
    try {
        dispatch({ type: SET_IS_PLAYING, isPlaying: !isPlaying })
    } catch (e) {
        console.log('Error in player action: ', e)
        throw e
    }
}

export const setCurrentSong = (song) => {
    try {
        dispatch({
            type: SET_CURRENT_SONG,
            currentSong: song,
            currentSongId: song?._id || '',
        })
    } catch (e) {
        console.log('Error in player action: ', e)
        throw e
    }
}
