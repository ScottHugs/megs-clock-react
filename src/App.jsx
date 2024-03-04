import { useEffect, useState } from "react"
import './App.css'
import TimerDisplay from './Timer'

function App() {

  const [time, setTime] = useState(15*1000);

  useEffect(() => {
    if (time !== 0) {
      setTimeout(() => {
        setTime(time - 1000); 
      }, 1000)
    }
  }, [time])

  return (
    <TimerDisplay remainingMilliseconds={time}/>
  )
}

export default App
