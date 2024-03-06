import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import TimerDisplay from '../TimerDisplay'
import SetupOptions from "../SetupOptions"
import OrganiserMenu from "../OrganiserMenu"

export default function App({ socket }) {

  const [setupOptions, setSetupOptions] = useState({
    name: "",
    key: "",
    time: 0
  })
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [isHostingSession, setIsHostingSession] = useState(false)
  const [isRoundInProgress, setIsRoundInProgress] = useState(false)
  const [isMenuOn, setIsMenuOn] = useState(false)

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

  function startNewTimer() {
    socket.emit('start_new_timer', time, setupOptions.key)
  }

  function stopTimer(){
    socket.emit('stop_timer')
  }

  function restartTime() {
    setTime(setupOptions.time)
    socket.emit('update_time', setupOptions.time, setupOptions.key)
  }

  function timerToZero() {
    setTime(0)
    socket.emit('update_time', 0, setupOptions.key)
  }

  function handleMenuOn() {
    setIsMenuOn(!isMenuOn)
  }


  return (
    <section className="app">
      <nav className='home-nav'>
        <Link to='/'>Home</Link>
      </nav>

      { isHostingSession && 
        <h2>{setupOptions.name}</h2>
      }

      { isHostingSession 
          ? <TimerDisplay remainingMilliseconds={time}/>
          : <SetupOptions setSetupOptions={setSetupOptions} />
      }
      
      { !isRoundInProgress && isHostingSession &&
        <button onClick={startRound}>Start Round</button> 
      }

      { isRoundInProgress && isHostingSession &&
        <button onClick={handleMenuOn}>Menu</button>
      }

      { isMenuOn&&
      <OrganiserMenu 
        stopTimer={stopTimer} 
        startNewTimer={startNewTimer} 
        restartTime={restartTime} 
        timerToZero={timerToZero}
      />
      }
    </section> 

    

  )
}