import { Link } from 'react-router-dom'

export default function HomePage(){

  return (
    <section className="HomePage">
      <h3> Welcome To </h3>
      <h1> Megs Clock </h1>
      <Link to='/player'><button>Join Session</button></Link>
      <Link to='/organiser'><button>Start Session</button></Link>
    </section>
  )
}