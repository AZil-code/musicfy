export const SET_RESULTS = 'SET_RESULTS';

const initialState = {
   searchResults: null,
};

export function searchReducer(state = initialState, cmd = {}) {
   switch (cmd.type) {
      case SET_RESULTS: {
         return { ...state, searchResults: cmd.items };
      }
      default:
         return state;
   }
}
