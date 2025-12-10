export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_YTB_ID = 'SET_YTB_ID';

const initialState = {
   searchResults: [],
};

export function searchReducer(state = initialState, cmd = {}) {
   switch (cmd.type) {
      case SET_SEARCH_RESULTS: {
         return { ...state, searchResults: cmd.songs };
      }
      case SET_YTB_ID:
         return {
            ...state,
            searchResults: state.searchResults.map((song) => {
               if (song.spotifyId == cmd.song.spotifyId) return cmd.song;
               else return song;
            }),
         };
      default:
         return state;
   }
}
