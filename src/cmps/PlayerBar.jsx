import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import ReactPlayer from 'react-player'

import { setCurrentSong, play, pause, playNext, playPrev, shuffle, repeat } from '../store/actions/player.actions.js'
import { selectStation } from '../store/actions/station.actions.js'
import { fetchStations } from '../store/actions/station.actions.js'
import { AddToStationsButton } from './AddToStationsButton.jsx'

import { VolumeIcon } from '../svgs/Icons.jsx'

const DEBUG_PLAYER = false
const UPDATE_INTERVAL = 500

const isValidNumber = (value) => typeof value === 'number' && Number.isFinite(value)

function getCurrentTime(player) {
    if (!player) return 0
    if (typeof player.currentTime === 'number') return player.currentTime
    return 0
}

function getDuration(player) {
    if (!player) return 0
    if (typeof player.duration === 'number') return player.duration
    return 0
}

function seekToSeconds(player, seconds) {
    if (!player || !isValidNumber(seconds)) return
    if (typeof player.currentTime === 'number') {
        player.currentTime = seconds
    }
}

export function PlayerBar() {
    const playerRef = useRef(null)
    const timeoutRef = useRef(null)
    const shuffleButtonRef = useRef()
    const repeatButtonRef = useRef()
    
    const { currentSong, isPlaying, queue, isShuffle, isRepeat } = useSelector((storeState) => storeState.playerModule)
    const { stations, selectedStationId } = useSelector((storeState) => storeState.stationModule)

    const [volume, setVolume] = useState(0.7)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [isSeeking, setIsSeeking] = useState(false)

    // Load a default song if none is selected
    useEffect(() => {
        if (currentSong) return
        console.log('stations: ', stations)
        if (!Array.isArray(stations) || !stations.length) return

        const stationWithSongs = stations.find(
            (station) => Array.isArray(station?.songs) && station.songs.length
        )
        const firstSong = stationWithSongs ? stationWithSongs.songs[0] : null

        console.log('firstSong: ', firstSong)

        if (!firstSong) return

        setCurrentSong(firstSong, {
            queue: stationWithSongs.songs,
            queueIndex: 0,
        })
    }, [currentSong, stations])

    useEffect(() => {
        setCurrentTime(0)
        const p = playerRef.current
        const detected = getDuration(p)
        if (isValidNumber(detected) && detected > 0) {
            setDuration(detected)
        } else if (currentSong && currentSong.duration) {
            const numeric = Number(currentSong.duration)
            setDuration(isValidNumber(numeric) ? numeric : 0)
        } else {
            setDuration(0)
        }
    }, [currentSong && currentSong._id])

    useEffect(() => {
        if (timeoutRef.current) {
            clearInterval(timeoutRef.current)
            timeoutRef.current = null
        }

        if (!isPlaying || isSeeking) return

        timeoutRef.current = setInterval(() => {
            const p = playerRef.current
            if (!p) return

            const t = getCurrentTime(p)
            if (isValidNumber(t)) setCurrentTime(t)

            const d = getDuration(p)
            if (isValidNumber(d)) setDuration(d)
        }, UPDATE_INTERVAL)

        return () => {
            if (timeoutRef.current) {
                clearInterval(timeoutRef.current)
                timeoutRef.current = null
            }
        }
    }, [isPlaying, isSeeking])

    const formatTime = (value) => {
        if (!isValidNumber(value) || value < 0) return '0:00'
        const minutes = Math.floor(value / 60)
        const seconds = Math.floor(value % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const handleTimeUpdate = () => {
        if (isSeeking) return
        const p = playerRef.current
        const t = getCurrentTime(p)
        if (isValidNumber(t)) setCurrentTime(t)
    }

    const handleDurationChange = (value) => {
        const d = Number(value)
        if (isValidNumber(d)) setDuration(d)
    }

    const handleSeekStart = () => setIsSeeking(true)

    const handleSeekChange = (value) => {
        const fraction = Number(value)
        if (!isValidNumber(fraction) || !duration) return
        setCurrentTime(fraction * duration)
    }

    const commitSeek = (value) => {
        const fraction = Number(value)
        const p = playerRef.current

        if (!isValidNumber(fraction) || !p || !duration) {
            setIsSeeking(false)
            return
        }

        const targetSeconds = fraction * duration
        seekToSeconds(p, targetSeconds)
        setCurrentTime(targetSeconds)
        setIsSeeking(false)
    }

    const handleVolumeChange = (event) => {
        const nextVolume = Number(event.target.value)
        if (!isValidNumber(nextVolume)) return
        setVolume(nextVolume)
    }

    const handleShuffleClick = () => {
        if (!isRepeat) shuffle(!isShuffle)
    }

    const handleRepeatClick = () => {
        repeat(!isRepeat)
    }

    const progressValue = duration ? Math.min(Math.max(currentTime / duration, 0), 1) : 0
    const queueLength = Array.isArray(queue) ? queue.length : 0
    const hasNextPrev = queueLength > 1

    const songTitle = (currentSong && currentSong.title) ? currentSong.title : 'song'
    const artistNames = (currentSong && currentSong.artists && Array.isArray(currentSong.artists))
        ? currentSong.artists.map((artist) => artist.name).join(', ')
        : 'Unknown artist'
    const songImg = (currentSong && currentSong.imgUrl) ? currentSong.imgUrl : undefined
    const songUrl =
        (currentSong && (currentSong.src || currentSong.url || (currentSong.ytbId ? `https://www.youtube.com/watch?v=${currentSong.ytbId}` : undefined))) ||
        'https://www.youtube.com/watch?v=if8dhRibiKM'


   
    return (
        <div className="player-bar">
            <ReactPlayer
                key={songUrl}
                ref={playerRef}
                className={DEBUG_PLAYER ? 'player-bar-debug-player' : 'player-bar-hidden-player'}
                src={songUrl}
                playing={isPlaying}
                volume={volume}
                controls={DEBUG_PLAYER}
                width={DEBUG_PLAYER ? 320 : 1}
                height={DEBUG_PLAYER ? 180 : 1}
                config={{ youtube: { playerVars: { controls: 1 } } }}

                onTimeUpdate={handleTimeUpdate}
                onDurationChange={handleDurationChange}

                onPlay={() => play()}
                onPause={() => pause()}
                onEnded={() => playNext()}
                onError={(error) => console.error('Player error:', error)}
            />

            <section className="player-bar-info-section">
                {songImg &&
                    <div className="player-bar-song-img-container">
                        <img src={songImg} alt="Current track cover" className="player-bar-song-img" /> 
                    </div>
                }
                <div className="player-bar-info-container">
                    <Link to={`/station/${''}`} className="player-bar-song-name">
                        {songTitle}
                    </Link>
                    <p>{artistNames}</p>
                </div>
                <AddToStationsButton className='player-bar-add-to-station' song={ currentSong }/>

            </section>

            <section className="player-bar-controls-section">
                <div className="player-bar-controls-buttons-container">
                    <button
                        ref={shuffleButtonRef}
                        className="player-bar-controls-icon player-bar-controls-shuffle white-on-hover"
                        type="button"
                        aria-label="Shuffle"
                        aria-pressed={!!isShuffle}
                        // data-active={!!isShuffle}
                        onClick={handleShuffleClick}
                    >
                        <svg role="img" viewBox="0 0 16 16">
                            <path
                                d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"
                                fill="currentColor"
                            />
                            <path
                                d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                    <button
                        className="player-bar-controls-prev white-on-hover"
                        onClick={() => playPrev()}
                        type="button"
                        aria-label="Previous song"
                        disabled={!hasNextPrev}
                    >
                        <svg role="img" viewBox="0 0 16 16">
                            <g transform="scale(-1,1) translate(-16,0)">
                                <path
                                    d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7Z"
                                    fill="currentColor"
                                />
                            </g>
                        </svg>
                    </button>
                    <button
                        className="player-bar-controls-play"
                        onClick={() => (isPlaying ? pause() : play())}
                        type="button"
                        aria-label={isPlaying ? 'Pause song' : 'Play song'}
                    >
                        <svg role="img" viewBox="0 0 16 16">
                            {isPlaying ? (
                                <path d="M3 2h3v12H3zm7 0h3v12h-3z"></path>
                            ) : (
                                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
                            )}
                        </svg>
                    </button>
                    <button
                        className="player-bar-controls-next white-on-hover"
                        onClick={() => playNext()}
                        type="button"
                        aria-label="Next song"
                        disabled={!hasNextPrev}
                    >
                        <svg role="img" viewBox="0 0 16 16">
                            <path
                                d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                    <button
                        ref={repeatButtonRef}
                        className="player-bar-controls-icon player-bar-controls-repeat white-on-hover"
                        type="button"
                        aria-label="Repeat"
                        aria-pressed={!!isRepeat}
                        onClick={handleRepeatClick}
                    >
                        <svg role="img" viewBox="0 0 16 16">
                            <path
                                d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </div>

                <div className="player-bar-controls-progress-container">
                    <span className="player-bar-controls-current-time">{formatTime(currentTime)}</span>
                    <input
                        className="player-bar-controls-progress"
                        type="range"
                        min="0"
                        max="1"
                        step="0.001"
                        value={progressValue}
                        onMouseDown={handleSeekStart}
                        onTouchStart={handleSeekStart}
                        onChange={(event) => handleSeekChange(event.target.value)}
                        onMouseUp={(event) => commitSeek(event.target.value)}
                        onTouchEnd={(event) => commitSeek(event.target.value)}
                        style={{ '--pct': `${progressValue * 100}%` }}
                    />
                    <span className="player-bar-controls-song-time">{formatTime(duration)}</span>
                </div>
            </section>

            <section className="player-bar-buttons-section">
                <div className="player-bar-volume">
                    <button
                        className="player-bar-mute-button white-on-hover"
                        onClick={() => setVolume((prev) => (prev ? -0.1 : 0.7))}
                    >
                        <VolumeIcon volume={volume}/>
                    </button>
                    <input
                        type="range"
                        min="-0.1"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        style={{ '--pct': `${((volume + 0.1) / 1.1) * 100}%` }}
                    />
                </div>
            </section>
        </div>
    )
}


