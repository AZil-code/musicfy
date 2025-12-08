import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { AddToStationsModal } from './AddToStationsModal.jsx'
import { addSong, removeSong, createStation, saveStation, fetchStations } from '../store/actions/station.actions.js'
import { getUserStations } from '../store/actions/user.actions.js'


export function AddToStationsButton({ song, station=null, inModal=false, className='' }) {

    const allStations = useSelector((state) => state.stationModule.stations)
    
    const [stations, setStations] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    const [stationToAdd, setStationToAdd] = useState(station)
    const containerRef = useRef(null)

    useEffect( () => {
        loadUserStations()
    }, [allStations])

    
    useEffect( () => {

        if (!station) setStationToAdd(stations[0])
        else if (stations) {
            setStationToAdd(stations[stations.findIndex( (s) => s._id === station._id)])
        }
            
        if (stationToAdd && song && Array.isArray(stationToAdd.songs)) {
            setIsAdded(stationToAdd.songs.some((item) => item._id === song._id))
        }
    }, [song, stations, allStations])  

    useEffect( () => {
        if (song && stationToAdd && Array.isArray(stationToAdd.songs)) {
            setIsAdded(stationToAdd.songs.some((item) => item._id === song._id))
        }
    }, [stationToAdd])

    const handleClick = (e) => {

        e.stopPropagation()
        if (isAdded) {
            if (inModal && stationToAdd) {
                removeSong(stationToAdd, song)
                setIsAdded(false)
            }
            else setIsOpen(true)
        } else {
            if (song && stationToAdd){
                addSong(stationToAdd, song)
                setIsAdded(true)
            }
        }       
    }

    const loadUserStations = async () => {
        const loadedStations = await getUserStations()
        setStations(loadedStations)
    }
 
    return (
        <div ref={containerRef} className={`add-to-stations `+className}>
            {
                isAdded ? 
                    <svg 
                        className='added-to-liked-svg' 
                        role="img" 
                        aria-hidden="true" 
                        onClick={ (e) => { handleClick(e) } }
                    >
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"></path>
                    </svg>
                :
                    <button
                        type="button"
                        className="add-to-stations-pill"
                        // disabled={!song}
                        onClick={ (e) => { handleClick(e) } }
                    >
                        +
                    </button>
            }
            {(isOpen && !inModal) ? (
                <AddToStationsModal
                    song={song}
                    stations={stations}
                    anchorRef={containerRef}
                    onClose={() => setIsOpen(false)}
                />
            ) : null}
        </div>
    )
}
