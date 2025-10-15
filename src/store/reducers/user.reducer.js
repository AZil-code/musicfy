export const SET_USER = 'SET_USER'
export const CLEAR_USER = 'CLEAR_USER'

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
        default: {
            return state
        }
    }
}
