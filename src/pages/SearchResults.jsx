import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { SongList } from '../cmps/SongList';
import { searchFull } from '../store/actions/search.actions.js';
import { setCurrentSong, setCurrentStation, play, pause } from '../store/actions/player.actions.js';
import { selectStation } from '../store/actions/station.actions.js';
import { searchService } from '../services/search.service.js';
import { stationService } from '../services/station.service.js';
import { utilService } from '../services/util.service.js';
import { PlayButton } from '../cmps/PlayButton.jsx';
import useEmblaCarousel from 'embla-carousel-react';

export function SearchResults() {
   const [searchResults, setSearchResults] = useState({
      tracks: [],
      artists: [],
      albums: [],
      playlists: [],
   });
   const { searchStr } = useParams();
   const navigate = useNavigate();
   const { currentSong, isPlaying, currentStation } = useSelector((state) => state.playerModule);
   const [albumsEmblaRef, albumsEmblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
   const [playlistsEmblaRef, playlistsEmblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
   const [albumsHover, setAlbumsHover] = useState(false);
   const [playlistsHover, setPlaylistsHover] = useState(false);
   const [canAlbumsPrev, setCanAlbumsPrev] = useState(false);
   const [canAlbumsNext, setCanAlbumsNext] = useState(false);
   const [canPlaylistsPrev, setCanPlaylistsPrev] = useState(false);
   const [canPlaylistsNext, setCanPlaylistsNext] = useState(false);

   useEffect(() => {
      loadSearchResults();
   }, [searchStr]);

   const syncEmblaButtons = useCallback((emblaApi, setPrev, setNext) => {
      if (!emblaApi) return () => {};
      const update = () => {
         setPrev(emblaApi.canScrollPrev());
         setNext(emblaApi.canScrollNext());
      };
      update();
      emblaApi.on('select', update);
      emblaApi.on('reInit', update);
      return () => {
         emblaApi.off('select', update);
         emblaApi.off('reInit', update);
      };
   }, []);

   useEffect(() => {
      const cleanupAlbums = syncEmblaButtons(albumsEmblaApi, setCanAlbumsPrev, setCanAlbumsNext);
      const cleanupPlaylists = syncEmblaButtons(playlistsEmblaApi, setCanPlaylistsPrev, setCanPlaylistsNext);
      return () => {
         cleanupAlbums && cleanupAlbums();
         cleanupPlaylists && cleanupPlaylists();
      };
   }, [albumsEmblaApi, playlistsEmblaApi, syncEmblaButtons]);

   async function loadSearchResults() {
      const results = await searchFull(searchStr);
      setSearchResults({
         tracks: Array.isArray(results?.tracks) ? results.tracks : [],
         artists: Array.isArray(results?.artists) ? results.artists : [],
         albums: Array.isArray(results?.albums) ? results.albums : [],
         playlists: Array.isArray(results?.playlists) ? results.playlists : [],
      });
   }

   const topTracks = useMemo(() => (Array.isArray(searchResults.tracks) ? searchResults.tracks.slice(0, 4) : []), [searchResults.tracks]);
   const topArtist = useMemo(() => (Array.isArray(searchResults.artists) && searchResults.artists.length ? searchResults.artists[0] : null), [searchResults.artists]);
   const topAlbums = useMemo(() => (Array.isArray(searchResults.albums) ? searchResults.albums.slice(0, 10) : []), [searchResults.albums]);
   const topPlaylists = useMemo(
      () => (Array.isArray(searchResults.playlists) ? searchResults.playlists.slice(0, 10) : []),
      [searchResults.playlists]
   );

   const handleSelectSong = async (song) => {
      if (!song) return;
      const selectedId = song._id || song.spotifyId;
      const currentId = currentSong ? currentSong._id : null;

      if (selectedId && currentId && String(selectedId) === String(currentId)) {
         if (isPlaying) pause();
         else play();
      } else {
         const queue = topTracks;
         const queueIndex = queue.findIndex((currSong) => currSong && String(currSong._id || currSong.spotifyId) === String(selectedId));
         // Playing from search results is not tied to a station, so clear station selection + currentStation highlight
         selectStation(null);
         setCurrentStation(null);
         setCurrentSong(song, {
            queue,
            queueIndex: queueIndex >= 0 ? queueIndex : 0,
         });
         play();
      }
   };

   const playTopArtist = () => {
      if (!topTracks.length) return;
      const queue = topTracks;
      setCurrentStation({
         _id: `spotify-artist-${topArtist?.id || 'top'}`,
         name: topArtist?.name || 'Top result',
         coverImage: topArtist?.images?.[0]?.url || '',
      });
      setCurrentSong(queue[0], { queue, queueIndex: 0 });
      play();
   };

   const normalizeSongs = (songs = []) =>
      Array.isArray(songs)
         ? songs.map((song, idx) => ({
              ...song,
              _id: song?._id || song?.spotifyId || utilService.makeId(10 + idx),
              title: song?.title || song?.name || 'Unknown title',
              album: song?.album || (song?.album?.name ? song.album.name : 'Unknown album'),
              duration: typeof song?.duration === 'number' ? song.duration : 0,
              imgUrl: song?.imgUrl || (song?.album?.images?.[0]?.url ?? ''),
              artists: Array.isArray(song?.artists)
                 ? song.artists.map((artist) => (typeof artist === 'string' ? { name: artist } : { name: artist?.name || '' }))
                 : [],
           }))
         : [];

   const playPlaylist = async (playlist) => {
      if (!playlist?.id) return;
      try {
         if (isPlaylistCurrent(playlist)) {
            if (isPlaying) pause();
            else play();
            return;
         }

         const { songs } = await searchService.getPlaylistTracks(playlist.id);
         if (!Array.isArray(songs) || !songs.length) return;
         const queue = normalizeSongs(songs);
         const stationObj = {
            _id: `spotify-playlist-${playlist.id}`,
            name: playlist.name,
            coverImage: playlist.images?.[0]?.url || '',
         };
         setCurrentStation(stationObj);
         selectStation(null);
         setCurrentSong(queue[0], { queue, queueIndex: 0 });
         play();
      } catch (err) {
         console.error('Cannot play playlist', err);
      }
   };

   const openPlaylistAsStation = async (playlist) => {
      if (!playlist?.id) return;
      try {
         const { songs } = await searchService.getPlaylistTracks(playlist.id);
         if (!Array.isArray(songs) || !songs.length) return;
         const normalizedSongs = normalizeSongs(songs);

         const stationPayload = {
            name: playlist.name,
            coverImage: playlist.images?.[0]?.url || '',
            tags: ['spotify', 'playlist'],
            createdBy: {},
            likedByUsers: [],
            isPrivate: false,
            songs: normalizedSongs,
         };

         const savedStation = await stationService.save(stationPayload);
         const stationId = String(savedStation._id || savedStation.insertedId || savedStation.id || '');
         if (!stationId) return;
         const stationForState = { ...savedStation, _id: stationId };
         setCurrentStation(stationForState);
         selectStation(stationId);
         navigate(`/station/${stationId}`);
      } catch (err) {
         console.error('Cannot open playlist as station', err);
      }
   };

   const playAlbum = async (album) => {
      if (!album?.id) return;
      try {
         if (isAlbumCurrent(album)) {
            if (isPlaying) pause();
            else play();
            return;
         }

         const { songs } = await searchService.getAlbumTracks(album.id);
         if (!Array.isArray(songs) || !songs.length) return;
         const queue = normalizeSongs(songs);
         const stationObj = {
            _id: `spotify-album-${album.id}`,
            name: album.name,
            coverImage: album.images?.[0]?.url || '',
         };
         setCurrentStation(stationObj);
         selectStation(null);
         setCurrentSong(queue[0], { queue, queueIndex: 0 });
         play();
      } catch (err) {
         console.error('Cannot play album', err);
      }
   };

   const isPlaylistCurrent = (playlist) => {
      if (!playlist?.id || !currentStation?._id) return false;
      const csId = String(currentStation._id);
      return csId === `spotify-playlist-${playlist.id}` || csId === playlist.id;
   };

   const isAlbumCurrent = (album) => {
      if (!album?.id || !currentStation?._id) return false;
      const csId = String(currentStation._id);
      return csId === `spotify-album-${album.id}` || csId === album.id;
   };

   const openAlbumAsStation = async (album) => {
      if (!album?.id) return;
      try {
         const { songs } = await searchService.getAlbumTracks(album.id);
         if (!Array.isArray(songs) || !songs.length) return;
         const normalizedSongs = normalizeSongs(songs);

         const stationPayload = {
            name: album.name,
            coverImage: album.images?.[0]?.url || '',
            tags: ['spotify', 'album'],
            createdBy: {},
            likedByUsers: [],
            isPrivate: false,
            songs: normalizedSongs,
         };

         const savedStation = await stationService.save(stationPayload);
         const stationId = String(savedStation._id || savedStation.insertedId || savedStation.id || '');
         if (!stationId) return;
         const stationForState = { ...savedStation, _id: stationId };
         setCurrentStation(stationForState);
         selectStation(stationId);
         navigate(`/station/${stationId}`);
      } catch (err) {
         console.error('Cannot open album as station', err);
      }
   };

   const renderMediaCard = (item, type) => {
      const image = item?.images?.[0]?.url || '';
      const title = item?.name || '';
      const subtitle =
         type === 'album'
            ? `${item?.release_date?.split('-')[0] || ''} • ${(item?.artists && item.artists[0]?.name) || ''}`
            : item?.owner?.display_name || 'Playlist';
      const isActive = type === 'album' ? isAlbumCurrent(item) : isPlaylistCurrent(item);
      const handlePlay = type === 'album' ? () => playAlbum(item) : () => playPlaylist(item);
      const handleOpen = type === 'album' ? () => openAlbumAsStation(item) : () => openPlaylistAsStation(item);

      return (
         <div className="media-card" onClick={handleOpen}>
            <div className="media-card-thumb">
               <img src={image} alt={title} loading="lazy" />
               <div className="media-card-actions">
                  <PlayButton className="circle-btn" variant="card" isPlaying={isActive && isPlaying} onClick={(ev) => {
                     ev.stopPropagation();
                     handlePlay();
                  }} />
               </div>
            </div>
            <div className="media-card-title">{title}</div>
            <div className="media-card-subtitle">{subtitle}</div>
         </div>
      );
   };

   return (
      <div className="page-station-details search-results-page">
         <div className="search-hero">
            <div className="top-result-card">
               <h3>Top result</h3>
               {topArtist ? (
                  <div className="top-result-body">
                     <div className="top-result-image">
                        <img src={(topArtist.images && topArtist.images[0]?.url) || ''} alt={topArtist.name} loading="lazy" />
                     </div>
                     <div className="top-result-meta">
                        <h2>{topArtist.name}</h2>
                        <p>Artist</p>
                        <div className="top-result-play">
                           <PlayButton className="circle-btn" variant="card" isPlaying={false} alwaysShow onClick={playTopArtist} />
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className="top-result-placeholder">No artist found</div>
               )}
            </div>
            <div className="top-songs">
               <h3>Songs</h3>
               <SongList
                  songs={topTracks}
                  onSelectSong={handleSelectSong}
                  currentSongId={(currentSong && currentSong._id) || ''}
                  isPlaying={isPlaying}
               />
            </div>
         </div>

         <div className="search-section">
            <h3>Albums</h3>
            <div
               className={`embla ${canAlbumsPrev ? 'can-scroll-prev' : ''} ${canAlbumsNext ? 'can-scroll-next' : ''}`}
               onMouseEnter={() => setAlbumsHover(true)}
               onMouseLeave={() => setAlbumsHover(false)}
            >
               <div className="embla__viewport" ref={albumsEmblaRef}>
                  <div className="embla__container">
                     {topAlbums.map((album) => (
                        <div className="embla__slide" key={album.id}>
                           {renderMediaCard(album, 'album')}
                        </div>
                     ))}
                  </div>
               </div>
               {albumsHover && canAlbumsPrev && (
                  <div className="embla__btn embla__prev" onClick={() => albumsEmblaApi && albumsEmblaApi.scrollPrev()} aria-label="Previous">
                     <svg viewBox="0 0 16 16" role="img" aria-hidden="true">
                        <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0"></path>
                     </svg>
                  </div>
               )}
               {albumsHover && canAlbumsNext && (
                  <div className="embla__btn embla__next" onClick={() => albumsEmblaApi && albumsEmblaApi.scrollNext()} aria-label="Next">
                     <svg viewBox="0 0 16 16" role="img" aria-hidden="true">
                        <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0"></path>
                     </svg>
                  </div>
               )}
            </div>
         </div>

         <div className="search-section">
            <h3>Playlists</h3>
            <div
               className={`embla ${canPlaylistsPrev ? 'can-scroll-prev' : ''} ${canPlaylistsNext ? 'can-scroll-next' : ''}`}
               onMouseEnter={() => setPlaylistsHover(true)}
               onMouseLeave={() => setPlaylistsHover(false)}
            >
               <div className="embla__viewport" ref={playlistsEmblaRef}>
                  <div className="embla__container">
                     {topPlaylists.map((playlist) => (
                        <div className="embla__slide" key={playlist.id}>
                           {renderMediaCard(playlist, 'playlist')}
                        </div>
                     ))}
                  </div>
               </div>
               {playlistsHover && canPlaylistsPrev && (
                  <div className="embla__btn embla__prev" onClick={() => playlistsEmblaApi && playlistsEmblaApi.scrollPrev()} aria-label="Previous">
                     <svg viewBox="0 0 16 16" role="img" aria-hidden="true">
                        <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0"></path>
                     </svg>
                  </div>
               )}
               {playlistsHover && canPlaylistsNext && (
                  <div className="embla__btn embla__next" onClick={() => playlistsEmblaApi && playlistsEmblaApi.scrollNext()} aria-label="Next">
                     <svg viewBox="0 0 16 16" role="img" aria-hidden="true">
                        <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0"></path>
                     </svg>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
