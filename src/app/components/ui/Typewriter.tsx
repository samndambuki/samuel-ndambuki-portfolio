"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  texts: string[];
  delay?: number;
  infinite?: boolean;
}

export default function Typewriter({
  texts,
  delay = 100,
  infinite = true,
}: TypewriterProps) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentArrayIndex, setCurrentArrayIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentIndex < texts[currentArrayIndex].length && !isDeleting) {
      timeout = setTimeout(() => {
        setCurrentText((prev) => prev + texts[currentArrayIndex][currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
    } else if (isDeleting && currentIndex > 0) {
      timeout = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => prev - 1);
      }, delay / 2);
    } else if (isDeleting && currentIndex === 0) {
      setIsDeleting(false);
      setCurrentArrayIndex((prev) => (prev + 1) % texts.length);
    } else if (
      currentIndex === texts[currentArrayIndex].length &&
      !isDeleting
    ) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, currentArrayIndex, isDeleting, delay, texts]);

  return (
    <span className="inline-block">
      {currentText}
      <span className="ml-1 inline-block w-2 h-8 bg-blue-500 animate-pulse" />
    </span>
  );
}
