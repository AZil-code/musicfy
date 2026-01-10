import { useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { SongSuggestion } from '../cmps/SongSuggestion'
import { PlayButton } from '../cmps/PlayButton.jsx'
import { pause, play, setCurrentSong, setCurrentStation } from '../store/actions/player.actions'
import { getUserStations } from '../store/actions/user.actions.js'
import { fetchStations } from '../store/actions/station.actions.js'
import { selectStation } from '../store/actions/station.actions.js'
import { store } from '../store/store.js';
import { getAverageColorFromImage } from '../services/util.service.js'

const categories = ['Classic Rock', 'Hip Hop', '90s'];

export function StationIndex() {
   const { currentStation, isPlaying } = useSelector((store) => store.playerModule);
   const { user } = useSelector( (store) => store.userModule)
   const [recentlyPlayed, setRecentlyPlayed] = useState([])
   const [isRecentLoading, setIsRecentLoading] = useState(true)
   const [homeAccentRgb, setHomeAccentRgb] = useState('47, 38, 90')
   const hoverRequestRef = useRef(0)
   const lastHoverSrcRef = useRef(null)
   const navigate = useNavigate()

   useEffect( () => {
      if (!user) return
      if (user.savedStations){
         setIsRecentLoading(true)
         loadUserStations()
         fetchStations()
         // selectStation(null)
      } else {
         setIsRecentLoading(false)
      }
   }, [user])

   console.log('currentStation: ',currentStation, 'isPlaying: ', isPlaying)

   async function loadUserStations(){
      try {
         const stations = await getUserStations()
         setRecentlyPlayed(stations.splice(0, 8))
      } finally {
         setIsRecentLoading(false)
      }
   } 

   function getStationCover(station) {
      const hasCover = station && typeof station.coverImage === 'string' && station.coverImage.trim().length
      const firstSong = station && Array.isArray(station.songs) ? station.songs[0] : null
      return station?.name === 'Liked Songs'
         ? 'https://misc.scdn.co/liked-songs/liked-songs-300.jpg'
         : (hasCover && station.coverImage) || (firstSong && firstSong.imgUrl) ||
           'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=200&q=60'
   }

   async function handleStationHover(coverImage) {
      if (!coverImage || coverImage === lastHoverSrcRef.current) return
      lastHoverSrcRef.current = coverImage
      const requestId = ++hoverRequestRef.current
      const avg = await getAverageColorFromImage(coverImage)
      if (!avg || requestId !== hoverRequestRef.current) return
      setHomeAccentRgb(`${avg.r}, ${avg.g}, ${avg.b}`)
   }
   

   function onPlay(station, ev = {}) {
      if (!currentStation || station._id !== currentStation._id) {
         setCurrentSong(station.songs[0], {
               queue: station.songs,
               queueIndex: 0,
         })
         setCurrentStation(station);
         
         play();
      } else if (isPlaying) pause();
      else play();
      ev.stopPropagation();
   }

   function onSelectStation(station){
      
      selectStation(station._id)
      navigate(`/station/${station._id}`)
   }

   return (
      <div className="page-home" style={{ '--home-accent-rgb': homeAccentRgb }}>
         <section className='recently-played-section'>
            {isRecentLoading
               ? Array.from({ length: 8 }).map((_, idx) => (
                    <div
                       className='recently-played-station-container recently-played-skeleton'
                       key={`recent-skeleton-${idx}`}
                    >
                       <div className='recently-played-station-img-container skeleton-block' aria-hidden="true" />
                       <span className='recently-played-station-name recently-played-skeleton-title' aria-hidden="true" />
                    </div>
                 ))
               : recentlyPlayed.map((station) => {
                    const coverImage = getStationCover(station)
                    return (
                       <div
                          className='recently-played-station-container'
                          onClick={() => onSelectStation(station)}
                          onMouseEnter={() => handleStationHover(coverImage)}
                          onFocus={() => handleStationHover(coverImage)}
                          key={station._id}
                       >
                          <div className='recently-played-station-img-container'>
                             <img className='recently-played-station-img' src={coverImage} alt="station-img" />
                          </div>
                          <span className='recently-played-station-name'>{station.name}</span>
                          <PlayButton 
                             className="circle-btn recently-played-play-button"
                             isPlaying={currentStation?._id === station?._id && isPlaying}
                             alwaysShow={false}
                             onClick={(ev) => onPlay(station, ev)}
                          />
                          {(isPlaying && currentStation?._id === station?._id) &&
                             <img className='is-station-playing-img' src="https://open.spotifycdn.com/cdn/images/equaliser-green.f8937a92.svg" alt="isPlaying" />
                          }
                       </div>
                    )
                 })}
         </section>
         {categories.map((category) => (
            <SongSuggestion title={category} onPlay={onPlay} />
         ))}
      </div>
   );
}
