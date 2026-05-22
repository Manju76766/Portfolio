import React, { useState, useEffect, useRef } from 'react';

/**
 * Typewriter component
 * Sequentially types out an array of words/phrases, one after another,
 * with an optional blinking cursor.
 *
 * Props:
 *  - words: string[]         – array of strings to type in sequence
 *  - speed: number           – ms per character (default: 60)
 *  - delayBetweenWords: number – ms to pause before starting the next word (default: 2000)
 *  - cursor: boolean         – show blinking cursor (default: true)
 *  - cursorChar: string      – character used as cursor (default: '|')
 */
export function Typewriter({
  words = [],
  speed = 100,
  delayBetweenWords = 2500,
  cursor = true,
  cursorChar = '|',
}) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [typing, setTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink
  useEffect(() => {
    if (!cursor) return;
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, [cursor]);

  // Typing logic
  useEffect(() => {
    if (currentWordIndex >= words.length) return;

    const word = words[currentWordIndex];

    if (typing) {
      if (currentText.length < word.length) {
        const timeout = setTimeout(() => {
          setCurrentText(word.slice(0, currentText.length + 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing this word — commit it to displayedLines after a pause
        const pause = setTimeout(() => {
          setDisplayedLines((prev) => [...prev, word]);
          setCurrentText('');
          setCurrentWordIndex((i) => i + 1);
        }, delayBetweenWords);
        return () => clearTimeout(pause);
      }
    }
  }, [currentText, currentWordIndex, typing, words, speed, delayBetweenWords]);

  return (
    <span style={{ whiteSpace: 'pre-wrap' }}>
      {displayedLines.map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < displayedLines.length - 1 || currentText ? ' ' : ''}
        </React.Fragment>
      ))}
      {currentText}
      {cursor && (
        <span
          style={{
            opacity: showCursor ? 1 : 0,
            transition: 'opacity 0.1s',
            fontWeight: 300,
          }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}
