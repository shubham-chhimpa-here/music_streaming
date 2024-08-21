import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AudioPlayer from './components/AudioPlayer'

function App() {
  const [count, setCount] = useState()
  const [url, setUrl] = useState(null)
  const getData = () => {
    const url = `/audios`
    fetch(url)
      .then(res => res.json())
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
      url && <AudioPlayer url={url} />
    }

      {
        count?.map((item, index) => {
          return <div key={index}>
            <div onClick={() => setUrl(item.url)}> {item._id}</div>
          </div>
        })
      }



    </>
  )
}

export default App
