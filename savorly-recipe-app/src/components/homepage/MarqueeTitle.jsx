import { useRef, useState, useEffect } from "react";
import { Typography } from "@mui/material";

export default function MarqueeTitle({ text, speed = 50 }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const [shouldScroll, setShouldScroll] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [duration, setDuration] = useState(0);
  const pauseAfterScroll = 1000; // 1 second

  useEffect(() => {
    const containerEl = containerRef.current;
    const textEl = textRef.current;
    if (!containerEl || !textEl) return;

    setShouldScroll(false);
    setTranslateX(0);

    const containerWidth = containerEl.getBoundingClientRect().width;
    const textWidth = textEl.getBoundingClientRect().width;

    // Only scroll if text is wider than container by at least 1px
    if (textWidth <= containerWidth + 1) {
      return;
    }

    const distance = textWidth - containerWidth;
    const durationSeconds = distance / speed;
    setDuration(durationSeconds);

    // After a 3s pause, start the scroll
    const startTimeout = setTimeout(() => {
      setShouldScroll(true);
      setTranslateX(-distance);
    }, 4000);

    // When the transition ends, pause for 1s, go back to start of title, then repeat after 3s
    const onTransitionEnd = () => {
      // Jump back
      setTimeout(() => {
        setShouldScroll(false);
        setTranslateX(0);

        // After another 3s pause, scroll again
        setTimeout(() => {
          setShouldScroll(true);
          setTranslateX(-distance);
        }, 4000);
      }, pauseAfterScroll);
    };

    textEl.addEventListener("transitionend", onTransitionEnd);
    return () => {
      clearTimeout(startTimeout);
      textEl.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [text, speed]);

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%", // ensure full width of the parent
      }}
    >
      <Typography
        variant="h6"
        component="span"
        ref={textRef}
        sx={{
          display: "inline-block",
          fontWeight: 700,
          transform: `translateX(${translateX}px)`,
          transition: shouldScroll ? `transform ${duration}s linear` : "none",
        }}
      >
        {text}
      </Typography>
    </div>
  );
}
