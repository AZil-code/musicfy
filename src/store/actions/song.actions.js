import { songService } from '../../services/song.service.js'
import { SET_ISLOADING, SET_SONGS } from '../reducers/song.reducer.js'
import { store } from '../store.js'

export async function loadSongsByIds(songIds = []) {
    const ids = songIds.filter(Boolean).map(String)
    const { dispatch } = store

    if (!ids.length) {
        dispatch({ type: SET_SONGS, songs: [] })
        return
    }

    dispatch({ type: SET_ISLOADING, isLoading: true })
    try {
        const allSongs = await songService.query()
        const orderMap = new Map(ids.map((id, idx) => [id, idx]))
        const filtered = allSongs
            .filter((song) => orderMap.has(String(song._id || song.id)))
            .sort((a, b) => orderMap.get(String(a._id || a.id)) - orderMap.get(String(b._id || b.id)))

        dispatch({ type: SET_SONGS, songs: filtered })
    } catch (error) {
        console.error('song actions -> cannot load songs by ids!', error)
        dispatch({ type: SET_SONGS, songs: [] })
        throw error
    } finally {
        dispatch({ type: SET_ISLOADING, isLoading: false })
    }
}

export async function loadSongs(filterBy = {}) {
    const { dispatch } = store
    dispatch({ type: SET_ISLOADING, isLoading: true })
    try {
        const songs = await songService.query(filterBy)
        console.log('songs: ', songs)
        dispatch({ type: SET_SONGS, songs })
    } catch (error) {
        console.error('song actions -> cannot load songs!', error)
        dispatch({ type: SET_SONGS, songs: [] })
        throw error
    } finally {
        dispatch({ type: SET_ISLOADING, isLoading: false })
    }
}

export function setSongs(songs = []) {
    store.dispatch({ type: SET_SONGS, songs })
}
