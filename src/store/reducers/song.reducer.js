export const SET_SONGS = 'SET_SONGS'
export const UPDATE_SONG = 'UPDATE_SONG'
export const REMOVE_SONG = 'REMOVE_SONG'
export const ADD_SONG = 'ADD_SONG'
export const SET_ISLOADING = 'SET_ISLOADING'

const initialState = {
    songs: [],
    isLoading: false,
}

export function songsReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_SONGS: {
            return { ...state, songs: cmd.songs }
        }
        case UPDATE_SONG: {
            return {
                ...state,
                songs: state.songs.map((song) => (song.id === cmd.song.id ? cmd.song : song)),
            }
        }
        case REMOVE_SONG: {
            return {
                ...state,
                songs: state.songs.filter((song) => song.id !== cmd.song.id),
            }
        }
        case ADD_SONG: {
            return { ...state, songs: [...state.songs, cmd.song] }
        }
        case SET_ISLOADING: {
            return { ...state, isLoading: cmd.isLoading }
        }
        default: {
            return state
        }
    }
}
