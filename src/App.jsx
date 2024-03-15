
import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import OrganiserPage from './pages/OrganiserPage'
import PlayerPage from './pages/PlayerPage'
import io from 'socket.io-client'
import SessionEndedPage from './pages/SessionEndedPage'


const socket=io.connect('/')

function App() {

  return (
    <section className="app">
      
      
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/organiser" element={<OrganiserPage socket={socket}/>} />
          <Route path='/player' element={<PlayerPage socket={socket}/>} />
          <Route path='/session_ended/:sessionName' element={<SessionEndedPage />} />
        </Routes>
    </section>

  )
}

export default App
