
import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import OrganiserPage from './pages/OrganiserPage'
import PlayerPage from './pages/PlayerPage'
import io from 'socket.io-client'


const socket=io.connect('http://localhost:3365')

function App() {

  return (
    <section className="app">
      
      
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/organiser" element={<OrganiserPage socket={socket}/>} />
          <Route path='/player' element={<PlayerPage socket={socket}/>} />
        </Routes>
    </section>

  )
}

export default App
