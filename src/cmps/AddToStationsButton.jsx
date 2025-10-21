import { useState } from 'react'
import { useSelector } from 'react-redux'

import { AddToStationsModal } from './AddToStationsModal.jsx'

export function AddToStationsButton({ song }) {
    const stations = useSelector((state) => state.stationModule.stations || [])
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="add-to-stations">
            <button
                type="button"
                className="add-to-stations-pill"
                disabled={!song}
                onClick={(event) => {
                    event.stopPropagation()
                    if (!song) return
                    setIsOpen(true)
                }}
            >
                +
            </button>
            {isOpen ? (
                <AddToStationsModal
                    song={song}
                    stations={stations}
                    onClose={() => setIsOpen(false)}
                />
            ) : null}
        </div>
    )
}
