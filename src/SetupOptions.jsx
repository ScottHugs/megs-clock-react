
import { useState } from "react"

export default function SetupOptions({ setSetupOptions }){

  const [formData, setFormData] = useState({
    name: "",
    key: "",
    time: ""
  })

  function handleChange(e){
    setFormData({...formData,[e.target.name]: e.target.value})
    console.log(formData)
  }

  function handleSubmit(e){
    e.preventDefault()
    setSetupOptions({...formData, time: formData.time*1000})
  }




  return(
    <section className="set-up-options">
      <form onSubmit={handleSubmit}>
        <label>Session Name:</label>
        <input name='name' onChange={handleChange} type="text" value={formData.name}/>
        <label>Session Key:</label>
        <input name='key' onChange={handleChange} type="text" value={formData.key}/>
        <label>Round Time:</label>
        <input name='time' onChange={handleChange} value={formData.time} type="number" />
        <button>Create Session</button>
      </form>
    </section>
  )
}