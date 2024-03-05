import { useState } from 'react'
import { Link } from 'react-router-dom'
import JoinSession from '../JoinSession'

export default function PlayerPage() {

  const [sessionKey, setSessionKey] = useState('')
  const [isInSession, setIsInSession] = useState(false)

  return (
    <section className='player-page'>
      <nav className='home-nav'>
        <Link to='/'>Home</Link>
      </nav>
      
      { !isInSession
        ?< JoinSession setSessionKey={setSessionKey}/> 
        :

      }
    
    </section>
  )
}