import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import ReactPlayer from 'react-player'

import { songService } from '../services/song.service.js'
import { setCurrentSong as setCurrentSongAction, play, pause } from '../store/actions/player.actions.js'

const DEBUG_PLAYER = false

export function PlayerBar() {
    const playerRef = useRef(null)
    const timerRef = useRef(null)

    const { currentSong, isPlaying } = useSelector((storeState) => storeState.playerModule)
    const [volume, setVolume] = useState(0.7)
    const [duration, setDuration] = useState(0)
    const [playedSeconds, setPlayedSeconds] = useState(0)
    const [isSeeking, setIsSeeking] = useState(false)

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
        setPlayedSeconds(0)
        if (currentSong?.duration) {
            setDuration(Number(currentSong.duration))
        } else {
            setDuration(0)
        }
    }, [currentSong])

    useEffect(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
        if (isPlaying) {
            timerRef.current = setInterval(() => {
                setPlayedSeconds((prev) => {
                    const next = prev + 1
                    if (duration && next > duration) return duration
                    return next
                })
            }, 1000)
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        }
    }, [isPlaying, duration])

    const formatTime = (value) => {
        if (!Number.isFinite(value)) return '0:00'
        const minutes = Math.floor(value / 60)
        const seconds = Math.floor(value % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const handlePlayPause = () => {
        if (isPlaying) pause()
        else play()
    }

    const handleProgress = ({ playedSeconds: newSeconds }) => {
        if (isSeeking) return
        setPlayedSeconds(newSeconds)
    }

    const handleSeekStart = () => {
        setIsSeeking(true)
    }

    const handleSeek = (value) => {
        const fraction = Number(value)
        if (!Number.isFinite(fraction) || !playerRef.current) return
        playerRef.current.seekTo(fraction, 'fraction')
        setPlayedSeconds(fraction * duration)
    }

    const handleSeekEnd = (event) => {
        handleSeek(event.target.value)
        setIsSeeking(false)
    }

    const handleVolumeChange = (event) => {
        const nextVolume = Number(event.target.value)
        if (!Number.isFinite(nextVolume)) return
        setVolume(nextVolume)
    }

    const progressValue = duration ? playedSeconds / duration : 0

    const songTitle = currentSong?.title || 'song'
    const artistNames = currentSong?.artists
        ? currentSong.artists.map((artist) => artist.name).join(', ')
        : 'Unknown artist'
    const songImg = currentSong?.imgUrl
    const songUrl =
        currentSong?.src ||
        currentSong?.url ||
        (currentSong?.ytbId ? `https://www.youtube.com/watch?v=${currentSong.ytbId}` : undefined) ||
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
                onDuration={setDuration}
                onProgress={handleProgress}
                onPlay={() => play()}
                onPause={() => pause()}
                onError={(error) => console.error('Player error:', error)}
            />

            <section className="player-bar-info-section">
                <img src={songImg} alt="Current track cover" className="player-bar-song-img" />
                <div className="player-bar-info-container">
                    <Link to={`/station/${''}`} className="player-bar-song-name">
                        {songTitle}
                    </Link>
                    <p>{artistNames}</p>
                </div>
            </section>

            <section className="player-bar-controls-section">
                <div className="player-bar-controls-buttons-container">
                    <button className="player-bar-controls-play" onClick={handlePlayPause}>
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
                    <span className="player-bar-controls-current-time">{formatTime(playedSeconds)}</span>
                    <input
                        className="player-bar-controls-progress"
                        type="range"
                        min="0"
                        max="1"
                        step="0.001"
                        value={progressValue}
                        onMouseDown={handleSeekStart}
                        onTouchStart={handleSeekStart}
                        onChange={(event) => handleSeek(event.target.value)}
                        onMouseUp={handleSeekEnd}
                        onTouchEnd={handleSeekEnd}
                    />
                    <span className="player-bar-controls-song-time">{formatTime(duration)}</span>
                </div>
            </section>

            <section className="player-bar-buttons-section">
                <div className="player-bar-volume">
                    <button
                        className="player-bar-mute-button"
                        onClick={() => setVolume((prev) => (prev ? 0 : 0.7))}
                    >
                        <svg role="img" viewBox="0 0 16 16">
                            <path d="M3.5 6H1v4h2.5L7 12V4zm7.5 2a2.5 2.5 0 0 0-2-2.45v4.9a2.5 2.5 0 0 0 2-2.45z"></path>
                        </svg>
                    </button>
                    <input
                        type="range"
                        min="0"
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
