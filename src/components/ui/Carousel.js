"use client";
import { useEffect, useRef, useState } from "react";

export default function Carousel({
  children,
  interval = 6000,
  startIndex = 0,
  className = ""
}) {
  const slides = Array.isArray(children) ? children : [children];
  const [index, setIndex] = useState(startIndex);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const go = (i) => setIndex((prev) => (i + slides.length) % slides.length);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [paused, index, interval, slides.length]);

  // Touch swipe
  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    touchStartX.current = null;
  };

  return (
    <div
      className={`carousel ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
    >
      <div className="carouselViewport" role="group" aria-live="polite">
        <div
          className="carouselTrack"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              className="carouselSlide"
              key={i}
              aria-hidden={i !== index}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="carouselControls">
        <button className="ctrl" onClick={prev} aria-label="Previous slide">‹</button>
        <button className="ctrl" onClick={next} aria-label="Next slide">›</button>
      </div>

      <div className="dots" role="tablist" aria-label="Slide navigation">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === index}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}
