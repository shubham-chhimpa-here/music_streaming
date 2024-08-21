import React, { useRef, useState } from 'react';

const AudioPlayer = ({ url }) => {
    const [loop, setLoop] = useState(false);
    const [volume , setVolume] = useState(1)
    const audRef = useRef(null)

    const handleChange = (e) => {
        const x = (e.target.value)/ 100;
        setVolume(x)
        audRef.current.volume = x;
    }
  return (
    <div>
      <audio src={url} controls loop={loop} 
      autoPlay
      ref={audRef}
      style={{
        width:"600px"
      }} ></audio>
      <br />
      <button onClick={() => {setLoop(value => !value)}}>{loop ? "loop" : "play loop"}</button>
      <input type="range"  onChange={handleChange} min={0} max={100}  />
    </div>
  );
};

export default AudioPlayer;
