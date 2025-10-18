export const SET_STATIONS = 'SET_STATIONS';
export const UPDATE_STATION = 'UPDATE_STATION';
export const REMOVE_STATION = 'REMOVE_STATION';
export const ADD_STATION = 'ADD_STATION';
export const SELECT_STATION = 'SELECT_STATION';

const initialState = {
   stations: [],
   selectedStationId: null,
};

export function stationsReducer(state = initialState, cmd = {}) {
   switch (cmd.type) {
      case SET_STATIONS: {
         return { ...state, stations: cmd.stations };
      }
      case UPDATE_STATION: {
         return {
            ...state,
            stations: state.stations.map((station) => (station.id === cmd.station.id ? cmd.station : station)),
         };
      }
      case REMOVE_STATION: {
         return {
            ...state,
            stations: state.stations.filter((station) => station._id !== cmd.stationId),
         };
      }
      case ADD_STATION: {
         return { ...state, stations: [...state.stations, cmd.station] };
      }
      case SELECT_STATION: {
         return { ...state, selectedStationId: cmd.stationId };
      }
      default: {
         return state;
      }
   }
}
