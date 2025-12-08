import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { SongList } from '../cmps/SongList.jsx';
import { setCurrentSong, play, pause, shuffle, setCurrentStation } from '../store/actions/player.actions.js';
import { selectStation } from '../store/actions/station.actions.js';
import { addSong, fetchStations, removeSong, updateStationArtwork } from '../store/actions/station.actions.js';
import { getUserStations, removeUserStation, addUserStation } from '../store/actions/user.actions.js';

import { FindMore } from '../cmps/FindMore.jsx';
import { PlayButton } from '../cmps/PlayButton.jsx';
import { ShuffleButton } from '../svgs/Icons.jsx';
import { AddButton } from '../svgs/Icons.jsx';
import { storageService } from '../services/async-storage.service.js';

export function StationDetails({ stationId }) {
   const params = useParams();
   const selectedStationId = useSelector((storeState) => storeState.stationModule.selectedStationId);
   const stations = useSelector((storeState) => storeState.stationModule.stations);
   const { currentSong, isPlaying, isShuffle, currentStation } = useSelector((storeState) => storeState.playerModule);
   const { user } = useSelector( (storeState) => storeState.userModule)
   // const [headerGradient, setHeaderGradient] = useState(null)
   const [isFindMore, setIsFindMore] = useState(false);
   const [showStickyControls, setShowStickyControls] = useState(false);
   const [isAdded, setIsAdded] = useState()
   

   const containerRef = useRef();
   const stickyControlsRef = useRef();
   const stickySentinelRef = useRef(null);
   const indexLiRef = useRef()
   const infoContainerRef = useRef(null)
   const titleRef = useRef(null)

   const activeStationId = selectedStationId || stationId || params.stationID;

   const station =
      activeStationId && Array.isArray(stations)
         ? stations.find((currStation) => currStation && currStation._id === activeStationId) || null
         : null;

   useEffect(() => {
      if (!stations.length) fetchStations();
     
   }, [stations.length]);

   useEffect( () => {
      if (!user || !station) return
      const savedStations = Array.isArray(user.savedStations) ? user.savedStations : []
      setIsAdded(savedStations.findIndex( (stationtoAdd) => stationtoAdd.stationId === station._id ) !== -1)
   }, [user, station])

   useEffect(() => {
      const sentinel = stickySentinelRef.current;

      if (!sentinel || typeof IntersectionObserver === 'undefined') return;

      const observer = new IntersectionObserver(
         ([entry]) => {
            setShowStickyControls(!entry.isIntersecting)
         },
         { root: null, threshold: 0 }
      );

      observer.observe(sentinel);
      return () => observer.disconnect();
   }, [stickySentinelRef.current]);

   

   const songs = station && Array.isArray(station.songs) ? station.songs : [];
   const firstSong = songs.length ? songs[0] : null;
   const coverFromStation = station && typeof station.coverImage === 'string' ? station.coverImage.trim() : '';
   const coverImage =
      station && station.name === 'Liked Songs'
         ? 'https://misc.scdn.co/liked-songs/liked-songs-300.jpg'
         : coverFromStation ||
           (firstSong && firstSong.imgUrl) ||
           'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=600&q=60';

   useEffect(() => {
      // if (!coverImage) {
      //     setHeaderGradient(null)
      //     return
      // }

      let isCancelled = false;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = coverImage;
      img.onload = () => {
         if (isCancelled) return;
         const canvas = document.createElement('canvas');
         const ctx = canvas.getContext('2d', { willReadFrequently: true });
         // if (!ctx) {
         //     setHeaderGradient(null)
         //     return
         // }
         const width = (canvas.width = img.naturalWidth || img.width || 0);
         const height = (canvas.height = img.naturalHeight || img.height || 0);

         // if (!width || !height) {
         //     setHeaderGradient(null)
         //     return
         // }

         ctx.drawImage(img, 0, 0, width, height);

         let imageData;
         try {
            imageData = ctx.getImageData(0, 0, width, height).data;
         } catch (error) {
            console.log('Error in color gradient', error);
            return;
         }

         let r = 0;
         let g = 0;
         let b = 0;
         let count = 0;

         const totalPixels = imageData.length / 4;
         const sampleFactor = Math.max(1, Math.floor(totalPixels / 5000));

         for (let i = 0; i < imageData.length; i += 4 * sampleFactor) {
            const alpha = imageData[i + 3];
            if (alpha < 64) continue;
            r += imageData[i];
            g += imageData[i + 1];
            b += imageData[i + 2];
            count++;
         }

         // if (!count) {
         //     setHeaderGradient(null)
         //     return
         // }

         r = Math.round(r / count);
         g = Math.round(g / count);
         b = Math.round(b / count);

         const gradient = `linear-gradient(180deg, rgba(${r}, ${g}, ${b}, 0.85) 20%, rgba(${r}, ${g}, ${b}, 0.18) 35%, rgba(18, 18, 18, 1) 100%)`;
         if (containerRef?.current) containerRef.current.style.background = gradient
         // const layoutRef = document.querySelector('.spotify-layout-main')
         // layoutRef && (layoutRef.style.background = '')
         
         if (stickyControlsRef?.current) stickyControlsRef.current.style.background = `rgba(${r},${g},${b}, 1)`
         // setHeaderGradient(gradient)
      };

      // img.onerror = () => {
      //     if (!isCancelled) setHeaderGradient(null)
      // }

      return () => {
         isCancelled = true;
      };
   }, [coverImage]);

   useEffect(() => {
      if (!station || !Array.isArray(station.songs) || !station.songs.length) return;
      const leadSong = station.songs[0];
      const firstSongImg = leadSong && leadSong.imgUrl;
      if (!firstSongImg) return;
      updateStationArtwork(station._id, firstSongImg);
   }, [station && station._id, firstSong && firstSong.imgUrl]);

   const handleSelectSong = (song) => {
      console.log('song', song);
      if (!song) return;
      const selectedId = song._id;
      const currentId = currentSong ? currentSong._id : null;

      if (selectedId && currentId && String(selectedId) === String(currentId)) {
         if (isPlaying) pause();
         else play();
      } else {
         const queue = songs;
         const queueIndex = queue.findIndex((currSong) => currSong && String(currSong._id) === String(selectedId));
         setCurrentSong(song, {
            queue,
            queueIndex: queueIndex >= 0 ? queueIndex : 0,
         });
         // selectStation(station._id)
         setCurrentStation(station)
         play();
      }
   };

   useEffect(() => {
      const titleEl = titleRef.current
      const containerEl = infoContainerRef.current || titleEl?.parentElement
      if (!titleEl || !containerEl || typeof ResizeObserver === 'undefined') return

      const MAX = 90
      const MIN = 32

      const fitTitle = () => {
         if (!titleEl || !containerEl) return
         titleEl.style.fontSize = `${MAX}px`
         titleEl.style.whiteSpace = 'nowrap'

         const available = containerEl.clientWidth
         let size = MAX

         while (size > MIN && titleEl.scrollWidth > available) {
            size -= 1
            titleEl.style.fontSize = `${size}px`
         }
      }

      const ro = new ResizeObserver(fitTitle)
      ro.observe(containerEl)
      fitTitle()

      return () => ro.disconnect()
   }, [station && station.name])

   const handleRemoveSong = async (song) => {
      if (!station || !song) return;
      try {
         await removeSong(
            {
               ...station,
               songs: [...(station.songs || [])],
            },
            song
         );
      } catch (error) {
         console.error('StationDetails -> failed to remove song', error);
      }
   };

   function onFindMore() {
      setIsFindMore((prev) => !prev);
   }

   function handlePlayClick(){
      if (station.songs.findIndex((song) => song._id === currentSong._id) !== -1){
         handleSelectSong(currentSong)
      } else{
         shuffle(false)
         handleSelectSong(station.songs[0])
      }
   }

   function handleShuffle(){

      station.songs.findIndex((song) => song._id === currentSong._id) !== -1 && (isShuffle ? 
         (shuffle(false)) : 
         (shuffle(true))
      )
   }

   function handleAddStation(){
      isAdded ? 
         removeUserStation(station._id) :
         addUserStation(station._id)
   }
   function handleAddSong(song){
      addSong(station, song)
   }

   if (!station || !user) {
      return (
         <div className="page-station-details">
            <p>{stations.length ? 'Station not found.' : 'Loading station…'}</p>
         </div>
      );
   }

   return (
      <div className="page-station-details" 
            // ref={containerRef}
         >
         <div
            ref={containerRef}
            className="station-details-content"
            // style={headerGradient ? { background: headerGradient } : undefined}
         >
            <header className="station-details-header">
               <div className="station-details-cover">
                  <img className="station-details-img" src={coverImage} alt={`${station.name || 'Station'} cover`} />
               </div>
               <div className="station-details-info-container" ref={infoContainerRef}>
                  <p className="station-details-station-type">Playlist</p>
                  <h1 ref={titleRef} className="station-details-title">{station.name || 'Untitled station'}</h1>
                  <p className="station-details-user-info-container">
                     <span className="station-detials-user text-span-center text-white">{station.createdBy.username || station.createdBy.fullname}</span>
                     <span>•</span>
                     <span className="station-detials-song-length text-span-center text-gray">
                        {songs.length + ' songs'}
                     </span>
                  </p>
               </div>
               
            </header>
            <div className='station-controls-container'>
               <PlayButton 
                  onClick={handlePlayClick}
                  className='station-play-button'
                  isPlaying={activeStationId === selectedStationId && isPlaying && (station.songs.findIndex((song) => song._id === currentSong._id) !== -1)}
                  alwaysShow={true}
                  variant={'station'}
               />
               
               <button className='station-shuffle-button' onClick={handleShuffle}>
                  <ShuffleButton className='station-shuffle-icon' ariaPressed={(!!isShuffle && currentSong) && (station.songs.findIndex((song) => song._id === currentSong._id) !== -1)}/>
               </button>
               <button className='station-add-button' onClick={handleAddStation}>
                  <AddButton className='station-add-icon' isAdded={isAdded}/>
               </button>
            </div>
            <div ref={stickySentinelRef} className="station-controls-sentinel" aria-hidden="true"></div>
            <div className={`station-controls-sticky ${showStickyControls ? 'is-sticky-visible' : ''}`} ref={stickyControlsRef}>
               <PlayButton 
                  onClick={handlePlayClick}
                  className='station-play-button-sticky'
                  isPlaying={activeStationId === selectedStationId && isPlaying && (station.songs.findIndex((song) => song._id === currentSong._id) !== -1)}
                  alwaysShow={true}
                  variant={'sticky'}
               />
               <span>{station.name}</span>
            </div>
            <SongList
               songs={songs}
               onSelectSong={handleSelectSong}
               onRemoveSong={handleRemoveSong}
               currentSongId={(currentSong && currentSong._id) || ''}
               isPlaying={isPlaying}
               showStickyControls={showStickyControls}
            />
            {isFindMore ? (
               <FindMore onClose={onFindMore} onAddSong={handleAddSong}/>
                  ) : (
               <button onClick={onFindMore} className="find-more-btn">
                  Find More
               </button>
            )}
         </div>
         
      </div>
   );
}
