// Define keys and emojis
const keys = ["w", "a", "s", "d", "g", "f"];
const emojis = ["🍌", "🍊", "🍎", "🍓", "🍒", "🥝"];

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Generate a new shuffled mapping
export const generateShuffledMapping = () => {
  const shuffledEmojis = [...emojis];
  const mapping = keys.reduce((result, key, index) => {
    result[key] = shuffledEmojis[index];
    return result;
  }, {});

  // Store the mapping in localStorage
  localStorage.setItem("keyMapping", JSON.stringify(mapping));

  return mapping;
};

// Fetch the mapping from localStorage
export const fetchMapping = () => {
  const storedMapping = localStorage.getItem("keyMapping");
  if (storedMapping) {
    return JSON.parse(storedMapping);
  }

  // If no mapping exists, generate a new one
  return generateShuffledMapping();
};
