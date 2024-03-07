import { Link, useParams } from 'react-router-dom'

export default function SessionEnded() {

  const { sessionName } = useParams()

  return(
    <section className="session-ended">
       <nav className='home-nav'>
        <Link to='/'>Home</Link>
      </nav>

      <h2>{sessionName} has ended.</h2>
      <Link to='/'><button>home</button></Link>
      
    </section>
  )
}