import { storageService } from "./async-storage.service.js"


export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getEmptyCredentials,
    setRecentlyPlayed,
    getRecentlyPlayed,
    setLoggedinUser,
    saveUser,
}
const STORAGE_KEY_LOGGEDIN = 'user'
const STORAGE_KEY = 'userDB'

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

async function getRecentlyPlayed(userId) {
    const id = userId || (getLoggedinUser() && getLoggedinUser()._id)
    if (!id) return []
    try {
        const user = await getById(id)
        return Array.isArray(user.recentlyPlayed) ? user.recentlyPlayed : []
    } catch (error) {
        console.log('Error in user service (getRecentlyPlayed): ', error)
        throw error
    }
}

async function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

async function setRecentlyPlayed(stationToAdd) {

    try{
        const loggedInUser = getLoggedinUser()
        if (!loggedInUser) throw new Error('No logged in User')
        const user = await getById(loggedInUser._id)
        if (user.recentlyPlayed) {
            user.recentlyPlayed = user.recentlyPlayed.filter( (station) => station._id !== stationToAdd._id)
            user.recentlyPlayed.unshift(stationToAdd)
            user.recentlyPlayed = user.recentlyPlayed.slice(0, 8)
            _setLoggedinUser({ ...user, recentlyPlayed: user.recentlyPlayed})
        } else {
            user.recentlyPlayed = [stationToAdd]
        }
        return storageService.put(STORAGE_KEY, user)

    } catch(e){
        console.log('Error in user service: ', e)
        throw e
    }
}

function saveUser(user) {
    return storageService.put(STORAGE_KEY, user)
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname }
    user.createdAt = user.updatedAt = Date.now()

    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, recentlyPlayed: user?.recentlyPlayed }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function setLoggedinUser(user) {
    return _setLoggedinUser(user)
}

function getEmptyCredentials() {
    return {
        fullName: '',
        userName: '',
        password: '',        
    }
}
