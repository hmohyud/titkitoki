"use client";
import React, { createContext, useContext, useState } from "react";

// Create the Context
const ProgressContext = createContext();

export const GameProvider = ({ children }) => {
  const [isTimeToPlay, setIsTimeToPlay] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [hasWonRound, setHasWonRound] = useState(true);

  return (
    <ProgressContext.Provider
      value={{
        isTimeToPlay,
        setIsTimeToPlay,
        hasLost,
        setHasLost,
        hasWonRound,
        setHasWonRound,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

// Hook to use the context
export const useGameTurn = () => useContext(ProgressContext);
