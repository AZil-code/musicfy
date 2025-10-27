export const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
export const SET_IS_PLAYING = 'SET_IS_PLAYING'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_PLAY_ORDER = 'SET_PLAY_ORDER'
export const SET_IS_SHUFFLE = 'SET_IS_SHUFFLE'
export const SET_IS_REPEAT = 'SET_IS_REPEAT' 

const initialState = {
    isPlaying: false,
    currentSong: null,
    currentSongId: '',
    isPlayerLoading: false,
    queue: [],
    queueIndex: -1,
    playOrder: [],
    isShuffle: false,
    isRepeat: false,
}

export function playerReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_CURRENT_SONG: {
            const nextQueue = Array.isArray(cmd.queue) ? cmd.queue : state.queue

            let nextIndex
            if (typeof cmd.queueIndex === 'number') {
                nextIndex = cmd.queueIndex
            } else if (cmd.currentSong && nextQueue.length) {
                const idx = nextQueue.findIndex(
                    (song) => song && cmd.currentSong && String(song._id) === String(cmd.currentSong._id)
                )
                nextIndex = idx >= 0 ? idx : state.queueIndex
            } else {
                nextIndex = state.queueIndex
            }

            const nextSongId =
                cmd.currentSongId || (cmd.currentSong && cmd.currentSong._id) || ''

            return {
                ...state,
                currentSong: cmd.currentSong,
                currentSongId: nextSongId,
                queue: nextQueue,
                queueIndex: nextIndex,
            }
        }
        case SET_IS_PLAYING: {
            return {
                ...state,
                isPlaying: cmd.isPlaying,
            }
        }
        case SET_IS_LOADING: {
            return {
                ...state,
                isPlayerLoading: cmd.isPlayerLoading,
            }
        }
        case SET_PLAY_ORDER: {
            return {
                ...state, 
                playOrder: cmd.playOrder,
            }
        }
        case SET_IS_SHUFFLE: {
            return {
                ...state, 
                isShuffle: cmd.isShuffle,
            }
        }
        default: {
            return state
        }
    }
}
