/**
 * Loads video IDs from a JSON file in a browser environment.
 * @param {string} fileUrl - The URL to the JSON file.
 * @returns {Promise<string[]>} - A promise resolving to an array of video IDs.
 */
export default async function loadVideoIds(fileUrl) {
    try {

      console.log("trying to load a file ...");
      console.log("fileUrl:", fileUrl);
      
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Failed to load file: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Extract video IDs
      return data.items
        .filter((item) => item.id.kind === "youtube#video")
        .map((item) => item.id.videoId);
    } catch (error) {
      console.error("Error loading video IDs:", error);
      throw error;
    }
  }
  
//   // Example Usage
//   loadVideoIds("/data.json")
//     .then((videoIds) => console.log("Loaded video IDs:", videoIds))
//     .catch((error) => console.error(error));
  