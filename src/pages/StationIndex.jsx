import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SongSuggestion } from '../cmps/SongSuggestion'
import { PlayButton } from '../cmps/PlayButton.jsx'
import { pause, play, setCurrentSong, setCurrentStation } from '../store/actions/player.actions'
import { getUserStations } from '../store/actions/user.actions.js'
import { fetchStations } from '../store/actions/station.actions.js'
import { selectStation } from '../store/actions/station.actions.js'
import { store } from '../store/store.js';

const categories = ['Rock', 'classics', 'Pop',  'Metal', 'R&B' ];

export function StationIndex() {
   const { currentStation, isPlaying } = useSelector((store) => store.playerModule);
   const { user } = useSelector( (store) => store.userModule)
   const [recentlyPlayed, setRecentlyPlayed] = useState([])
   const navigate = useNavigate()

   useEffect( () => {
      if (user.savedStations){
         loadUserStations()
         fetchStations()
         // selectStation(null)
      }
      
   }, [user])

   console.log('currentStation: ',currentStation, 'isPlaying: ', isPlaying)

   async function loadUserStations(){
      const stations = await getUserStations()
      setRecentlyPlayed(stations.splice(0, 8))
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
      <div className="page-home">
         <section className='recently-played-section'>
            {recentlyPlayed && recentlyPlayed.map( (station) => {
               return (
                  <div className='recently-played-station-container' onClick={() => onSelectStation(station)}>
                     <div className='recently-played-station-img-container'>
                        <img className='recently-played-station-img' src={station.name === 'Liked Songs' ? 'https://misc.scdn.co/liked-songs/liked-songs-300.jpg' : station.coverImage } alt="station-img" />
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
               )})}
         </section>
         {categories.map((category) => (
            <SongSuggestion title={category} onPlay={onPlay} />
         ))}
      </div>
   );
}
