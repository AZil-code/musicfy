import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'

import { addSong, removeSong, createStation, saveStation, fetchStations } from '../store/actions/station.actions.js'
import { getUserStations } from '../store/actions/user.actions.js'

import { StationFilter } from './StationFilter.jsx'
import { StationList } from './StationList.jsx'

export function AddToStationsModal({ song, onClose, anchorRef }) {

    const [filterTxt, setFilterTxt] = useState('')
    const menuRef = useRef(null)
    const [coords, setCoords] = useState({ top: 0, left: 0 })
    const [stations, setStations] = useState([])

    useEffect(() => {
        loadStations()
    }, [])

    // Compute fixed coordinates to keep menu in viewport and flip if near bottom
    function positionMenu() {
        const anchorEl = anchorRef?.current
        const menuEl = menuRef.current
        if (!anchorEl || !menuEl) return

        const pad = 8
        const viewportW = window.innerWidth
        const viewportH = window.innerHeight
        const aRect = anchorEl.getBoundingClientRect()

        // Measure menu
        const mRect = menuEl.getBoundingClientRect()
        let left = aRect.right + pad
        let top = aRect.top

        // Horizontal flip if overflowing right
        if (left + mRect.width > viewportW - pad) {
            left = Math.max(pad, aRect.left - mRect.width - pad)
        }

        // Vertical flip if overflowing bottom
        if (top + mRect.height > viewportH - pad) {
            top = Math.max(pad, aRect.bottom - mRect.height)
        }

        // Clamp within viewport
        left = Math.min(Math.max(left, pad), Math.max(viewportW - mRect.width - pad, pad))
        top = Math.min(Math.max(top, pad), Math.max(viewportH - mRect.height - pad, pad))

        setCoords({ top, left })
    }

    useLayoutEffect(() => {
        positionMenu()
        const onWin = () => positionMenu()
        window.addEventListener('resize', onWin)
        window.addEventListener('scroll', onWin, true)
        return () => {
            window.removeEventListener('resize', onWin)
            window.removeEventListener('scroll', onWin, true)
        }
    }, [anchorRef])

    // Reposition when content likely changes height (e.g., filtering)
    useEffect(() => {
        positionMenu()
    }, [filterTxt, stations])

    // Close on outside click (respect the anchor element too)
    useEffect(() => {
        const controller = new AbortController()
        const handler = ({ target }) => {
            const menuEl = menuRef.current
            const anchorEl = anchorRef?.current
            if (!menuEl) return
            const clickInsideMenu = menuEl.contains(target)
            const clickInsideAnchor = anchorEl && anchorEl.contains(target)
            if (!clickInsideMenu && !clickInsideAnchor) {
                onClose?.()
                controller.abort()
            }
        }
        document.addEventListener('mousedown', handler, { signal: controller.signal, capture: true })
        const keyHandler = (e) => {
            if (e.key === 'Escape') onClose?.()
        }
        document.addEventListener('keydown', keyHandler, { signal: controller.signal })
        return () => controller.abort()
    }, [onClose, anchorRef])

    async function loadStations() {
        const stations = await getUserStations()
        setStations(stations)
    }

    // const toggleStation = async (station) => {

    //     const exists = Array.isArray(station.songs) && station.songs.some((item) => item?._id === song._id)
    //     try {
    //         if (exists) {
    //             await removeSong(station, song)
    //         } else {
    //             await addSong(station, song)
    //         }
    //     } catch (error) {
    //         console.error('AddToStationsModal -> toggle failed', error)
    //     }
    // }

    const content = (
        <ul
            ref={menuRef}
            className="context-menu add-to-stations-modal"
            style={{
                position: 'fixed',
                top: `${coords.top}px`,
                left: `${coords.left}px`,
                padding: '10px',
                margin: 0,
                listStyle: 'none',
            }}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <li style={{ padding: 0 }}>
                <div className="add-to-stations-body">
                    <StationFilter 
                        setFilterTxt={setFilterTxt} 
                        filterTxt={filterTxt} 
                        modalVersion={true}
                    />
                    <StationList 
                        stations={stations} 
                        filterTxt={filterTxt} 
                        modalVersion={true} 
                        // toggleStation={toggleStation}
                        songToAdd={song}
                        className='add-to-stations-modal-list'
                    />
                </div>
            </li>
        </ul>
    )

    return createPortal(content, document.body)
}
