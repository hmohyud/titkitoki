// Function to get all wrappers dynamically
const getAllWrappers = () => document.querySelectorAll(".turn-wrapper");

// Function to set all wrappers' background color to green (win state)
export const setToWin = () => {
  const wrappers = getAllWrappers();
  wrappers.forEach((wrapper) => {
    wrapper.style.backgroundColor = "green";
  });
};

// Function to set all wrappers' background color to red (lose state)
export const setToLoose = () => {
  const wrappers = getAllWrappers();
  wrappers.forEach((wrapper) => {
    wrapper.style.backgroundColor = "red";
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

    // Set the title to remembering the new Symbol
    title.innerHTML = "New Symbol";
    instruction.innerHTML = "Remember Your new symbol";
    instructionBottom.innerHTML = "Press SPACE to continue";
    currentSequenceTitle.innerHTML = "New Symbol";
    sequenceBoxes.innerHTML = element;

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
      const box = document.createElement("div");
      box.className = `symbol-box ${
        index === displayedSequence.length - 1 ? "symbol-highlight" : ""
      } mx-2 flex items-center justify-center text-lg font-bold`;
      box.textContent = symbol; // Set the symbol text
      sequenceBoxes.appendChild(box);
    });
  });
};
