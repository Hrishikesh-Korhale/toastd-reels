"use client";
import React, { useRef, useEffect, useState } from "react";
import { IconButton, Typography, Snackbar, Alert } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import CommentBox from "./CommentBox";

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
};

const Reel = ({ videoSrc, placeholderText, isActive }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

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
    const dummyLink = "https://dummy.link/to/reel";
    navigator.clipboard.writeText(dummyLink).then(() => {
      setToastOpen(true);
    });
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  return (
    <div style={styles.reel}>
      <video
        ref={videoRef}
        src={videoSrc}
        style={styles.video}
        loop
        muted
        onClick={handlePlayPause}
      />
      <div style={styles.overlay}>
        <div style={styles.rightControls}>
          <IconButton
            style={styles.iconButton}
            onClick={handleLike}
          >
            <FavoriteIcon
              style={{
                ...styles.icon,
                color: isLiked ? "red" : "white",
              }}
            />
          </IconButton>
          <IconButton
            style={styles.iconButton}
            onClick={toggleComments}
          >
            <CommentIcon style={styles.icon} />
          </IconButton>
          <IconButton
            style={styles.iconButton}
            onClick={handleShare}
          >
            <ShareIcon style={styles.icon} />
          </IconButton>
        </div>
        <div style={styles.footer}>
          <Typography variant="body1" style={styles.text}>
            {placeholderText}
          </Typography>
        </div>
      </div>
      <CommentBox
        comments={comments}
        onAddComment={handleAddComment}
        onClose={() => setShowComments(false)}
        isVisible={showComments}
      />
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleToastClose} severity="success" sx={{ width: "100%" }}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Reel;
