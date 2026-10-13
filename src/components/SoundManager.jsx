import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const SoundManager = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = React.useRef(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playHoverSound = () => {
    if (!soundEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignore audio error
    }
  };

  const playClickSound = () => {
    if (!soundEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Ignore audio error
    }
  };

  const toggleSound = () => {
    initAudio();
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
  };

  useEffect(() => {
    if (!soundEnabled) return;

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .project-editorial-card');
      if (target) {
        playHoverSound();
      }
    };

    const handleClick = (e) => {
      const target = e.target.closest('a, button, .project-editorial-card');
      if (target) {
        playClickSound();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
    };
  }, [soundEnabled]);

  return (
    <div className="junca-sound-toggle-wrapper">
      <button
        type="button"
        onClick={toggleSound}
        className={`junca-sound-btn ${soundEnabled ? 'is-active' : ''}`}
        aria-pressed={soundEnabled}
        title={soundEnabled ? 'Disable Sound Effects' : 'Enable Sound Effects'}
      >
        <span className="sound-icon-box">
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </span>
        <span className="sound-text">SOUND [{soundEnabled ? 'ON' : 'OFF'}]</span>
      </button>

      <style>{`
        .junca-sound-toggle-wrapper {
          position: fixed;
          bottom: 24px;
          right: 28px;
          z-index: 9999;
        }
        .junca-sound-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(14, 14, 18, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 100px;
          padding: 6px 14px;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.8px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .junca-sound-btn:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(22, 22, 28, 0.9);
          transform: translateY(-2px);
        }
        .junca-sound-btn.is-active {
          color: #ffffff;
          border-color: rgba(237, 51, 39, 0.5);
          background: rgba(237, 51, 39, 0.12);
        }
        .sound-icon-box {
          display: flex;
          align-items: center;
          color: var(--accent-color);
        }
        .sound-text {
          font-weight: 600;
        }
        @media (max-width: 600px) {
          .junca-sound-toggle-wrapper {
            bottom: 16px;
            right: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default SoundManager;
