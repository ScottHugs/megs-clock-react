import './TimeDisplay.css'

export default function TimerDisplay( {remainingMilliseconds} ) {

  let totalSeconds = (Math.floor(remainingMilliseconds / 1000))
  let totalMinutes = (Math.floor(totalSeconds / 60))
  let totalHours = (Math.floor(totalMinutes / 60))

  let seconds = String((totalSeconds % 60)).padStart(2, '0')
  let minutes = String((totalMinutes % 60)).padStart(2, '0')
  let hours = String((totalHours % 24))

  let isHoursLeft = remainingMilliseconds >= 60 * 60 * 1000
  let isMinutesLeft = remainingMilliseconds >= 60 * 1000
  let isSecondsLeft = remainingMilliseconds > 0

  let classNameRoundEnd = remainingMilliseconds === 0 ? "endColor" : ""
  
  return(
    <section className={`timer ${classNameRoundEnd}`}>
        {isHoursLeft&&
          <p className='roboto-mono-for-numbers'>{hours}:</p>
        }
        <p className='roboto-mono-for-numbers'>{minutes}:{seconds}</p>
    
    </section>
  )
}