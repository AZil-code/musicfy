import { youtubeService } from '../../services/youtube.service.js'

export async function searchYoutube(searchStr) {
    try {
        const items = await youtubeService.searchSongs(searchStr)
        if (!Array.isArray(items)) return []
        return items
            .map((item) => youtubeService.formatSong(item))
            .filter(Boolean)
    } catch (error) {
        console.error('youtube actions -> cannot search songs! ', error)
        throw error
    }
}
