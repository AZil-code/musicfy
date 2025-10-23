import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { SongList } from '../cmps/SongList.jsx'
import { setCurrentSong, play, pause } from '../store/actions/player.actions.js'
import { fetchStations, removeSong, updateStationArtwork } from '../store/actions/station.actions.js'

export function StationDetails({ stationId }) {
    const params = useParams()
    const selectedStationId = useSelector((storeState) => storeState.stationModule.selectedStationId)
    const stations = useSelector((storeState) => storeState.stationModule.stations)
    const { currentSong, isPlaying } = useSelector((storeState) => storeState.playerModule)
    // const [headerGradient, setHeaderGradient] = useState(null)

    const containerRef = useRef()

    const activeStationId = selectedStationId || stationId || params.stationID

    useEffect(() => {
        if (!stations.length) fetchStations()
    }, [stations.length])

    const station =
        activeStationId && Array.isArray(stations)
            ? stations.find((currStation) => currStation && currStation._id === activeStationId) || null
            : null

    const songs = station && Array.isArray(station.songs) ? station.songs : []
    const firstSong = songs.length ? songs[0] : null
    const coverFromStation =
        station && typeof station.coverImage === 'string'
            ? station.coverImage.trim()
            : ''
    const coverImage =
        coverFromStation ||
        (firstSong && firstSong.imgUrl) ||
        'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=600&q=60'

    useEffect(() => {
        // if (!coverImage) {
        //     setHeaderGradient(null)
        //     return
        // }

        let isCancelled = false

        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = coverImage
        img.onload = () => {
            if (isCancelled) return
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d', { willReadFrequently: true })
            // if (!ctx) {
            //     setHeaderGradient(null)
            //     return
            // }
            const width = (canvas.width = img.naturalWidth || img.width || 0)
            const height = (canvas.height = img.naturalHeight || img.height || 0)

            // if (!width || !height) {
            //     setHeaderGradient(null)
            //     return
            // }

            ctx.drawImage(img, 0, 0, width, height)

            let imageData
            try {
                imageData = ctx.getImageData(0, 0, width, height).data
            } catch (error) {
                console.log('Error in color gradient', error)
                return
            }

            let r = 0
            let g = 0
            let b = 0
            let count = 0

            const totalPixels = imageData.length / 4
            const sampleFactor = Math.max(1, Math.floor(totalPixels / 5000))

            for (let i = 0; i < imageData.length; i += 4 * sampleFactor) {
                const alpha = imageData[i + 3]
                if (alpha < 64) continue
                r += imageData[i]
                g += imageData[i + 1]
                b += imageData[i + 2]
                count++
            }

            // if (!count) {
            //     setHeaderGradient(null)
            //     return
            // }

            r = Math.round(r / count)
            g = Math.round(g / count)
            b = Math.round(b / count)

            const gradient = `linear-gradient(180deg, rgba(${r}, ${g}, ${b}, 0.85) 20%, rgba(${r}, ${g}, ${b}, 0.18) 35%, rgba(18, 18, 18, 1) 100%)`
            containerRef.current.style.background = gradient
            // setHeaderGradient(gradient)
        }

        img.onerror = () => {
            if (!isCancelled) setHeaderGradient(null)
        }

        return () => {
            isCancelled = true
        }
    }, [coverImage])

    useEffect(() => {
        if (!station || !Array.isArray(station.songs) || !station.songs.length) return
        const leadSong = station.songs[0]
        const firstSongImg = leadSong && leadSong.imgUrl
        if (!firstSongImg) return
        updateStationArtwork(station._id, firstSongImg)
    }, [
        station && station._id,
        firstSong && firstSong.imgUrl,
    ])

    const handleSelectSong = (song) => {
        console.log('song', song)
        if (!song) return
        const selectedId = song._id
        const currentId = currentSong ? currentSong._id : null

        console.log('test')

        if (selectedId && currentId && String(selectedId) === String(currentId)) {
            if (isPlaying) pause()
            else play()
        } else {
            const queue = songs
            const queueIndex = queue.findIndex(
                (currSong) => currSong && String(currSong._id) === String(selectedId)
            )
            const queueId = station ? station._id || '' : ''

            setCurrentSong(song, {
                queue,
                queueId,
                queueIndex: queueIndex >= 0 ? queueIndex : 0,
            })
            play()
        }
    }

    const handleRemoveSong = async (song) => {
        if (!station || !song) return
        try {
            await removeSong(
                {
                    ...station,
                    songs: [...(station.songs || [])],
                },
                song
            )
        } catch (error) {
            console.error('StationDetails -> failed to remove song', error)
        }
    }

    if (!station) {
        return (
            <div className="page-station-details">
                <p>{stations.length ? 'Station not found.' : 'Loading station…'}</p>
            </div>
        )
    }

    return (
        <div className="page-station-details">
            <div
                ref={containerRef}
                className="station-details-content"
                // style={headerGradient ? { background: headerGradient } : undefined}
            >
                <header className="station-details-header">
                    <div className="station-details-cover">
                        <img src={coverImage} alt={`${station.name || 'Station'} cover` } />
                    </div>
                    <div className='station-details-info-container'>
                        <p className='station-details-station-type'>Playlist</p>
                        <h1 className="station-details-title">{station.name || 'Untitled station'}</h1>
                        <p className='station-details-user-info-container'>
                            <span className='station-detials-user text-span-center text-white'>Vadim</span>
                            <span>•</span>
                            <span className='station-detials-song-length text-span-center text-gray'>{songs.length + ' songs'}</span>
                        </p>
                    </div>
                </header>

                <SongList
                    songs={songs}
                    onSelectSong={handleSelectSong}
                    onRemoveSong={handleRemoveSong}
                    currentSongId={(currentSong && currentSong._id) || ''}
                    isPlaying={isPlaying}
                />
            </div>
        </div>
    )
}
