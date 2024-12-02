"use client";

import React, { useRef } from "react";

const GameTurnWrapper = () => {
  const wrapperRef = useRef(null); // Ref to the wrapper element

  return (
    <div
      ref={wrapperRef}
      className="relative w-[500px] h-[92%] flex flex-col bg-black text-white rounded-lg turn-wrapper py-8"
    >
      {/* Header */}
      <div className="wrapper-header text-center">
        <h1 className="text-3xl font-bold sequence-title">
          Recall the sequence
        </h1>
        <p className="text-md sequence-instructions">
          Press symbols in the correct order to clear this level
        </p>
      </div>

      {/* Sequence Area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-md current-sequence-title">Current Sequence</h2>
        <div className="flex mt-4 h-[14vh] w-full items-center justify-start content-box">
          <div className="w-1/2 h-full flex items-center justify-end flex-row sequence-boxes text-3xl">
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer text-center">
        <p className="text-md restart-instruction">
          To restart the sequence, press SPACE
        </p>
      </div>
    </div>
  );
};

export default GameTurnWrapper;
