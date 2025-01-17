"use client";
import React, { useState, useEffect } from "react";
import Reel from "./Reel";
import { useInView } from "react-intersection-observer";

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
  const [activeIndex, setActiveIndex] = useState(0); // Track the index of the active reel
  const [isMuted, setIsMuted] = useState(true);

  // Handle when the reel enters or leaves the viewport
  const handleInView = (index, inView) => {
    if (inView) {
      setActiveIndex(index); // Set the active reel when it comes into view
    }
  };

  return (
    <div style={styles.reelList}>
      {reels.map((reel, index) => {
        const { ref, inView } = useInView({
          triggerOnce: false, // Continue checking visibility
          threshold: 0.5, // 50% visibility required for a reel to be considered in view
        });

        // Trigger play/pause when the reel comes into view
        useEffect(() => {
          handleInView(index, inView);
        }, [inView, index]);

        return (
          <div
            key={index}
            style={styles.reelContainer}
            ref={ref} // Attach the intersection observer ref
          >
            <Reel
              videoSrc={reel.videoSrc}
              placeholderText={reel.placeholderText}
              isActive={index === activeIndex} // Only the active reel plays
              resetVideo={index === activeIndex && inView} // Reset the video when it comes into view
              isMuted={isMuted}
              setIsMuted={setIsMuted}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ReelList;
