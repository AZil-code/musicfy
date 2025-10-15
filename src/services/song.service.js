import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const SONG_KEY = 'songDB'

export const songService = {
    query,
    get,
    remove,
    save,
    getEmptySong,
    getDefaultFilter,
}

window.songService = songService

function query(filterBy = {}) {
    return storageService.query(SONG_KEY)
        .then(songs => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                songs = songs.filter(song => regExp.test(song.title))
            }

            // if (filterBy.artist) {
            //     const regExp = new RegExp(filterBy.title, 'i')
            //     songs = songs.filter(song => regExp.test(song.artist))
            // }
            // if (filterBy.album) {
            //     const regExp = new RegExp(filterBy.album, 'i')
            //     songs = songs.filter(song => regExp.test(song.album))
            // }
            // if (filterBy.artist) {
            //     const regExp = new RegExp(filterBy.artist, 'i')
            //     songs = songs.filter(song => song.artists.some(artist => regExp.test(artist.name)))
            // }
            // if (filterBy.duration) {
            //     songs = songs.filter(song => song.duration)
            // }

            return songs
        })
}

function get(songId) {
    return storageService.get(SONG_KEY, songId)
        .then(song => {
            return song
        })
}

function remove(songId) {
    return storageService.remove(SONG_KEY, songId)
}

function save(song) {
    if (song._id) {
        return storageService.put(SONG_KEY, song)
    } else {
        return storageService.post(SONG_KEY, song)
    }
}

function getEmptySong(title = '', ytbId = '', imgUrl = '', artists = [], type = 'song', duration = 0) {
    return { title, ytbId, imgUrl, artists, type, duration }
}

function getDefaultFilter() {
    return { title: '' }
}
