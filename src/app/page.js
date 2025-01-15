import React from "react";
import ReelList from "../components/ReelList";

export default function Home() {
  const reels = [
    {
      videoSrc: "/reel1.mp4",
      placeholderText: "This is Reel 1!",
    },
    {
      videoSrc: "/reel1.mp4",
      placeholderText: "This is Reel 2!",
    },
    {
      videoSrc: "/reel1.mp4",
      placeholderText: "This is Reel 3!",
    },
  ];

  return (
    <div>
      <ReelList reels={reels} />
    </div>
  );
}
