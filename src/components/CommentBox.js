"use client";
import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const styles = {
  commentBoxWrapper: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 10,
    transition: "transform 0.3s ease-in-out",
  },
  commentBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: "10px 10px 0 0",
    padding: "15px",
    boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentInput: {
    display: "flex",
    gap: "10px",
  },
  commentList: {
    maxHeight: "200px",
    overflowY: "auto",
    padding: "10px 0",
  },
  commentItem: {
    padding: "8px",
    borderBottom: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#fff",
    transition: "background-color 0.2s",
  },
  noComments: {
    textAlign: "center",
    color: "#aaa",
    fontStyle: "italic",
  },
};

const CommentBox = ({ comments, onAddComment, onClose, isVisible }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment(""); // Clear the input field
    }
  };

  return (
    <Box
      style={{
        ...styles.commentBoxWrapper,
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
      }}
    >
      <Box style={styles.commentBox}>
        <div style={styles.header}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Comments
          </Typography>
          <IconButton
            aria-label="Close comments"
            onClick={onClose}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </div>

        <div style={styles.commentList}>
          {comments.length ? (
            comments.map((comment, index) => (
              <div
                key={index}
                style={{
                  ...styles.commentItem,
                  ":hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                {comment}
              </div>
            ))
          ) : (
            <Typography style={styles.noComments}>
              No comments yet. Be the first to add one!
            </Typography>
          )}
        </div>

        <div style={styles.commentInput}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            aria-label="New comment"
          />
          <Button
            variant="contained"
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            aria-label="Post comment"
          >
            Post
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default CommentBox;
