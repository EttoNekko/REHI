let isContrastModeActive = false;

function contrastModeToggle() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;

    chrome.scripting.executeScript({
      target: { tabId },
      func: (isActive) => {
        const body = document.body;
        const allElements = document.querySelectorAll("*");

        if (isActive) {
          // Restore original styles
          body.style.backgroundColor = "";
          body.style.color = "";
          allElements.forEach((el) => {
            el.style.backgroundColor = "";
            el.style.color = "";
          });
        } else {
          // Apply contrast styles
          body.style.backgroundColor = "black";
          body.style.color = "white";
          allElements.forEach((el) => {
            el.style.backgroundColor = "black";
            el.style.color = "white";
          });
        }
      },
      args: [isContrastModeActive], // Pass the current state to the script
    });

    // Toggle the state
    isContrastModeActive = !isContrastModeActive;
  });
}

export default contrastModeToggle;
