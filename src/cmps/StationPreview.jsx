// Need to increase size of play button svg (when hovering over station)

export function StationPreview({ station }) {
   return (
      <div className="station-preview">
         <div className="thumbnail-container">
            <button className="play-button">
               <svg
                  data-encore-id="icon"
                  role="img"
                  aria-hidden="true"
                  class="e-91000-icon e-91000-baseline"
                  viewBox="0 0 24 24"
                  height={25}
                  width={25}
               >
                  <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path>
               </svg>
            </button>
            <svg className="thumbnail" role="img" aria-hidden="true" height={25} width={25} viewBox="0 0 24 24">
               <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5z"></path>
            </svg>
         </div>
         <div className="details">
            <div className="title">{station.name}</div>
            <div className="subtitle">placeholder</div>
         </div>
      </div>
   );
}
