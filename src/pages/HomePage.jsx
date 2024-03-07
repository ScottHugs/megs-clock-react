import { Link } from 'react-router-dom'
import './HomePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

const clockIcon = <FontAwesomeIcon className='clock-symbol' icon={faClock} fontSize="0.56em"/>

export default function HomePage(){

  return (
    <section className="home-page">
      
      <h1> Megs' Cl{clockIcon}ck </h1>

      <div className='home-buttons'>
        <Link to='/organiser'><button>Start Session</button></Link>
        <Link to='/player'><button>Join Session</button></Link>
      </div>
    </section>
  )
}