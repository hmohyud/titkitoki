"use client";

import { useEffect, useState, useRef } from "react";
import sharedMakeyMakeyHandler from "@/scripts/makeymakeyHandler";
import { useGameTurn } from "./GameProvider";
import {
  setToLoose,
  setToWin,
  showNewElement,
  updateSequenceForWrappers,
} from "@/scripts/game/wrapperManager";
import { fetchMapping } from "@/scripts/game/keymappings";

const GameLogicWrapper = ({ children, setInitialSeq }) => {
  const { isTimeToPlay, setIsTimeToPlay, setHasWonRound } = useGameTurn(); // Game state
  const [winSequence, setWinSequence] = useState(""); // Win sequence
  const [userSequence, setUserSequence] = useState(""); // User input sequence

  const userSequenceRef = useRef(userSequence); // Ref for user sequence
  const winSequenceRef = useRef(winSequence); // Ref for win sequence
  const isTimeToPlayRef = useRef(isTimeToPlay); // Ref for is it time to play

  // Sync refs whenever state updates
  useEffect(() => {
    userSequenceRef.current = userSequence;
  }, [userSequence]);

  useEffect(() => {
    winSequenceRef.current = winSequence;
  }, [winSequence]);

  useEffect(() => {
    isTimeToPlayRef.current = isTimeToPlay;
  }, [isTimeToPlay]);

  // Function to generate or extend the win sequence
  const generateWinSequence = (isFirst = false) => {
    const symbols = ["w", "a", "s", "d", "f", "g"];
    const newSymbol = isFirst
      ? "g"
      : symbols[Math.floor(Math.random() * symbols.length)];
    const newSequence = winSequenceRef.current + newSymbol;

    showNewElement(newSymbol);

    setWinSequence(newSequence);

    return newSymbol;
  };

  // Function to handle key presses
  const gameKeyPressed = (key) => {
    if (!isTimeToPlayRef.current) return;

    const currentWinSequence = winSequenceRef.current;
    const currentUserSequence = userSequenceRef.current;

    if (currentWinSequence[currentUserSequence.length] === key) {
      const newSequence = currentUserSequence + key;
      setUserSequence(newSequence);

      updateSequenceForWrappers([...newSequence]);

      if (newSequence.length === currentWinSequence.length) {
        setToWin();
        setUserSequence(""); // Reset sequence for next game
        generateWinSequence(); // Extend the win sequence
        setIsTimeToPlay(false); // Finish the round
      }
    } else {
      setToLoose();
      setUserSequence(""); // Reset on loss
    }
  };

  // Register MakeyMakey handlers
  useEffect(() => {
    const keys = ["w", "a", "s", "d", "f", "g"];
    keys.forEach((key) => {
      sharedMakeyMakeyHandler.addFunction(key, () => gameKeyPressed(key));
    });

    const mapping = fetchMapping();
    console.log("Loaded Key Mapping:", mapping);

    sharedMakeyMakeyHandler.addFunction(" ", () => {
      updateSequenceForWrappers([]);
      setUserSequence(""); // Reset user sequence on spacebar
    });

    // Generate the initial win sequence
    if (winSequenceRef.current.length === 0) {
      generateWinSequence(true); // Pass `true` to ensure the first symbol is "g"
    }

    // Cleanup on unmount
    return () => {
      keys.forEach((key) => sharedMakeyMakeyHandler.removeFunction(key));
      sharedMakeyMakeyHandler.removeFunction(" ");
    };
  }, [isTimeToPlay]); // Re-register if `isTimeToPlay` changes

  return <div>{children}</div>;
};

export default GameLogicWrapper;
