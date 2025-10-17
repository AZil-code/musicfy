import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import ReactPlayer from 'react-player'

import { playPause } from '../store/actions/player.actions.js'
import { AddToStationsButton } from './AddToStationsButton.jsx'

export function PlayerBar() {
  const [volume, setVolume] = useState(1)
  const [progress, setProgress] = useState(0)
  const [playerLoading, setPlayerLoading] = useState(false)
  const currentUrl = 'if8dhRibiKM'

  const playerRef = useRef(null)
  const isPlaying = useSelector((state) => state.playerModule.isPlaying)
// const [isPlaying,setIsPlaying] = useState(false)

  const handlePlayPause = async () => {
    if (!currentUrl) return
    playPause(isPlaying)
    // if (isPlaying) playerRef.current.getInternalPlayer('player').PauseVideo
    // else playerRef.current.pause()
    try {
        if (isPlaying) playerRef.current.play().then(sw => console.log('sw: ', sw))
        
        else playerRef.current.pause()

    }
    catch(e) {
        console.log('error in play: ', e)
    }
  }

  const handleSeek = (value) => {
    setProgress(value)
    if (playerRef.current) {
      playerRef.current.seekTo(value, 'fraction')
    }
  }

//   const syncPlayback = () => {
//     console.log('syncPlayback invoked, target playing state:', isPlaying)
//     const internalPlayer = playerRef.current?.getInternalPlayer?.('player')
//     if (!internalPlayer) return

//     if (isPlaying) {
//       const playPromise = internalPlayer.play?.() ?? internalPlayer.playVideo?.()
//       if (playPromise?.catch) {
//         playPromise.catch((err) => {
//           console.error('Playback rejected:', err)
//         })
//       }
//     } else {
//       internalPlayer.pause?.()
//       internalPlayer.pauseVideo?.()
//     }
//   }

//   useEffect(() => {
//     handlePlayPause()
//   }, [isPlaying])

  return (
    <div className="player-bar">
      <ReactPlayer
        ref={playerRef}
        className="player-bar-hidden-player"
        url={'https://www.youtube.com/watch?v=if8dhRibiKM'}
        playing={isPlaying}
        volume={volume}
        controls={false}
        width={1}
        height={1}
        style={{ position: 'absolute', top: 0, left: 0, opacity: 0, pointerEvents: 'none' }}
        config={{ youtube: { playerVars: { controls: 0 } } }}
      />

      <section className="player-bar-info-section">
        <img src={undefined} alt="Current track cover" className="player-bar-song-img" />
        <div className="player-bar-info-container">
          <Link to={`/station/${''}`} className="player-bar-song-name">
            {'song'}
          </Link>
          <p>{'artistNames'}</p>
        </div>
        <AddToStationsButton className="player-bar-add-to-stations" />
      </section>

      <section className="player-bar-controls-section">
        <div className="player-bar-controls-buttons-container">
          <button className="player-bar-controls-shuffle" />
          <button className="player-bar-controls-prev" />
          <button className="player-bar-controls-play play-button" onClick={handlePlayPause} />
          <button className="player-bar-controls-next" />
          <button className="player-bar-controls-repeat" />
        </div>

        <div className="player-bar-controls-progress-container">
          <span className="player-bar-controls-current-time">{'0:00'}</span>
          <input
            className="player-bar-controls-progress"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={progress}
            onChange={(event) => handleSeek(parseFloat(event.target.value))}
          />
          <span className="player-bar-controls-song-time">{'4:05'}</span>
        </div>
      </section>

      <section className="player-bar-buttons-section">
        <button className="player-bar-mute-button" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => setVolume(parseFloat(event.target.value))}
        />
      </section>
    </div>
  )
}
