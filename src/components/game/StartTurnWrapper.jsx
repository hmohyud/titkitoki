"use client";

import { fetchMapping } from "@/scripts/game/keymappings";
import React, { useEffect, useRef, useState } from "react";

const StartTurnWrapper = ({ initialSeq }) => {
  const wrapperRef = useRef(null); // Ref to the wrapper element

  const [initEmoji, setInitEmoji] = useState("");

  useEffect(() => {
    const mapping = fetchMapping();
    setInitEmoji(mapping[initialSeq]);
  }, [initialSeq]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-[500px] h-[92%] flex flex-col bg-purple-500 text-white rounded-lg py-8"
    >
      {/* Header */}
      <div className="wrapper-header text-center">
        <h1 className="text-3xl font-bold sequence-title">
          Remember this symbol
        </h1>
        <p className="text-md sequence-instructions">
          This is your starting symbol
        </p>
      </div>

      {/* Sequence Area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex sequence-boxes mt-4 text-4xl font-bold">
          {initEmoji}
          {/* This container will hold dynamically added symbol boxes */}
        </div>
      </div>

      {/* Footer */}
      <div className="footer text-center">
        <p className="text-md restart-instruction">To continue, press SPACE</p>
      </div>
    </div>
  );
};

export default StartTurnWrapper;
