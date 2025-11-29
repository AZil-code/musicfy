export function ShortenedTxt({ text, numOfCharToDisplay, className = '' }) {

    const textToDisplay = text.length > numOfCharToDisplay ? text.slice(0, numOfCharToDisplay) + '...' : text
    console.log('className: ', className)
    return(
        <p className={className}>{textToDisplay}</p>
    )
}
