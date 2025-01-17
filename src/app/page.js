import React from "react";
import ReelList from "../components/ReelList";

export default function Home() {
  const reels = [
    {
      videoSrc: "/reel1.mp4",
      placeholderText: "This is Reel 1!",
    },
    {
      videoSrc: "/reel2.mp4",
      placeholderText: "This is Reel 2!",
    },
    {
      videoSrc: "/reel3.mp4",
      placeholderText: "This is Reel 3!",
    },
    {
      videoSrc: "/reel1.mp4",
      placeholderText: "This is Reel 4!",
    },
    {
      videoSrc: "/reel2.mp4",
      placeholderText: "This is Reel 5!",
    },
  ];

  return (
    <div>
      <ReelList reels={reels} />
    </div>
  );
}
