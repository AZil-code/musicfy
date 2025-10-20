import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STATION_KEY = 'stationDB'

const songsGroup1 = [
    { title: 'Never Gonna Give You Up', ytbId: 'dQw4w9WgXcQ', album: 'Single', genre: 'Pop', artists: ['Rick Astley'], imgUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg' },
    { title: 'GANGNAM STYLE', ytbId: '9bZkp7q19f0', album: 'PSY 6 (Six Rules), Part 1', genre: 'K-Pop', artists: ['PSY'], imgUrl: 'https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg' },
    { title: 'Despacito (ft. Daddy Yankee)', ytbId: 'kJQP7kiw5Fk', album: 'Vida', genre: 'Latin Pop', artists: ['Luis Fonsi', 'Daddy Yankee'], imgUrl: 'https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg' },
    { title: 'Shape of You', ytbId: 'JGwWNGJdvx8', album: '÷ (Divide)', genre: 'Pop', artists: ['Ed Sheeran'], imgUrl: 'https://img.youtube.com/vi/JGwWNGJdvx8/hqdefault.jpg' },
    { title: 'Perfect', ytbId: '2Vv-BfVoq4g', album: '÷ (Divide)', genre: 'Pop', artists: ['Ed Sheeran'], imgUrl: 'https://img.youtube.com/vi/2Vv-BfVoq4g/hqdefault.jpg' },
    { title: 'See You Again (ft. Charlie Puth)', ytbId: '3JZ_D3ELwOQ', album: 'Furious 7 OST', genre: 'Hip-Hop', artists: ['Wiz Khalifa', 'Charlie Puth'], imgUrl: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg' },
    { title: 'Blank Space', ytbId: 'e-ORhEE9VVg', album: '1989', genre: 'Pop', artists: ['Taylor Swift'], imgUrl: 'https://img.youtube.com/vi/e-ORhEE9VVg/hqdefault.jpg' },
    { title: 'Uptown Funk (ft. Bruno Mars)', ytbId: 'OPf0YbXqDm0', album: 'Uptown Special', genre: 'Funk Pop', artists: ['Mark Ronson', 'Bruno Mars'], imgUrl: 'https://img.youtube.com/vi/OPf0YbXqDm0/hqdefault.jpg' },
    { title: 'Roar', ytbId: 'CevxZvSJLk8', album: 'Prism', genre: 'Pop', artists: ['Katy Perry'], imgUrl: 'https://img.youtube.com/vi/CevxZvSJLk8/hqdefault.jpg' },
    { title: 'Hello', ytbId: 'YQHsXMglC9A', album: '25', genre: 'Soul Pop', artists: ['Adele'], imgUrl: 'https://img.youtube.com/vi/YQHsXMglC9A/hqdefault.jpg' },
]

const songsGroup2 = [
    { title: 'Counting Stars', ytbId: 'hT_nvWreIhg', album: 'Native', genre: 'Pop Rock', artists: ['OneRepublic'], imgUrl: 'https://img.youtube.com/vi/hT_nvWreIhg/hqdefault.jpg' },
    { title: 'Faded', ytbId: '60ItHLz5WEA', album: 'Different World', genre: 'Electronic', artists: ['Alan Walker'], imgUrl: 'https://img.youtube.com/vi/60ItHLz5WEA/hqdefault.jpg' },
    { title: 'Radioactive', ytbId: 'ktvTqknDobU', album: 'Night Visions', genre: 'Alternative', artists: ['Imagine Dragons'], imgUrl: 'https://img.youtube.com/vi/ktvTqknDobU/hqdefault.jpg' },
    { title: 'Bohemian Rhapsody', ytbId: 'fJ9rUzIMcZQ', album: 'A Night at the Opera', genre: 'Rock', artists: ['Queen'], imgUrl: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/hqdefault.jpg' },
    { title: 'Billie Jean', ytbId: 'sOnqjkJTMaA', album: 'Thriller', genre: 'Pop', artists: ['Michael Jackson'], imgUrl: 'https://img.youtube.com/vi/sOnqjkJTMaA/hqdefault.jpg' },
    { title: "Sweet Child O' Mine", ytbId: 'o1tj2zJ2Wvg', album: "Appetite for Destruction", genre: 'Rock', artists: ["Guns N' Roses"], imgUrl: 'https://img.youtube.com/vi/o1tj2zJ2Wvg/hqdefault.jpg' },
    { title: 'Numb', ytbId: 'kXYiU_JCYtU', album: 'Meteora', genre: 'Alternative Rock', artists: ['Linkin Park'], imgUrl: 'https://img.youtube.com/vi/kXYiU_JCYtU/hqdefault.jpg' },
    { title: 'Chandelier', ytbId: '2vjPBrBU-TM', album: '1000 Forms of Fear', genre: 'Pop', artists: ['Sia'], imgUrl: 'https://img.youtube.com/vi/2vjPBrBU-TM/hqdefault.jpg' },
    { title: 'Blinding Lights', ytbId: '4NRXx6U8ABQ', album: 'After Hours', genre: 'Synthwave Pop', artists: ['The Weeknd'], imgUrl: 'https://img.youtube.com/vi/4NRXx6U8ABQ/hqdefault.jpg' },
    { title: 'bad guy', ytbId: 'DyDfgMOUjCI', album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', genre: 'Pop', artists: ['Billie Eilish'], imgUrl: 'https://img.youtube.com/vi/DyDfgMOUjCI/hqdefault.jpg' },
]

const songsGroup3 = [
    { title: 'Viva La Vida', ytbId: 'dvgZkm1xWPE', album: 'Viva la Vida or Death and All His Friends', genre: 'Pop Rock', artists: ['Coldplay'], imgUrl: 'https://img.youtube.com/vi/dvgZkm1xWPE/hqdefault.jpg' },
    { title: 'Californication', ytbId: 'YlUKcNNmywk', album: 'Californication', genre: 'Alternative Rock', artists: ['Red Hot Chili Peppers'], imgUrl: 'https://img.youtube.com/vi/YlUKcNNmywk/hqdefault.jpg' },
    { title: 'Smells Like Teen Spirit', ytbId: 'hTWKbfoikeg', album: 'Nevermind', genre: 'Grunge', artists: ['Nirvana'], imgUrl: 'https://img.youtube.com/vi/hTWKbfoikeg/hqdefault.jpg' },
    { title: 'Wake Me Up', ytbId: 'IcrbM1l_BoI', album: 'True', genre: 'EDM', artists: ['Avicii', 'Aloe Blacc'], imgUrl: 'https://img.youtube.com/vi/IcrbM1l_BoI/hqdefault.jpg' },
    { title: 'Wonderwall', ytbId: 'bx1Bh8ZvH84', album: "(What's the Story) Morning Glory?", genre: 'Britpop', artists: ['Oasis'], imgUrl: 'https://img.youtube.com/vi/bx1Bh8ZvH84/hqdefault.jpg' },
    { title: 'Take On Me', ytbId: 'djV11Xbc914', album: 'Hunting High and Low', genre: 'Synthpop', artists: ['a-ha'], imgUrl: 'https://img.youtube.com/vi/djV11Xbc914/hqdefault.jpg' },
    { title: 'Get Lucky (ft. Pharrell Williams)', ytbId: '5NV6Rdv1a3I', album: 'Random Access Memories', genre: 'Disco/Funk', artists: ['Daft Punk', 'Pharrell Williams', 'Nile Rodgers'], imgUrl: 'https://img.youtube.com/vi/5NV6Rdv1a3I/hqdefault.jpg' },
    { title: 'Sugar', ytbId: '09R8_2nJtjg', album: 'V', genre: 'Pop', artists: ['Maroon 5'], imgUrl: 'https://img.youtube.com/vi/09R8_2nJtjg/hqdefault.jpg' },
    { title: 'Somebody That I Used To Know (ft. Kimbra)', ytbId: '8UVNT4wvIGY', album: 'Making Mirrors', genre: 'Indie Pop', artists: ['Gotye', 'Kimbra'], imgUrl: 'https://img.youtube.com/vi/8UVNT4wvIGY/hqdefault.jpg' },
    { title: 'Believer', ytbId: '7wtfhZwyrcc', album: 'Evolve', genre: 'Alternative', artists: ['Imagine Dragons'], imgUrl: 'https://img.youtube.com/vi/7wtfhZwyrcc/hqdefault.jpg' },
]

_createStations()

export const stationService = {
    query,
    get,
    remove,
    save,
    getDefaultStation,
    getDefaultFilter,
}

async function query(filterBy = {}) {
    try {
        let stations = await storageService.query(STATION_KEY)
        if (filterBy.name) {
            const regex = new RegExp(filterBy.name, 'i')
            stations = stations.filter((station) => regex.test(station.name))
        }
        if (filterBy.tags) stations.filter((station) => station.tags.some((tag) => filterBy.tags.includes(tag)))
        if (filterBy.createdBy) stations.filter((station) => station.createdBy._id === filterBy.createdBy)
        if (filterBy.userStations) stations.filter((station) => filterBy.userStations.includes(station._id))
        return stations
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function get(stationId) {
    return storageService.get(STATION_KEY, stationId)
}

async function remove(stationId) {
    return storageService.remove(STATION_KEY, stationId)
}

async function save(station) {
    return station._id
        ? storageService.put(STATION_KEY, station)
        : storageService.post(STATION_KEY, { ...station, createdAt: Date.now() })
}

function getDefaultFilter() {
    return {
        name: '',
        createdBy: '',
        tags: [],
        userStations: [],
    }
}

function getDefaultStation() {
    return {
        name: '',
        songs: [],
        tags: [],
        createdBy: {},
        likedByUsers: [],
        isLikedSongsPlaylist: false,
        isPrivate: false,
    }
}

function _createStations() {
    const existing = utilService.loadFromStorage(STATION_KEY, [])
    if (existing && existing.length) return

    const stations = [
        _buildStation('Global Pop Essentials', songsGroup1, ['pop', 'global']),
        _buildStation('Chart Toppers', songsGroup2, ['hits', 'trending']),
        _buildStation('Alt & Classics Mix', songsGroup3, ['alternative', 'classics']),
    ]

    utilService.saveToStorage(STATION_KEY, stations)
}

function _buildStation(name, songs, tags = []) {
    const stationId = utilService.makeId()
    return {
        _id: stationId,
        name,
        description: `${name} playlist`,
        tags,
        createdBy: {
            _id: 'spotify',
            username: 'Spotify',
            imgUrl: 'https://misc.scdn.co/liked-songs/playlist-announcement-image.jpg',
        },
        likedByUsers: [],
        isLikedSongsPlaylist: false,
        isPrivate: false,
        createdAt: Date.now(),
        songs: songs.map((song, idx) => _buildStationSong(song, idx)),
    }
}

function _buildStationSong(song, index) {
    const songId = utilService.makeId()
    const duration = utilService.getRandomIntInclusive(150, 320)
    return {
        _id: songId,
        title: song.title,
        ytbId: song.ytbId,
        url: `https://www.youtube.com/watch?v=${song.ytbId}`,
        imgUrl: song.imgUrl,
        album: song.album,
        genre: song.genre,
        artists: song.artists.map((name) => ({ name, _id: utilService.makeId() })),
        duration,
        length: duration,
        monthlyListens: utilService.getRandomIntInclusive(5000, 450000),
        dateAdded: Date.now() - index * 1000 * 60,
    }
}
