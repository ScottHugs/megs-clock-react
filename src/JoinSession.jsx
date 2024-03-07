import { useState } from "react"
import './JoinSession.css'

export default function JoinSession({ setSessionKey }) {

  const [formData, setFormData] = useState('')

  function handleChange(e){
    setFormData(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    setSessionKey(formData)
  }

  return(
    <section className="join-session">
      <form onSubmit={handleSubmit}>
        <div className="join-input">
          <label htmlFor="">Enter Session Key:</label>
          <input onChange={handleChange} type="text" />
        </div>
        <button>Join Session</button>
      </form>
    </section>
  )
}