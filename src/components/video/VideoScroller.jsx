"use client";
import React, { useRef, useState, useEffect } from "react";
import VideoWrapper from "./VideoWrapper"; // Import your VideoWrapper component
import sharedMakeyMakeyHandler from "@/scripts/makeymakeyHandler.js";
import GameTurnWrapper from "../game/GameTurnWrapper";

import loadVideoIds from "@/scripts/loadVideos.js";
import { shuffle } from "@/scripts/utils/array";
import { useGameTurn } from "../game/logic/GameProvider";

const VideoScroller = () => {
  const [components, setComponents] = useState([]); // List of video components
  const scrollerRef = useRef(null); // Reference to the scroller container
  const [pressCount, setPressCount] = useState(0); // Counts number of times spacebar was pressed
  const [YTIds, setYTIds] = useState({ ids: [] }); // Dynamically retrieve YouTube video IDs

  const { isTimeToPlay, setIsTimeToPlay, hasWonRound, setHasWonRound } =
    useGameTurn();

  const addVideo = (count) => {
    setComponents((prev) => [
      ...prev,
      <VideoWrapper
        videoId={YTIds.ids[(count / 2) % YTIds.ids.length]}
        key={prev.length}
      />,
    ]);

    // Scroll to the new VideoWrapper after it's added
    setTimeout(() => {
      const scroller = scrollerRef.current;
      const videoElements = scroller.querySelectorAll(".video-wrapper");
      if (videoElements.length > 0) {
        const lastVideo = videoElements[videoElements.length - 1];
        lastVideo.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const addGameTurn = () => {
    setComponents((prev) => [...prev, <GameTurnWrapper key={prev.length} />]);

    // Scroll to the new GameTurnWrapper after it's added
    setTimeout(() => {
      const scroller = scrollerRef.current;
      const gameElements = scroller.querySelectorAll(".game-wrapper");
      if (gameElements.length > 0) {
        const lastGame = gameElements[gameElements.length - 1];
        lastGame.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const addComponent = () => {
    setPressCount((prev) => {
      if (prev % 2 === 0) {
        addVideo(prev);
      } else {
        addGameTurn();
      }
      return prev + 1;
    });
  };

  const reactToSpace = () => {
    // Always reference the up-to-date value of `hasWonRound` via the ref
    let press;
    setPressCount((prev) => {
      press = prev;
      return prev;
    });

    if (press % 2 !== 0) {
      setIsTimeToPlay(true); // Activate game logic
    } else {
      // Placeholder for additional logic for video
    }

    addComponent();
  };

  // Register spacebar action with MakeyMakey
  useEffect(() => {
    sharedMakeyMakeyHandler.addFunction(" ", reactToSpace);

    // Load YouTube video IDs
    loadVideoIds("/data.json").then((videoIds) => {
      console.log("Loaded:", videoIds);

      shuffle(videoIds);

      setYTIds((prev) => {
        prev.ids = [...videoIds];
        return prev;
      });
    });

    return () => {
      sharedMakeyMakeyHandler.removeFunction(" ", reactToSpace);
    };
  }, []);

  return (
    <div
      ref={scrollerRef}
      className="h-full w-full overflow-hidden flex flex-col items-center justify-start"
    >
      {components.map((component, index) => (
        <div
          key={index}
          className="video-wrapper h-screen w-full flex justify-center items-center"
        >
          {component}
        </div>
      ))}
    </div>
  );
};

export default VideoScroller;
