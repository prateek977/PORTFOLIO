import React, { useEffect, useState, useRef } from 'react';

const GLYPHS = '0123456789ABCDEF!@#$%&*<>[]{}';

export const TextScramble = ({ text, className = '', as = 'span', trigger = true }) => {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      iteration += 1 / 2;

      if (iteration >= maxIterations) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [text, trigger]);

  const Tag = as;
  return (
    <Tag ref={elementRef} className={`junca-scramble ${className}`}>
      {displayText}
    </Tag>
  );
};

export default TextScramble;
