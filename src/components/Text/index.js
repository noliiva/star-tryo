import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import PlayIcon from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

import './style.scss';
import { ReactComponent as StarWarsLogo } from '../../assets/images/star-wars-logo.svg';

export default ({ children }) => {
  const audioRef = useRef();
  const [audio, setAudio] = useState(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
    audio.play();
  };

  const handleReset = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.muted = false;
    }
    setStarted(false);
  };

  const handleSoundToggle = () => {
    setMuted(!muted);
  };

  useEffect(() => {
    if (audio) {
      audio.muted = muted;
    }
  }, [muted, audio]);

  useEffect(() => {
    const a = audioRef.current;
    if (a) {
      setAudio(a);
      a.addEventListener('ended', () => {
        handleReset();
      });
    }
  }, [audioRef]);

  return (
    <>
      <IconButton color="inherit" onClick={handleStart}>
        <PlayIcon />
      </IconButton>

      <audio preload="auto" ref={audioRef}>
        <source
          src="https://s.cdpn.io/1202/Star_Wars_original_opening_crawl_1977.mp3"
          type="audio/mpeg"
        />
      </audio>

      {started &&
        ReactDOM.createPortal(
          <Crawl onToggleSound={handleSoundToggle} onClose={handleReset} muted={muted}>
            {children}
          </Crawl>,
          document.body
        )}
    </>
  );
};

const Crawl = ({ children, muted, onToggleSound, onClose }) => (
  <article className="starwars">
    <IconButton
      color="inherit"
      onClick={onToggleSound}
      style={{ position: 'absolute', bottom: 0, right: 0 }}
    >
      {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
    </IconButton>

    <IconButton
      color="inherit"
      onClick={onClose}
      style={{ position: 'absolute', top: 0, right: 0 }}
    >
      <CloseIcon />
    </IconButton>

    <div className="animation">
      <section className="intro">
        A long time ago, in a galaxy far,
        <br /> far away....
      </section>

      <section className="titles">
        <div>
          {children.split(/\.\s/).map((e) => (
            <p key={e.replace(/\s/, '').slice(0, 10)}>{e.trim()}.</p>
          ))}
        </div>
      </section>

      <section className="logo">
        <StarWarsLogo />
      </section>
    </div>
  </article>
);
