import { useState } from 'react';

export function EditStationModal({ onSetIsEditOpen, station, onSaveStation }) {
   const [stationToEdit, setStationToEdit] = useState({ ...station });

   function handleChange({ target }) {
      const { name: field, value } = target;
      setStationToEdit((prev) => ({ ...prev, [field]: value }));
   }

   function onSave(ev) {
      ev.preventDefault();
      onSaveStation(stationToEdit);
      onClose();
   }

   function onClose() {
      onSetIsEditOpen(null);
   }

   return (
      <div className="modal-backdrop">
         <form className="modal-content" onSubmit={onSave}>
            <div className="modal-header">
               <h1>Edit Details</h1>
               <button className="close-btn" onClick={onClose}>
                  X
               </button>
            </div>
            <div className="content-container">
               <img src="https://www.afrocharts.com/images/song_cover.png" />
               <input
                  className="field-name"
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  placeholder="Add a name"
                  value={stationToEdit.name}
               />
               <input
                  className="field-desc"
                  type="description"
                  name="description"
                  id="description"
                  onChange={handleChange}
                  placeholder="Add an optional description"
                  value={stationToEdit.description}
               />
            </div>
            <input className="submit-btn circle-btn" type="submit" value="Save" />
         </form>
      </div>
   );
}
