import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const SONG_KEY = 'songDB'
_createSongs()

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
    return storageService.query(SONG_KEY).then((songs) => {
        if (!Array.isArray(songs) || !songs.length) {
            _createSongs()
            return storageService.query(SONG_KEY).then((freshSongs) => _applyFilters(freshSongs, filterBy))
        }
        return _applyFilters(songs, filterBy)
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

function _createSongs() {
    console.log('creating songs')
    let songs = utilService.loadFromStorage(SONG_KEY, [])
    if (Array.isArray(songs) && songs.length) return

    const templates = [
        {
            title: 'Midnight City',
            ytbId: 'if8dhRibiKM',
            album: 'Hurry Up, We\'re Dreaming',
            genre: 'Synthwave',
            artists: ['M83'],
            imgUrl: 'https://img.youtube.com/vi/dX3k_QDnzHE/hqdefault.jpg',
        },
        {
            title: 'Golden Dusk',
            ytbId: '8iGWgBWoSqM',
            album: 'Sea of Dreams',
            genre: 'Chillwave',
            artists: ['Neon Coast'],
            imgUrl: 'https://img.youtube.com/vi/zA4PiSpmfic/hqdefault.jpg',
        },
        {
            title: 'Electric Bloom',
            ytbId: 'jhWMpddN-VQ',
            album: 'Night Drive',
            genre: 'Indie',
            artists: ['Luna & The Lights'],
            imgUrl: 'https://img.youtube.com/vi/W4w8kWJkU2A/hqdefault.jpg',
        },
        {
            title: 'Starlit',
            ytbId: 'EsXlriuUzR8',
            album: 'Starbound',
            genre: 'Pop',
            artists: ['Nova Rivers'],
            imgUrl: 'https://img.youtube.com/vi/7gphiFVVtUI/hqdefault.jpg',
        },
        {
            title: 'Echoes',
            ytbId: 'KA1mEPQf10c',
            album: 'Reflections',
            genre: 'Alternative',
            artists: ['Atlas Grey'],
            imgUrl: 'https://img.youtube.com/vi/fGqdIPer-ms/hqdefault.jpg',
        },
        {
            title: 'Sunset Drive',
            ytbId: 'if8dhRibiKM',
            album: 'Wide Horizons',
            genre: 'Lo-fi',
            artists: ['Soft Focus'],
            imgUrl: 'https://img.youtube.com/vi/tQ0yjYUFKAE/hqdefault.jpg',
        },
        {
            title: 'Velvet Skies',
            ytbId: 'if8dhRibiKM',
            album: 'Skyline',
            genre: 'R&B',
            artists: ['Azure'],
            imgUrl: 'https://img.youtube.com/vi/0QZc8cEKMns/hqdefault.jpg',
        },
        {
            title: 'Neon Rain',
            ytbId: 'if8dhRibiKM',
            album: 'City Lights',
            genre: 'Electronic',
            artists: ['Pulse District'],
            imgUrl: 'https://img.youtube.com/vi/zzwRbKI2pn4/hqdefault.jpg',
        },
        {
            title: 'Gravity',
            ytbId: 'if8dhRibiKM',
            album: 'Aerial',
            genre: 'Rock',
            artists: ['Echo Static'],
            imgUrl: 'https://img.youtube.com/vi/1w7OgIMMRc4/hqdefault.jpg',
        },
        {
            title: 'Daybreak',
            ytbId: 'if8dhRibiKM',
            album: 'First Light',
            genre: 'Acoustic',
            artists: ['River Lane'],
            imgUrl: 'https://img.youtube.com/vi/3JZ4pnNtyxQ/hqdefault.jpg',
        },
    ]

    songs = Array.from({ length: 20 }, (_val, idx) => {
        const template = templates[idx % templates.length]
        return _createSong(template, idx)
    })

    utilService.saveToStorage(SONG_KEY, songs)
}

function _createSong(template, idx) {
    const id = utilService.makeId()
    const createdAt = Date.now() - _getRandomIntInclusive(0, 1000 * 60 * 60 * 24 * 180)
    const artists = (template.artists || []).map((name) => ({ name }))

    return {
        _id: id,
        id,
        title: template.title,
        ytbId: template.ytbId,
        url: `https://www.youtube.com/watch?v=${template.ytbId}`,
        imgUrl: template.imgUrl,
        artists,
        album: template.album,
        genre: template.genre,
        type: 'song',
        duration: _getRandomIntInclusive(150, 320),
        monthlyListens: _getRandomIntInclusive(5_000, 450_000),
        label: 'Independent',
        createdAt,
        updatedAt: createdAt,
        order: idx,
    }
}

function _getRandomIntInclusive(min, max) {
    const ceil = Math.ceil(min)
    const floor = Math.floor(max)
    return Math.floor(Math.random() * (floor - ceil + 1)) + ceil
}

function _applyFilters(songs, filterBy = {}) {
    let filtered = [...songs]

    if (filterBy.title) {
        const regExp = new RegExp(filterBy.title, 'i')
        filtered = filtered.filter((song) => regExp.test(song.title))
    }

    if (filterBy.artist) {
        const regExp = new RegExp(filterBy.artist, 'i')
        filtered = filtered.filter((song) =>
            Array.isArray(song.artists) && song.artists.some((artist) => regExp.test(artist.name))
        )
    }

    if (filterBy.album) {
        const regExp = new RegExp(filterBy.album, 'i')
        filtered = filtered.filter((song) => regExp.test(song.album || ''))
    }

    if (filterBy.genre) {
        const regExp = new RegExp(filterBy.genre, 'i')
        filtered = filtered.filter((song) => regExp.test(song.genre || ''))
    }

    if (filterBy.maxDuration) {
        const max = Number(filterBy.maxDuration)
        if (!Number.isNaN(max)) {
            filtered = filtered.filter((song) => Number(song.duration) <= max)
        }
    }

    return filtered
}
