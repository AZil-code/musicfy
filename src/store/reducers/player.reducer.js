export const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
export const SET_IS_PLAYING = 'SET_IS_PLAYING'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    isPlaying: false,
    currentSong: null,
    currentSongId: '',
    isPlayerLoading: false,
}

export function playerReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_CURRENT_SONG: {
            return { 
                ...state, 
                currentSong: cmd.currentSong,
                currentSongId: cmd.currentSongId || cmd.currentSong?._id || '',
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
        default: {
            return state
        }
    }
}
