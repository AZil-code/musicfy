import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import ReactPlayer from 'react-player'

import { songService } from '../services/song.service.js'
import { setCurrentSong as setCurrentSongAction, play, pause } from '../store/actions/player.actions.js'

const DEBUG_PLAYER = false
const UPDATE_INTERVAL = 500

const isNumeric = (value) => typeof value === 'number' && !isNaN(value)

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
    if (!player || !isNumeric(seconds)) return
    if (typeof player.currentTime === 'number') {
        player.currentTime = seconds
    }
}

export function PlayerBar() {
    const playerRef = useRef(null)
    const timeoutRef = useRef(null)

    const { currentSong, isPlaying } = useSelector((storeState) => storeState.playerModule)

    const [volume, setVolume] = useState(0.7)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [isSeeking, setIsSeeking] = useState(false)

    // Load a default song if none is selected
    useEffect(() => {
        let isCancelled = false

        if (!currentSong) {
            songService
                .query()
                .then((songs) => {
                    if (!isCancelled && songs && songs.length) {
                        setCurrentSongAction(songs[0])
                    }
                })
                .catch((error) => console.error('PlayerBar -> failed to load default song', error))
        }

        return () => {
            isCancelled = true
        }
    }, [currentSong])

    useEffect(() => {
        setCurrentTime(0)
        const p = playerRef.current
        const detected = getDuration(p)
        if (isNumeric(detected) && detected > 0) {
            setDuration(detected)
        } else if (currentSong && currentSong.duration) {
            const numeric = Number(currentSong.duration)
            setDuration(isNumeric(numeric) ? numeric : 0)
        } else {
            setDuration(0)
        }
    }, [currentSong && currentSong._id])

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }

        if (!isPlaying || isSeeking) return

        const tick = () => {
            const p = playerRef.current
            if (p) {
                const t = getCurrentTime(p)
                if (isNumeric(t)) setCurrentTime(t)
                const d = getDuration(p)
                if (isNumeric(d)) setDuration(d)
            }
            timeoutRef.current = setTimeout(tick, UPDATE_INTERVAL)
        }

        tick()

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }
        }
    }, [isPlaying, isSeeking])

    const formatTime = (value) => {
        if (!isNumeric(value) || value < 0) return '0:00'
        const minutes = Math.floor(value / 60)
        const seconds = Math.floor(value % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const handleTimeUpdate = () => {
        if (isSeeking) return
        const p = playerRef.current
        const t = getCurrentTime(p)
        if (isNumeric(t)) setCurrentTime(t)
    }

    const handleDurationChange = (value) => {
        const d = Number(value)
        if (isNumeric(d)) setDuration(d)
    }

    const handleSeekStart = () => setIsSeeking(true)

    const handleSeekChange = (value) => {
        const fraction = Number(value)
        if (!isNumeric(fraction) || !duration) return
        setCurrentTime(fraction * duration)
    }

    const commitSeek = (value) => {
        const fraction = Number(value)
        const p = playerRef.current

        if (!isNumeric(fraction) || !p || !duration) {
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
        if (!isNumeric(nextVolume)) return
        setVolume(nextVolume)
    }

    const progressValue = duration ? Math.min(Math.max(currentTime / duration, 0), 1) : 0

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
                onEnded={() => pause()}
                onError={(error) => console.error('Player error:', error)}
            />

            <section className="player-bar-info-section">
                {songImg ? <img src={songImg} alt="Current track cover" className="player-bar-song-img" /> : null}
                <div className="player-bar-info-container">
                    <Link to={`/station/${''}`} className="player-bar-song-name">
                        {songTitle}
                    </Link>
                    <p>{artistNames}</p>
                </div>
            </section>

            <section className="player-bar-controls-section">
                <div className="player-bar-controls-buttons-container">
                    <button className="player-bar-controls-play" onClick={() => (isPlaying ? pause() : play())}>
                        <svg role="img" viewBox="0 0 16 16">
                            {isPlaying ? (
                                <path d="M3 2h3v12H3zm7 0h3v12h-3z"></path>
                            ) : (
                                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
                            )}
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
                    />
                    <span className="player-bar-controls-song-time">{formatTime(duration)}</span>
                </div>
            </section>

            <section className="player-bar-buttons-section">
                <div className="player-bar-volume">
                    <button
                        className="player-bar-mute-button"
                        onClick={() => setVolume((prev) => (prev ? -0.1 : 0.7))}
                    >
                        <svg role="img" viewBox="0 0 16 16">
                            <path d="M3.5 6H1v4h2.5L7 12V4zm7.5 2a2.5 2.5 0 0 0-2-2.45v4.9a2.5 2.5 0 0 0 2-2.45z"></path>
                        </svg>
                    </button>
                    <input
                        type="range"
                        min="-0.1"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </div>
            </section>
        </div>
    )
}
