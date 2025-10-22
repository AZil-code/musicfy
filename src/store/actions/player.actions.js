import { SET_CURRENT_SONG, SET_IS_PLAYING } from '../reducers/player.reducer.js'
import { store } from '../store.js'

const { dispatch } = store
const getState = () => store.getState()

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

export const setCurrentSong = (song, options = {}) => {
    try {
        dispatch({
            type: SET_CURRENT_SONG,
            currentSong: song,
            currentSongId: (song && song._id) || '',
            queue: options.queue,
            queueId: options.queueId,
            queueIndex: options.queueIndex,
        })
    } catch (e) {
        console.log('Error in player action: ', e)
        throw e
    }
}

export const playNext = () => {
    try {
        const state = getState()
        const { queue = [], queueIndex = -1, queueId } = state.playerModule || {}
        if (!Array.isArray(queue) || !queue.length) return
        const nextIndex = (queueIndex + 1 + queue.length) % queue.length
        const nextSong = queue[nextIndex]
        if (!nextSong) return
        setCurrentSong(nextSong, { queue, queueId, queueIndex: nextIndex })
        play()
    } catch (e) {
        console.log('Error in player action (playNext): ', e)
        throw e
    }
}

export const playPrev = () => {
    try {
        const state = getState()
        const { queue = [], queueIndex = -1, queueId } = state.playerModule || {}
        if (!Array.isArray(queue) || !queue.length) return
        const prevIndex = (queueIndex - 1 + queue.length) % queue.length
        const prevSong = queue[prevIndex]
        if (!prevSong) return
        setCurrentSong(prevSong, { queue, queueId, queueIndex: prevIndex })
        play()
    } catch (e) {
        console.log('Error in player action (playPrev): ', e)
        throw e
    }
}
