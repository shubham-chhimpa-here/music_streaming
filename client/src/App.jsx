import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState()
  const getData = () => {
    const url = `http://localhost:8080/audios`
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

    {
    count?.map((item, index) => {
      console.log(item.url)
      return <div>
      <audio controls>
        <source src={item.url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>

    })}

    
     
    </>
  )
}

export default App
