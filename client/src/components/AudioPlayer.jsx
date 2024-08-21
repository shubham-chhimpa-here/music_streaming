import React, { useRef } from 'react';

const AudioPlayer = ({songs}) => {
  const audioRefs = useRef([]);

  const audioSources = songs;
  

  const handlePlay = (index) => {
    audioRefs.current.forEach((audio, i) => {
      if (i !== index && audio) {
        audio.pause();
      }
    });
  };

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    }}>
      {audioSources?.map((audio, index) => (
        <audio
          key={audio._id}
          ref={(el) => (audioRefs.current[index] = el)}
          controls
          onPlay={() => handlePlay(index)}
        >
          <source src={audio.url} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      ))}
    </div>
  );
};

export default AudioPlayer;
