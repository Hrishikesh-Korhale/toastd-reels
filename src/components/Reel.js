"use client";
import React, { useRef, useState, useEffect } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import CommentBox from "./CommentBox";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const styles = {
  reel: {
    position: "relative",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    height: "100%",
    objectFit: "cover",
    cursor: "pointer",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 2,
    pointerEvents: "none",
  },
  rightControls: {
    position: "absolute",
    top: "50%",
    right: "20px",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    pointerEvents: "auto",
  },
  iconButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    borderRadius: "50%",
    padding: "10px",
  },
  icon: {
    fontSize: "28px",
  },
  footer: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    color: "white",
    pointerEvents: "auto",
  },
  text: {
    fontSize: "16px",
    fontWeight: "400",
  },
  playPauseButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "50%",
    padding: "15px",
    zIndex: 3,
  },
  muteButton: {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "50%",
    padding: "10px",
    zIndex: 3,
  },
  visitButton: {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px 20px",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    zIndex: 3,
    transition: "background-color 0.3s ease",
  },
  visitButtonHover: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
};

const Reel = ({ videoSrc, placeholderText, isActive, resetVideo }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play(); // Play the video if it's active
      setIsPlaying(true);

      if (resetVideo) {
        // Reset the video to start from the beginning
        videoRef.current.currentTime = 0;
      }
    } else {
      videoRef.current?.pause(); // Pause the video if it's not active
      setIsPlaying(false);
    }
  }, [isActive, resetVideo]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
  };

  const handleShare = () => {
    const dummyLink = "https://toastd-reels-sandy.vercel.app/";
    navigator.clipboard.writeText(dummyLink).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleMuteUnmute = () => {
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
  };

  return (
    <div style={styles.reel}>
      <video
        ref={videoRef}
        src={videoSrc}
        style={styles.video}
        loop
        muted={isMuted}
        onClick={handlePlayPause}
      />
      <div style={styles.overlay}>
        <div style={styles.rightControls}>
          <IconButton style={styles.iconButton} onClick={handleLike}>
            <FavoriteIcon
              style={{
                ...styles.icon,
                color: isLiked ? "red" : "white",
              }}
            />
          </IconButton>
          <IconButton style={styles.iconButton} onClick={toggleComments}>
            <CommentIcon style={styles.icon} />
          </IconButton>
          <IconButton style={styles.iconButton} onClick={handleShare}>
            <ShareIcon style={styles.icon} />
          </IconButton>
        </div>
      </div>

      {/* Play/Pause button centered */}
      <div
        style={isPlaying ? null : styles.playPauseButton}
        onClick={handlePlayPause}
      >
        {!isPlaying && <PlayArrowIcon style={styles.icon} />}
      </div>

      {/* Mute/Unmute button at the bottom-right */}
      <div style={styles.muteButton} onClick={handleMuteUnmute}>
        {isMuted ? (
          <VolumeOffIcon style={styles.icon} />
        ) : (
          <VolumeUpIcon style={styles.icon} />
        )}
      </div>

      {/* Visit Product Page Button */}
      <div
        style={{
          ...styles.visitButton,
          ...(isHovered ? styles.visitButtonHover : {}),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a
          href="https://www.toastd.in/product/kapiva-himalayan-shilajit-resin-20g"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white", textDecoration: "none" }}
        >
          <Button variant="contained">Visit Product Page</Button>
        </a>
      </div>

      <CommentBox
        comments={comments}
        onAddComment={handleAddComment}
        onClose={() => setShowComments(false)}
        isVisible={showComments}
      />
    </div>
  );
};

export default Reel;
