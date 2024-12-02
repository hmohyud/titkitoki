import { fetchMapping } from "./keymappings";

// Function to get all wrappers dynamically
const getAllWrappers = () => document.querySelectorAll(".turn-wrapper");

let mapping;

const getEmojiMapping = (symbol) => {
  if (mapping) {
    return mapping[symbol];
  }

  const getMapp = fetchMapping();

  mapping = getMapp;
  return mapping[symbol];
};

// Function to set all wrappers' background color to green (win state)
export const setToWin = () => {
  const wrappers = getAllWrappers();
  wrappers.forEach((wrapper) => {
    const title = wrapper.querySelector(".sequence-title");
    const instruction = wrapper.querySelector(".sequence-instructions");
    const instructionBottom = wrapper.querySelector(".restart-instruction");
    const currentSequenceTitle = wrapper.querySelector(
      ".current-sequence-title"
    );

    // Set the title to remembering the new Symbol
    title.innerHTML = "Yay!!!!!";
    instruction.innerHTML =
      "Nice work! Take a second off and get a new symbol!";
    instructionBottom.innerHTML =
      "Wait until you see the symbol before continuing";
    currentSequenceTitle.innerHTML = "";

    wrapper.style.backgroundColor = "rgba(65, 201, 1, 1)";
  });
};

// Function to set all wrappers' background color to red (lose state)
export const setToLoose = () => {
  const wrappers = getAllWrappers();
  wrappers.forEach((wrapper) => {
    const title = wrapper.querySelector(".sequence-title");
    const instruction = wrapper.querySelector(".sequence-instructions");
    const instructionBottom = wrapper.querySelector(".restart-instruction");
    const currentSequenceTitle = wrapper.querySelector(
      ".current-sequence-title"
    );

    // Set the title to remembering the new Symbol
    title.innerHTML = "You Lose!";
    instruction.innerHTML = "Damn, you were doing very good";
    instructionBottom.innerHTML = "Refresh the page if you want to play again";
    currentSequenceTitle.innerHTML = "";

    wrapper.style.backgroundColor = "rgba(197, 32, 32, 1)";
  });
};

// Function to turn all wrappers' background color to purple (display new element)
export const showNewElement = (element) => {
  console.log("Received new element:", element); // Placeholder for future logic

  const wrappers = getAllWrappers();
  wrappers.forEach((wrapper) => {
    const title = wrapper.querySelector(".sequence-title");
    const instruction = wrapper.querySelector(".sequence-instructions");
    const instructionBottom = wrapper.querySelector(".restart-instruction");
    const currentSequenceTitle = wrapper.querySelector(
      ".current-sequence-title"
    );
    const sequenceBoxes = wrapper.querySelector(".sequence-boxes");

    const emojiVar = getEmojiMapping(element);

    // Set the title to remembering the new Symbol
    title.innerHTML = "Remember this symbol";
    instruction.innerHTML = "Remember Your new symbol";
    instructionBottom.innerHTML = "Press SPACE to continue";
    currentSequenceTitle.innerHTML = "New Symbol";
    sequenceBoxes.innerHTML = emojiVar;

    wrapper.style.backgroundColor = "rgb(168,85,247)";
  });
};

// Function to dynamically update the sequence in all wrappers
export const updateSequenceForWrappers = (sequence) => {
  // Select all wrappers with the class "turn-wrapper"
  const wrappers = document.querySelectorAll(".turn-wrapper");

  wrappers.forEach((wrapper) => {
    // Find the sequence container
    const sequenceBoxes = wrapper.querySelector(".sequence-boxes");

    // Clear the existing sequence
    sequenceBoxes.innerHTML = "";

    // Only show the last three items of the sequence
    const displayedSequence =
      sequence.length > 3 ? sequence.slice(sequence.length - 3) : sequence;

    // Add new sequence items
    displayedSequence.forEach((symbol, index) => {
      const emojiVar = getEmojiMapping(symbol);

      const box = document.createElement("div");

      // Set styles dynamically based on position in the sequence
      let size, opacity, fontSize;
      if (index === displayedSequence.length - 1) {
        // Last symbol: Large and fully opaque
        size = "14vh";
        opacity = "1";
        fontSize = "3.5rem";
      } else if (index === displayedSequence.length - 2) {
        // Second-to-last: Medium and semi-transparent
        size = "11vh";
        opacity = "0.6";
        fontSize = "2.8rem";
      } else {
        // Third-to-last: Small and more transparent
        size = "7vh";
        opacity = "0.3";
        fontSize = "1.9rem";
      }

      // Apply inline styles
      box.style.width = size;
      box.style.height = size;
      box.style.opacity = opacity;
      box.style.display = "flex";
      box.style.justifyContent = "center";
      box.style.alignItems = "center";
      box.style.fontSize = fontSize;
      box.style.overflow = "hidden";
      box.style.margin = "0 0.5rem";
      box.style.fontWeight = "bold";
      box.style.color = "#fff";

      // Add the symbol text
      box.textContent = emojiVar;

      // Append the box to the sequence container
      sequenceBoxes.appendChild(box);
    });
  });
};
