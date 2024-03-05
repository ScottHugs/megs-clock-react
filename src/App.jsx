
import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import OrganiserPage from './pages/OrganiserPage'
import PlayerPage from './pages/PlayerPage'


function App() {

  return (
    <section className="app">
      

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/organiser" element={<OrganiserPage />} />
          <Route path='/player' element={<PlayerPage />} />
        </Routes>
      </BrowserRouter>
    </section>

  )
}

export default App
