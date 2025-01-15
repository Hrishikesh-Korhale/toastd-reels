"use client"
import React, { useState, useEffect } from "react";
import Reel from "./Reel";

const styles = {
  reelList: {
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    height: "100vh",
    scrollSnapType: "y mandatory",
  },
  reelContainer: {
    height: "100vh",
    scrollSnapAlign: "start",
  },
};

const ReelList = ({ reels }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(`[data-reel-index]`);
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={styles.reelList}>
      {reels.map((reel, index) => (
        <div
          key={index}
          style={styles.reelContainer}
          data-reel-index={index} // Data attribute for indexing
        >
          <Reel
            videoSrc={reel.videoSrc}
            placeholderText={reel.placeholderText}
            isActive={index === activeIndex}
          />
        </div>
      ))}
    </div>
  );
};

export default ReelList;
