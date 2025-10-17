import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { songsReducer } from './reducers/song.reducer.js'
import { userReducer } from './reducers/user.reducer.js'
import { stationsReducer } from './reducers/station.reducer.js'
import { playerReducer } from './reducers/player.reducer.js'

export const rootReducer = combineReducers({
   songModule: songsReducer,
   userModule: userReducer,
   stationModule: stationsReducer,
   playerModule: playerReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

//* For debugging
window.gStore = store

store.subscribe( () => {
    console.log('Current state: ', store.getState())
})

