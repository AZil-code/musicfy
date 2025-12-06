import useEmblaCarousel from 'embla-carousel-react';
import { useSelector } from 'react-redux';
import { StationCard } from './StationCard';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function SongSuggestion({ title, station, onPlay }) {
   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
   const [isHovered, setIsHovered] = useState(false);
   const [canScrollPrev, setCanScrollPrev] = useState(false);
   const [canScrollNext, setCanScrollNext] = useState(false);
   const stations = useSelector((store) => store.stationModule.stations);
   const filteredStations = useMemo(() => {
      if (!Array.isArray(stations)) return [];
      const lcTitle = String(title).toLowerCase();
      return stations.filter(
         (station) =>
            Array.isArray(station.tags) &&
            station.tags.some((tag) => String(tag).toLowerCase() === lcTitle)
      );
   }, [stations, title]);

   

   const onScrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext();
   }, [emblaApi]);
   const onScrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev();
   }, [emblaApi]);

   useEffect(() => {
      if (!emblaApi) return;

      const updateButtons = () => {
         setCanScrollPrev(emblaApi.canScrollPrev());
         setCanScrollNext(emblaApi.canScrollNext());
      };

      updateButtons();
      emblaApi.on('select', updateButtons);
      emblaApi.on('reInit', updateButtons);

      return () => {
         emblaApi.off('select', updateButtons);
         emblaApi.off('reInit', updateButtons);
      };
   }, [emblaApi]);

   if (filteredStations.length === 0) return;
   return (
      <section className="song-suggestion">
         <h3>{title}</h3>
         <div
            className={`embla ${canScrollPrev ? 'can-scroll-prev' : ''} ${canScrollNext ? 'can-scroll-next' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
         >
            <div className="embla__viewport" ref={emblaRef}>
               <div className="embla__container">
                  {filteredStations.map((station) => (
                     <div className="embla__slide" key={station._id}>
                        <StationCard station={station} onClickCard={onPlay} />
                     </div>
                  ))}
               </div>
            </div>
            {isHovered && canScrollPrev && (
               <div className="embla__btn embla__prev" onClick={onScrollPrev} aria-label="Previous">
                  <svg viewBox="0 0 16 16" role="img" aria-hidden="true">
                     <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0"></path>
                  </svg>
               </div>
            )}
            {isHovered && canScrollNext && (
               <div className="embla__btn embla__next" onClick={onScrollNext} aria-label="Next">
                  <svg viewBox="0 0 16 16" role="img" aria-hidden="true">
                     <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0"></path>
                  </svg>
               </div>
            )}
         </div>
      </section>
   );
}
