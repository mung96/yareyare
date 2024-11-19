import React, { useEffect, useRef } from 'react';
import './loding.css';

function LoadingComponent() {
  const dot1 = useRef<HTMLDivElement | null>(null);
  const dot2 = useRef<HTMLDivElement | null>(null);
  const dot3 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animateDots = () => {
      const keyframes = [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-20px)' },
        { transform: 'translateY(0)' },
      ];

      const options = {
        duration: 300,
        easing: 'ease-in-out',
      };

      if (dot1.current) {
        dot1.current.animate(keyframes, options);
      }
      setTimeout(() => {
        if (dot2.current) {
          dot2.current.animate(keyframes, options);
        }
      }, 300);
      setTimeout(() => {
        if (dot3.current) {
          dot3.current.animate(keyframes, options);
        }
      }, 600);

      setTimeout(animateDots, 2000);
    };

    animateDots();
  }, []);

  return (
      <div className="container">
        <div className="loadingBox">
          <div ref={dot1} className="dot" />
          <div ref={dot2} className="dot" />
          <div ref={dot3} className="dot" />
        </div>
        <p>잠시만 기다려주세요.</p>
      </div>
  );
}

export default LoadingComponent;
