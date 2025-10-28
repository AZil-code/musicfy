import useEmblaCarousel from 'embla-carousel-react';
import { useSelector } from 'react-redux';
import { StationCard } from './StationCard';
import { useCallback } from 'react';

export function SongSuggestion({ title, station, onPlay }) {
   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center' });
   const stations = useSelector((store) => store.stationModule.stations);

   const onScrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext();
   }, [emblaApi]);
   const onScrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev();
   }, [emblaApi]);

   if (stations.length === 0) return;
   return (
      <section className="song-suggestion">
         <h3>{title}</h3>
         <div className="embla" ref={emblaRef}>
            {/* <div class="embla__viewport"> */}
            <div className="embla__container">
               {stations.map((station) => (
                  <div className="embla__slide">
                     <StationCard station={station} onClickCard={onPlay} />
                  </div>
               ))}
            </div>
            {/* </div> */}
            <button className="embla__prev" onClick={onScrollPrev}>
               Prev
            </button>
            <button className="embla__next" onClick={onScrollNext}>
               Next
            </button>
         </div>
      </section>
   );
}
