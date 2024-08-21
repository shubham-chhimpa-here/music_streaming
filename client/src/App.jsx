import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AudioPlayer from './components/AudioPlayer'

function App() {
  const [count, setCount] = useState()
  const getData = () => {
    const url = `/audios`
    fetch(url)
    .then(res=> res.json())
    .then(res => {
      setCount(res.x)
    })
  }

  useEffect(() => {
    getData()
   
  }, [])
  return (
    <>

   <AudioPlayer songs = {count}/>

    
     
    </>
  )
}

export default App
