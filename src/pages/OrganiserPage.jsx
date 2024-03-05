import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import TimerDisplay from '../TimerDisplay'
import io from 'socket.io-client'
import SetupOptions from "../SetupOptions"

const socket=io.connect('http://localhost:3365')

export default function App() {

  const [setupOptions, setSetupOptions] = useState({
    name: "",
    key: "",
    time: 0
  })
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [isHostingSession, setIsHostingSession] = useState(false)
  const [isRoundInProgress, setIsRoundInProgress] = useState(false)

  const [time, setTime] = useState(setupOptions.time);

  useEffect(() => {
    socket.on('recieve_time', (data) => {
      setTime(data)
    })
  }, [socket])

  useEffect(() => {
    if (!isFirstLoad) {
      console.log(setupOptions)
      setIsHostingSession(true)
      // socket.emit("join_room", setupOptions.key)
      socket.emit("setup_options", setupOptions)
    } else {
      setIsFirstLoad(false)
    }
  },[setupOptions])

  function startRound(){
      socket.emit('start_timer', setupOptions.key)
      setIsRoundInProgress(true)
  }


  return (
    <section className="app">
      <nav className='home-nav'>
        <Link to='/'>Home</Link>
      </nav>

      { isHostingSession 
          ? <TimerDisplay remainingMilliseconds={time}/>
          : <SetupOptions setSetupOptions={setSetupOptions}/>
      }
      
      { !isRoundInProgress && isHostingSession &&
        <button onClick={startRound}>Start Round</button> 
      }
    </section> 

    

  )
}