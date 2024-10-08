import { useEffect, useState } from 'react'
import './App.css'
import AudioPlayer from './components/AudioPlayer'
import UploadAudio from './components/UploadAudio'

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
    <h1>hello world</h1>

<UploadAudio />
    {
      url && <AudioPlayer url={url} />
    }

      {
        count?.map((item, index) => {
          return <div key={index}>
            <div onClick={() => setUrl(item.url)}>{index + 1}-- {item._id}</div>
          </div>
        })
      }



    </>
  )
}

export default App;
