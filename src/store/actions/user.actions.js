import { SET_USER, CLEAR_USER, SET_RECENTLY_PLAYED } from "../reducers/user.reducer.js"
import { store } from '../store'
import { userService } from "../../services/user.service.js"
import { stationService } from "../../services/station.service.js"

export async function fetchRecentlyPlayed() {
    const state = store.getState()
    try {
        const userId = state.userModule.user && state.userModule.user._id
        if (!userId) return []
        const stations = await userService.getRecentlyPlayed(userId)
        store.dispatch({ type: SET_RECENTLY_PLAYED, recentlyPlayed: stations })
        return stations

    } catch (error) {
        console.error('error in user actions; ', error)
        throw error
    }
}
export async function addRecentlyPlayed(stationToAdd) {

    const state = store.getState()
    const loggedInUser = state.userModule.user
    if (!loggedInUser || !stationToAdd ) return []

    try {

        const savedStations = loggedInUser.savedStations
        
        const user = await userService.getById(loggedInUser._id)
        
        const idxToModify = savedStations.findIndex( (station) => station.stationId === stationToAdd._id ) 
        
        if (idxToModify !== -1) savedStations[idxToModify].lastPlayedAt = Date.now()
            
        const updatedUser = { ...user, savedStations }

        await userService.saveUser(updatedUser)

        store.dispatch({ type: SET_USER, user: { ...loggedInUser, savedStations } })

        return 'Promise.resolve()'
    } catch (error) {
        console.error('error in user actions; ', error)
        throw error
    }
}

export async function getUserStations(sortBy='Recents'){
    try {
        const state = store.getState()
        const loggedInUser = state.userModule.user
        if (!loggedInUser) return []

        const user = await userService.getById(loggedInUser._id)
        const userStations = user.savedStations

        sortBy === 'Recents' && (userStations.sort( (a,b) => b.lastPlayedAt - a.lastPlayedAt ))
        sortBy === 'Alphabetical' && (userStations.sort((a, b) =>(a.stationName || '').toLowerCase().localeCompare((b.stationName || '').toLowerCase())))
        // userStations.sort((a, b) => (a?.name === 'Liked Songs') - (b?.name === 'Liked Songs'))

        // userStations.sort( (a,b) => (b.isPinned === true) - (a.isPinned === true) )

        userStations.sort((a, b) =>
            (b?.isPinned === true) - (a?.isPinned === true) ||
            (b?.stationName === 'Liked Songs') - (a?.stationName === 'Liked Songs')
        )

        let stations = []

        for (const { stationId, lastPlayedAt, isPinned } of userStations) {
            const station = await stationService.get(stationId)
            station.isPinned = isPinned
            stations.push(station)
        }

        return stations
        
    } catch (error) {
        console.error('error in user actions; ', error)
        throw error
    }
}
export async function addUserStation(stationId, options = {}){

    try {
        const state = store.getState()
        const loggedInUser = state.userModule.user
        if (!loggedInUser || !stationId ) return []

        const user = await userService.getById(loggedInUser._id)
        const savedStations = Array.isArray(user.savedStations) ? [...user.savedStations] : []
        const entryIdx = savedStations.findIndex((item) => item && item.stationId === stationId)
        const station = await stationService.get(stationId)
        const stationName = station.name
        const incomingPinned = Boolean(options.isPinned)
        const entry = {
            stationId,
            lastPlayedAt: options.lastPlayedAt || Date.now(),
            isPinned: incomingPinned,
            stationName: stationName
        }

        if (entryIdx >= 0) {
            const existing = savedStations[entryIdx] || {}
            savedStations[entryIdx] = {
                ...existing,
                ...entry,
                isPinned: existing.isPinned || incomingPinned,
            }
        } else {
            savedStations.unshift(entry)
        }

        const updatedUser = { ...user, savedStations }
        await userService.saveUser(updatedUser)

        store.dispatch({ type: SET_USER, user: { ...loggedInUser, savedStations } })
        return savedStations

        
    } catch (error) {
        console.error('error in user actions; ', error)
        throw error
    }
}

export async function removeUserStation(stationId){

    try {
        const state = store.getState()
        const loggedInUser = state.userModule.user
        if (!loggedInUser || !stationId ) return []

        const user = await userService.getById(loggedInUser._id)
        const savedStations = Array.isArray(user.savedStations) ? [...user.savedStations] : []
        const entryIdx = savedStations.findIndex((item) => item && item.stationId === stationId)
        
        if (entryIdx !== -1){
            savedStations.splice(entryIdx, 1)
        } else{
            throw new Error('failed to remove station')
        }
       

        const updatedUser = { ...user, savedStations }
        await userService.saveUser(updatedUser)

        store.dispatch({ type: SET_USER, user: { ...loggedInUser, savedStations } })
        return updatedUser

        
    } catch (error) {
        console.error('error in user actions; ', error)
        throw error
    }
}

export async function pinStation(stationId){
   try {
        console.log('stationId: ', stationId)

        const state = store.getState()
        const loggedInUser = state.userModule.user
        if (!loggedInUser || !stationId ) return []

        const user = await userService.getById(loggedInUser._id)

        const savedStations = Array.isArray(user.savedStations) ? [...user.savedStations] : []
        const entryIdx = savedStations.findIndex((item) => item && item.stationId === stationId)

        if (entryIdx !== -1){
            savedStations[entryIdx].isPinned ? (savedStations[entryIdx].isPinned = false) : (savedStations[entryIdx].isPinned = true)
        } else{
            throw new Error('failed to pin station')
        }
        console.log('savedStations[entryIdx].isPinned: ', savedStations[entryIdx].isPinned)

        const updatedUser = { ...user, savedStations }
        await userService.saveUser(updatedUser)

        store.dispatch({ type: SET_USER, user: { ...loggedInUser, savedStations } })
   } catch (error) {
        console.error('station actions -> cannot select station! ', error);
        throw error;
   }
}
