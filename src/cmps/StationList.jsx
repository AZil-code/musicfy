export function StationList({ stations, onRemoveStation }) {
   return (
      <div className="station-list-container">
         <ul>
            {stations.map((station) => (
               <div key={station._id}>
                  <span>{station.name}</span>
                  <button
                     onClick={() => {
                        onRemoveStation(station._id);
                     }}
                  >
                     X
                  </button>
               </div>
            ))}
         </ul>
      </div>
   );
}
