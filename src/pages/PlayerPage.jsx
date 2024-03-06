import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import JoinSession from '../JoinSession'
import TimerDisplay from '../TimerDisplay'


export default function PlayerPage({ socket }) {

  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [sessionKey, setSessionKey] = useState('')
  const [isInSession, setIsInSession] = useState(false)

  const [time, setTime] = useState(0);
  const [sessionName, setSessionName] = useState('')


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
    })

    socket.on('set_session_name', (sessionName) => {
      setSessionName(sessionName)
    })
  }, [socket])

  return (
    <section className='player-page'>
      <nav className='home-nav'>
        <Link to='/'>Home</Link>
      </nav>

      { isInSession&&
        <h2>{sessionName}</h2>
      }
      
      { !isInSession
        ?< JoinSession setSessionKey={setSessionKey}/> 
        :< TimerDisplay remainingMilliseconds={time}/>

      }
    
    </section>
  )
}