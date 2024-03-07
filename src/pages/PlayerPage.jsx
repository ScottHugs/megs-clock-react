import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import JoinSession from '../JoinSession'
import TimerDisplay from '../TimerDisplay'


export default function PlayerPage({ socket }) {

  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [sessionKey, setSessionKey] = useState('')
  const [isInSession, setIsInSession] = useState(false)
  const [isRoundInProgress, setIsRoundInProgress] = useState(false)
  const [isEndOfRound, setIsEndOfRound] = useState(false)

  const [time, setTime] = useState(0);
  const [sessionName, setSessionName] = useState('')
  const [currentRound, setCurrentRound] = useState(0)


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

      { isInSession&&
          <h2>{sessionName}</h2>
      }

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
    
    </section>
  )
}