import { SET_CURRENT_SONG, SET_IS_PLAYING } from "../reducers/player.reducer.js"

import { store } from '../store.js'

const { dispatch, getState } = store

export const play = async () => {
    const state = getState()

    try {
        dispatch({ type: SET_IS_PLAYING, isPlaying: true})
    }
    catch(e) {
        console.log( 'Error in player action: ', e )
        throw e
    }  
}

export const pause = async () => {
    const state = getState()
    try{
        dispatch({ type: SET_IS_PLAYING, isPlaying: false})
    }
    catch(e){
        console.log( 'Error in player action: ', e )
        throw e
    }
}

export const playPause = async (isPlaying) => {
    const state = getState()
    try{
        dispatch({ type: SET_IS_PLAYING, isPlaying: !isPlaying})
    }
    catch(e){
        console.log( 'Error in player action: ', e )
        throw e
    }
}

export const setCurrentSong = async () => {
    const state = getState()
    
    try{
        dispatch({ type: SET_CURRENT_SONG, currentSong: song})
    }
    catch(e){
        console.log( 'Error in player action: ', e )
        throw e
    }
}

