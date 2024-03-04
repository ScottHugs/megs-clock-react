import { useEffect, useState } from "react"
import './App.css'
import TimerDisplay from './Timer'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3365')

function App() {

  const [time, setTime] = useState(0);

  const [timer, setTimer] = useState(0)

  useEffect(() => {
    socket.on('recieve_time', (data) => {
      setTime(data)
    })
  }, [socket])

  // useEffect(() => {
  //   if (time !== 0) {
  //     setTimeout(() => {
  //       setTime(time - 1000); 
  //     }, 1000)
  //   }
  // }, [time])

  function startTimer(){
    socket.emit('start_timer', 20000)
  } 

  return (
    <section className="app">
      {/* <TimerDisplay remainingMilliseconds={time}/> */}
      <TimerDisplay remainingMilliseconds={time}/>
      <button onClick={startTimer}>start timer</button>
    </section>

  )
}

export default App
