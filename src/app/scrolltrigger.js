import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const InfiniteTextRotation = () => {
  const controls = useAnimation();
  const textRef = useRef(null);
  const cloneRef = useRef(null);

  useEffect(() => {
    const textWidth = textRef.current.offsetWidth;
    const cloneWidth = cloneRef.current.offsetWidth;

    controls.start({
      x: ['0%', `-${textWidth}px`],
      transition: {
        duration: 10,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });

    window.addEventListener('resize', () => {
      controls.stop();
      controls.start({
        x: ['0%', `-${textWidth}px`],
        transition: {
          duration: 10,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
      });
    });

    return () => window.removeEventListener('resize', () => {});
  }, [controls]);

  return (
    <div className='movediv' style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', position: 'relative' }}>
      <motion.div
        style={{ display: 'inline-block' }}
        animate={controls}
      >
        <span className='move' ref={textRef} style={{ display: 'inline-block' }}>
          JATIN DAHIYA -
        </span>
        <span className='move' ref={cloneRef} style={{ display: 'inline-block' }}>
        JATIN DAHIYA -
        </span>
        <span className='move' ref={cloneRef} style={{ display: 'inline-block' }}>
        JATIN DAHIYA -
        </span>
        <span className='move' ref={cloneRef} style={{ display: 'inline-block' }}>
        JATIN DAHIYA -
        </span>
      </motion.div>
    </div>
  );
};

export default InfiniteTextRotation;
