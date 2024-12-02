"use client";

import React, { useRef } from "react";

const GameTurnWrapper = () => {
  const wrapperRef = useRef(null); // Ref to the wrapper element

  return (
    <div
      ref={wrapperRef}
      className="relative w-[500px] h-[92%] flex flex-col bg-black text-white rounded-lg turn-wrapper"
    >
      {/* Header */}
      <div className="header text-center mt-4">
        <h1 className="text-xl font-bold sequence-title">
          Recall the sequence
        </h1>
        <p className="text-md sequence-instructions">
          Press symbols in the correct order to clear this level
        </p>
      </div>

      {/* Sequence Area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold current-sequence-title">
          Current Sequence
        </h2>
        <div className="flex sequence-boxes mt-4">
          {/* This container will hold dynamically added symbol boxes */}
        </div>
      </div>

      {/* Footer */}
      <div className="footer text-center mb-4">
        <p className="text-sm restart-instruction">
          To restart the sequence, press SPACE
        </p>
      </div>
    </div>
  );
};

export default GameTurnWrapper;
