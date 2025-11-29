export const SET_USER = 'SET_USER'
export const CLEAR_USER = 'CLEAR_USER'
export const SET_RECENTLY_PLAYED = 'SET_RECENTLY_PLAYED'

const initialState = {
    user: null,
}

export function userReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_USER: {
            return { ...state, user: cmd.user }
        }
        case CLEAR_USER: {
            return { ...state, user: null }
        }
        // case SET_RECENTLY_PLAYED: {
        //     return { ...state, user: { ...state.user, recentlyPlayed: cmd.recentlyPlayed }}
        // }
        default: {
            return state
        }
    }
}
