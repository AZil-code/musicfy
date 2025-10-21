import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { SongList } from '../cmps/SongList'
import { searchYoutube } from '../store/actions/search.actions.js'
import { setCurrentSong, play, pause } from '../store/actions/player.actions.js'

export function SearchResults() {
    const [searchResults, setSearchResults] = useState([])
    const { searchStr } = useParams()
    const { currentSong, isPlaying } = useSelector((state) => state.playerModule)

    useEffect(() => {
        loadSearchResults()
    }, [searchStr])

    async function loadSearchResults() {
        const results = await searchYoutube(searchStr)
        setSearchResults(results)
    }

    const handleSelectSong = (song) => {
        if (!song) return
        const selectedId = song._id
        const currentId = currentSong ? currentSong._id : null

        if (selectedId && currentId && String(selectedId) === String(currentId)) {
            if (isPlaying) pause()
            else play()
        } else {
            setCurrentSong(song)
            play()
        }
    }

    return (
        <div className="page-station-details search-results-page">
            <SongList
                songs={searchResults}
                onSelectSong={handleSelectSong}
                currentSongId={(currentSong && currentSong._id) || ''}
                isPlaying={isPlaying}
            />
        </div>
    )
}
