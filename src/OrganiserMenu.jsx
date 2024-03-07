import { useState } from "react"

export default function OrganiserMenu ({ stopTimer, startNewTimer, restartTime, timerToZero, setIsEndOfRound }) {

  const [isStopped, setIsStopped] = useState(false)

  let stopButtonWord = (isStopped) ? 'Start' : 'Stop'

  // RESTART HERE ****** CHECK THE TOGGLE ON PAUSE TO MAKE IT PAUSE AND PLAY PROPERLY 
  function handleStop () {
    
    if(!isStopped){ // it's the reverse as I have toggle isStopped after... stupid
      stopTimer()
    } else {
      startNewTimer()
    }
    setIsStopped(!isStopped)

  }

  function handleReset () {
    if(!isStopped){
      stopTimer()
      setIsStopped(!isStopped)
      restartTime()
    } else {
      restartTime()
    }
  }

  function handleEnd() {
    stopTimer()
    timerToZero()
    setIsEndOfRound(true)
  }

  return(
    <section className="organiser-menu">
      <button onClick={handleStop}>{stopButtonWord}</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleEnd}>End</button>
    </section>
  )
}