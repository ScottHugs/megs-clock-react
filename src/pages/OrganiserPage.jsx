import { useEffect, useState } from "react"
import { Link, useNavigate} from 'react-router-dom'
import TimerDisplay from '../TimerDisplay'
import SetupOptions from "../SetupOptions"
import OrganiserMenu from "../OrganiserMenu"
import './OrganiserPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const menuIcon = <FontAwesomeIcon icon={faBars} />

export default function App({ socket }) {

  const [setupOptions, setSetupOptions] = useState({
    name: "",
    key: "",
    time: 0,
    rounds: 0
  })
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [isHostingSession, setIsHostingSession] = useState(false)
  const [isRoundInProgress, setIsRoundInProgress] = useState(false)
  const [isEndOfRound, setIsEndOfRound] = useState(false)
  const [isMenuOn, setIsMenuOn] = useState(false)

  const [time, setTime] = useState(setupOptions.time);
  const [currentRound, setCurrentRound] = useState(1)

  const navigate = useNavigate()

  useEffect(() => {

    socket.on('recieve_time', (data) => {
      setTime(data)
      if (data === 0) {
        setIsEndOfRound(true)
      }
    })

    socket.on('is_round_in_progress', (bool) => {
      setIsRoundInProgress(bool)
    })

    socket.on('set_round', (round) => {
      setCurrentRound(round)
    })

    socket.on('session_ended', (sessionName) => {
      navigate(`/session_ended/${sessionName}`)
    })

  }, [socket])

  useEffect(() => {
    if (!isFirstLoad) {
      console.log(setupOptions)
      setIsHostingSession(true)
      socket.emit("setup_options", setupOptions)
    } else {
      setIsFirstLoad(false)
    }
  },[setupOptions])

  function startRound(){
      socket.emit('start_timer', setupOptions.key)
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
    setIsEndOfRound (false)
  }

  function timerToZero() {
    setTime(0)
    socket.emit('update_time', 0, setupOptions.key)
  }

  function handleMenuOn() {
    setIsMenuOn(!isMenuOn)
  }

  function handleNextRound() {
    socket.emit('next_round', setupOptions.key)
    setIsEndOfRound(false)
  }

  function handleEndSession() {
    socket.emit('end_session', setupOptions.key)
  }

  let isRoundsDisplayed = setupOptions.rounds > 1

  let roundStartDisplayMessage = isHostingSession && !isRoundInProgress 
    ? "will begin shortly."
    : ""

  let isFinished = isEndOfRound && (currentRound == setupOptions.rounds)

  let classNameNoRounds = isRoundsDisplayed ? "" : "bottom-margin"

  return (
    <section className="organiser-page">
      <nav className='home-nav'>
        <Link to='/'>Home</Link>
      </nav>

      { isHostingSession && 
        <section className="session-title-area">
          <h2 className="session-name">{setupOptions.name}</h2>
          <h4 className="session-key">Session Key: {setupOptions.key}</h4>
        </section> 
      }


      <div className={`time-round-wrapper ${classNameNoRounds}`}>
        { isEndOfRound&&
          <h2 className="end-of-round-message">THAT'S TIME!</h2>  
        }
        { isHostingSession 
            ? <TimerDisplay remainingMilliseconds={time}/>
            : <SetupOptions setSetupOptions={setSetupOptions} />
        }

        { isRoundsDisplayed &&
          <h3 className="round">Round {currentRound} {roundStartDisplayMessage}</h3>
        }
      </div>
      
      <div className="buttons">

        { !isRoundInProgress && isHostingSession &&
          <button className="start-round-btn" onClick={startRound}>Start Round</button> 
        }

        { isEndOfRound&&!isFinished&&
          <button className="end-of-round-btn" onClick={handleNextRound}>Next Round</button> 
        }

        { isFinished&&
          <button className="end-of-round-btn" onClick={handleEndSession}>End Session</button>
        }

        <div className="menus">
          { isMenuOn&&
            <div className="organiser-menu">
              <OrganiserMenu 
                stopTimer={stopTimer} 
                startNewTimer={startNewTimer} 
                restartTime={restartTime} 
                timerToZero={timerToZero}
                setIsEndOfRound={setIsEndOfRound}
                />
            </div>
          }
          { isHostingSession &&
            <button className='menu-btn' onClick={handleMenuOn}>{menuIcon}</button>
          }
        </div>
      </div>


    </section> 

    

  )
}