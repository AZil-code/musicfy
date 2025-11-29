import { forwardRef } from 'react';

export const PlayButton = forwardRef(function PlayButton(
   {
      isPlaying = false,
      onClick,
      className = '',
      alwaysShow = false,
      ariaLabel,
      size = 24,
      variant,
      style,
      ...rest
   },
   ref
) {
   const classes = ['play-button', variant ? `play-button--${variant}` : '', className].filter(Boolean).join(' ');
   const inlineStyle = alwaysShow ? { display: 'flex', ...style } : style;

   return (
      <button
         ref={ref}
         type="button"
         className={classes}
         onClick={onClick}
         style={inlineStyle}
         aria-label={ariaLabel || (isPlaying ? 'Pause' : 'Play')}
         {...rest}
      >
         <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" height={size} width={size}>
            {isPlaying ? (
               <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7z"></path>
            ) : (
               <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path>
            )}
         </svg>
      </button>
   );
});
