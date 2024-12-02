"use client";

import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

const VideoWrapper = ({ videoId, onRemove }) => {
  const wrapperRef = useRef(null); // Ref to the wrapper element
  const playerRef = useRef(null); // Ref to the YouTube Player instance
  const [player, setPlayer] = useState(null); // State to hold the YouTube Player instance
  const [isVisible, setIsVisible] = useState(false); // Track visibility of the wrapper

  // Initialize the YouTube Player API
  const initializePlayer = () => {
    if (!videoId || !playerRef.current) return;

    const playerInstance = new window.YT.Player(playerRef.current, {
      videoId: videoId,
      events: {
        onReady: () => {
          setPlayer(playerInstance); // Save the player instance
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            console.log("Video ended");
          }
        },
      },
      playerVars: {
        autoplay: 1,
        controls: 0,
        mute: 0,
      },
    });
  };

  // Load the YouTube IFrame Player API
  useEffect(() => {
    if (!videoId) return;

    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }

    return () => {
      if (player) player.destroy(); // Clean up the player instance
    };
  }, [videoId]);

  // Observer to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        if (entry.isIntersecting) {
          player?.playVideo(); // Play the video when visible
        } else {
          player?.pauseVideo(); // Pause the video when out of view
          if (onRemove) {
            onRemove(); // Trigger the removal callback
          }
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of the wrapper is visible
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
    };
  }, [player]);

  return (
    <div ref={wrapperRef} className="relative w-[500px] h-[92%] flex">
      <div className="w-full h-full bg-black text-white rounded-lg ">
        {/* YT Player will go into here when the video is loaded */}
        <div ref={playerRef} className="w-full h-full" />
      </div>
      <div className="absolute w-12 h-[16rem] bottom-0 -right-20">
        <div className="w-full h-full flex flex-col justify-between">
          {/* ICONS */}
          <div className="w-12 h-14 flex flex-col justify-center items-center">
            <Image
              className="dark:invert"
              src="/heart.svg"
              alt="Like"
              width={30}
              height={30}
              priority
            />
            <p>24K</p>
          </div>
          <div className="w-12 h-14 flex flex-col justify-center items-center">
            <Image
              className="dark:invert"
              src="/message-circle.svg"
              alt="Comment"
              width={30}
              height={30}
              priority
            />
            <p>80</p>
          </div>
          <div className="w-12 h-14 flex flex-col justify-center items-center">
            <Image
              className="dark:invert"
              src="/send.svg"
              alt="Share video"
              width={30}
              height={30}
              priority
            />
          </div>
          <div className="w-12 h-14 flex flex-col justify-center items-center">
            <Image
              className="dark:invert"
              src="/more-horizontal.svg"
              alt="More"
              width={30}
              height={30}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoWrapper;
