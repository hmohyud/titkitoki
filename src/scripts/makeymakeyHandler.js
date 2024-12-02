class MakeyMakeyHandler {
    constructor() {
      if (MakeyMakeyHandler.instance) {
        return MakeyMakeyHandler.instance; // Return existing instance if already created
      }
  
      // Initialize key bindings and allowed keys
      this.keyBindings = {};
      this.allowedKeys = [
        " ", // Spacebar
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "w", "a", "s", "d", "f", "g",
        "W", "A", "S", "D", "F", "G",
      ];
  
      // Attach event listener for key presses
      window.addEventListener("keydown", (event) => this.handleKeyPress(event));
  
      // Store the instance
      MakeyMakeyHandler.instance = this;
      return this;
    }
  
    // Add a function to a specific key
    addFunction(key, func) {
      if (!this.allowedKeys.includes(key)) {
        console.error(`Key "${key}" is not allowed.`);
        return;
      }
  
      if (!this.keyBindings[key]) {
        this.keyBindings[key] = [];
      }
  
      this.keyBindings[key].push(func);
    }
  
    // Remove a function from a specific key
    removeFunction(key, func) {
      if (!this.keyBindings[key]) {
        console.error(`No functions registered for key "${key}".`);
        return;
      }
  
      this.keyBindings[key] = this.keyBindings[key].filter((f) => f !== func);
  
      if (this.keyBindings[key].length === 0) {
        delete this.keyBindings[key];
      }
    }
  
    // Trigger all functions bound to a specific key in the order they were added
    triggerFunctions(key) {
      if (!this.keyBindings[key]) {
        console.log(`No functions to trigger for key "${key}".`);
        return;
      }
  
      this.keyBindings[key].forEach((func) => func());
    }
  
    // Handle key press events
    handleKeyPress(event) {
      const key = event.key; // Get the pressed key
      if (this.allowedKeys.includes(key)) {
        this.triggerFunctions(key);
      }
    }
  }
  
  // Create a shared singleton instance
  const sharedMakeyMakeyHandler = new MakeyMakeyHandler();
  Object.freeze(sharedMakeyMakeyHandler);
  
  export default sharedMakeyMakeyHandler;
  