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
export async function addRecentlyPlayed(station) {

    const state = store.getState()
    const loggedInUser = state.userModule.user
    if (!loggedInUser || !station || !station._id) return []

    try {
        const likedSongs = await stationService.query({ name: 'Liked Songs' })
        const likedStation = Array.isArray(likedSongs) ? likedSongs[0] : null
        const user = await userService.getById(loggedInUser._id)
        const current = Array.isArray(user.recentlyPlayed) ? user.recentlyPlayed : []
        const filtered = current.filter(
            (item) =>
                item &&
                item._id !== station._id &&
                (!likedStation || item._id !== likedStation._id)
        )
        const isLikedStation = likedStation && likedStation._id === station._id
        const nextRecentlyPlayed = likedStation
            ? [likedStation, ...(isLikedStation ? [] : [station]), ...filtered].slice(0, 8)
            : [station, ...filtered].slice(0, 8)

        await userService.saveUser({ ...user, recentlyPlayed: nextRecentlyPlayed })

        const updatedUser = { ...loggedInUser, recentlyPlayed: nextRecentlyPlayed }

        store.dispatch({ type: SET_USER, user: updatedUser })
        userService.setLoggedinUser(updatedUser)

        return nextRecentlyPlayed
    } catch (error) {
        console.error('error in user actions; ', error)
        throw error
    }
}
