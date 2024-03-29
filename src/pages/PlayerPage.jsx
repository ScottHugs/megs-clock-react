import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import JoinSession from '../JoinSession'
import TimerDisplay from '../TimerDisplay'
import './PlayerPage.css'


export default function PlayerPage({ socket }) {

  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [sessionKey, setSessionKey] = useState('')
  const [isInSession, setIsInSession] = useState(false)
  const [isRoundInProgress, setIsRoundInProgress] = useState(false)
  const [isEndOfRound, setIsEndOfRound] = useState(false)

  const [time, setTime] = useState(0);
  const [sessionName, setSessionName] = useState('')
  const [currentRound, setCurrentRound] = useState(0)

  const navigate = useNavigate()


  useEffect(() => {
    if (!isFirstLoad) {
      socket.emit('join_room', sessionKey)
      setIsInSession(true)
    } else {
      setIsFirstLoad(false)
    }
  }, [sessionKey])

  useEffect(() => {
    socket.on('recieve_time', (data) => {
      setTime(data)
      if (data === 0){
        setIsEndOfRound(true)
      }
    })

    socket.on('set_session_name', (sessionName) => {
      setSessionName(sessionName)
    })

    socket.on('set_round', (round) => {
      setCurrentRound(round)
      setIsEndOfRound(false)
    })

    socket.on('is_round_in_progress', (bool) =>{
      setIsRoundInProgress(bool)
    })

    socket.on('session_ended', (sessionName) => {
      navigate(`/session_ended/${sessionName}`)
    })
  }, [socket])

  let isRoundsDisplayed = currentRound > 0

  let roundStartDisplayMessage = isInSession && !isRoundInProgress 
  ? "will begin shortly."
  : ""

  return (
    <section className='player-page'>
      <nav className='home-nav'>
        <Link to='/'>Home</Link>
      </nav>

      <div className='session-title-area'>
        { isInSession&&
            <h2 className='session-name'>{sessionName}</h2>
        }
      </div>

      <div className='player-timer'>
        { isEndOfRound&&
          <h2 className="end-of-round-message">THAT'S TIME!</h2>  
        }

        { !isInSession
          ?< JoinSession setSessionKey={setSessionKey}/> 
          :< TimerDisplay remainingMilliseconds={time}/> 
        }

        { isRoundsDisplayed&&
          <h3>Round {currentRound} {roundStartDisplayMessage}</h3>
        }
      </div>
    
    </section>
  )
}