"use client";
import React, { useRef, useState, useEffect } from "react";
import VideoWrapper from "./VideoWrapper"; // Import your VideoWrapper component
import sharedMakeyMakeyHandler from "../../scripts/makeymakeyHandler.js";
import GameTurnWrapper from "../game/GameTurnWrapper";

import loadVideoIds from "../../scripts/loadVideos.js";
import { shuffle } from "@/scripts/utils/array";
import { useGameTurn } from "../game/logic/GameProvider";

const VideoScroller = () => {
  const [components, setComponents] = useState([]); // List of video URLs
  const scrollerRef = useRef(null); // Reference to the scroller container
  const [pressCount, setPressCount] = useState(0); // Counts number of times spacebar was pressed
  const [YTIds, setYTIds] = useState({ ids: [] }); // We dynamically retrieve the ids of videos to show

  const { isTimeToPlay, setIsTimeToPlay } = useGameTurn();

  const addVideo = (count) => {
    setComponents((prev) => {
      return [
        ...prev,
        <VideoWrapper
          videoId={YTIds.ids[(count / 2) % YTIds.ids.length]}
          key={prev.length}
        />,
      ];
    });

    // Scroll to the new VideoWrapper after it's added
    setTimeout(() => {
      const scroller = scrollerRef.current;
      const videoElements = scroller.querySelectorAll(".video-wrapper");
      if (videoElements.length > 0) {
        const lastVideo = videoElements[videoElements.length - 1];
        lastVideo.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Delay to ensure the DOM is updated
  };

  const addGameTurn = () => {
    setComponents((prev) => [...prev, <GameTurnWrapper key={prev.length} />]);

    // Scroll to the new VideoWrapper after it's added
    setTimeout(() => {
      const scroller = scrollerRef.current;
      const videoElements = scroller.querySelectorAll(".video-wrapper");
      if (videoElements.length > 0) {
        const lastVideo = videoElements[videoElements.length - 1];
        lastVideo.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Delay to ensure the DOM is updated
  };

  const addComponent = () => {
    setPressCount((prev) => {
      // FIXME: I cannot come up with a way for the videos to not get added twice to the scroll, as the hook is triggered twice
      if (prev % 2 == 0) {
        // Need to display the video, but only if the user has entered the sequence of characters correctly
        addVideo(prev);
      } else {
        addGameTurn();
      }
      return prev + 1;
    });
  };

  // THIS IS the all encapsulating function that is used to describe all actions that
  // happen when you press SPACE
  const reactToSpace = () => {
    // Get the current count
    // We use this wierd way because reactToSpace is referenced by a non React object

    let press;
    setPressCount((prev) => {
      press = prev;
      return prev;
    });

    if (press === 0) {
      addComponent();
      return;
    }

    const isDisplayVideo = press % 2 != 0;
    if (isDisplayVideo) {
      setIsTimeToPlay(true); // It is time to activate game logic
      addComponent();
    } else {
      // TODO: Implement this piece of logic
      let notDisplayNextVideo;
      setIsTimeToPlay((prev) => {
        notDisplayNextVideo = prev;
        return prev;
      });

      if (!notDisplayNextVideo) {
        addComponent();
      }
    }
  };

  // Registers the action for MakeyMakey
  useEffect(() => {
    // Register the spacebar action with the MakeyMakeyHandler
    sharedMakeyMakeyHandler.addFunction(" ", reactToSpace);

    setComponents((prev) => [
      ...prev,
      <GameTurnWrapper key={prev.length} initialSeq="g"/>,
    ]);

    // Loads the videos Ids
    loadVideoIds("/data.json").then((videoIds) => {
      console.log("Loaded:", videoIds);

      // Randomize the order of the videos
      shuffle(videoIds);

      setYTIds((prev) => {
        prev.ids = [...videoIds];
        return prev;
      });
    });

    // Cleanup on component unmount
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
