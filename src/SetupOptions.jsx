
import { useState } from "react"
import './SetupOptions.css'

export default function SetupOptions({ setSetupOptions }){

  const [inputTime, setInputTime] = useState({
    hr: 0,
    min: 0,
    sec: 0
  })

  const [formData, setFormData] = useState({
    name: "",
    key: "",
    time: 0,
    rounds: 1
  })

  function handleChange(e){
    setFormData({...formData,[e.target.name]: e.target.value})
    console.log(formData)
  }

  function handleTimeChange(e){
    setInputTime({...inputTime, [e.target.name]: e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault()
    setSetupOptions({...formData, time: calculateTime(inputTime)})
  }

  function calculateTime({ hr, min, sec }){
    const hrsToMillisecs = hr * 60 * 60 * 1000
    const minsToMillisecs = min * 60 * 1000
    const secsToMillisecs = sec * 1000
    return hrsToMillisecs + minsToMillisecs + secsToMillisecs
  }


  return(
    <section className="setup-options">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label>Session Name:</label>
          <input 
            name='name' 
            onChange={handleChange} 
            type="text" 
            value={formData.name}
            placeholder="Boss Battle Spectacular"
          />

          <label>Session Key:</label>
          <input 
            name='key' 
            onChange={handleChange} 
            type="text" 
            value={formData.key}
            placeholder="easyMoneySnipers"
          />

          <label>Round Time:</label>
          <div className="time-inputs">
            <input 
              name='hr' 
              className="time-input"
              onChange={handleTimeChange} 
              value={inputTime.hr} 
              type="number" 
              min='0'
              placeholder="00"
            />
            <label className="time-label">hr</label>
            <input 
              name='min' 
              className="time-input"
              onChange={handleTimeChange} 
              value={inputTime.min} 
              type="number" 
              min='0'
              max='59'
              placeholder="00"
            />
            <label className="time-label">min</label>
            <input 
              name='sec' 
              className="time-input"
              onChange={handleTimeChange} 
              value={inputTime.sec} 
              type="number" 
              min='0'
              max='59'
              placeholder="00"
            />
            <label className="time-label">sec</label>
          </div>

          <label>Number of Rounds:</label>
          <input 
            className='rounds-input' 
            name='rounds' 
            onChange={handleChange}
            value={formData.rounds} 
            type="number" 
            min='1'
            placeholder="1"
          />
        </div>
        <button>Create Session</button>
      </form>
    </section>
  )
}