import { useState } from "react"

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
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Enter Session Key:</label>
        <input onChange={handleChange} type="text" />
        <button>Join Session</button>
      </form>
    </section>
  )
}