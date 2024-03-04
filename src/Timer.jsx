

export default function TimerDisplay( {remainingMilliseconds} ) {

  let totalSeconds = (Math.floor(remainingMilliseconds / 1000))
  let totalMinutes = (Math.floor(totalSeconds / 60))
  let totalHours = (Math.floor(totalMinutes / 60))

  let seconds = String((totalSeconds % 60)).padStart(2, '0')
  let minutes = String((totalMinutes % 60)).padStart(2, '0')
  let hours = String((totalHours % 24)).padStart(2, '0')


  
  return(
    <section className="timer">
      <h1>{hours} : {minutes} : {seconds}</h1>
    </section>
  )
}