import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const InfiniteTextRotation = () => {
  const controls = useAnimation();
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;
    const width = textRef.current.offsetWidth;

    const start = () => {
      controls.start({
        x: ['0px', `-${width}px`],
        transition: {
          duration: 14,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
      });
    };

    start();

    const handleResize = () => { controls.stop(); start(); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [controls]);

  const text = 'JATIN DAHIYA — ';

  return (
    <div
      className="movediv"
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
        position: 'absolute',
        bottom: '80px',
        left: 0,
        zIndex: 5,
      }}
    >
      <motion.div style={{ display: 'inline-block' }} animate={controls}>
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="move"
            ref={i === 0 ? textRef : undefined}
            style={{ display: 'inline-block' }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteTextRotation;
