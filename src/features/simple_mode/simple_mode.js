let isSimpleModeActive = false;

async function injectReadability(tabId) {
  await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      if (typeof Readability === "undefined") {
        const script = document.createElement("script");
        script.src = chrome.runtime.getURL("readability.js");
        script.onload = () => {
          console.log("Readability.js script loaded successfully");
        };
        script.onerror = () => {
          console.error("Failed to load Readability.js script");
        };
        document.head.appendChild(script);
      }
    },
  });
}

async function simpleModeToggle() {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tabId = tabs[0].id;

    if (!isSimpleModeActive) {
      // Inject Readability.js when enabling Simple Mode
      await injectReadability(tabId);

      // Simplify the page
      chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
          // Check if Readability is available
          if (typeof Readability !== "function") {
            alert("Readability library is not available.");
            return;
          }

          // Preprocess the document
          const preprocessDocument = (doc) => {
            // Remove unwanted elements (ads, scripts, etc.)
            const tagsToRemove = ["script", "style", "iframe", "nav", "footer", "header", "aside"];
            tagsToRemove.forEach((tag) => {
              const elements = doc.querySelectorAll(tag);
              elements.forEach((el) => el.remove());
            });

            // Optionally remove elements by class or ID if known to interfere
            const classesToRemove = ["ad", "popup", "banner"];
            classesToRemove.forEach((className) => {
              const elements = doc.querySelectorAll(`.${className}`);
              elements.forEach((el) => el.remove());
            });

            return doc;
          };

          // Clone the document and preprocess it
          const documentClone = preprocessDocument(document.cloneNode(true));
          const reader = new Readability(documentClone);
          const article = reader.parse();

          if (article) {
            // Replace the content with the simplified version
            document.body.innerHTML = `
              <article style="padding: 20px; font-family: Arial, sans-serif; max-width: 800px; margin: auto;">
                <h1 style="font-size: 2rem; margin-bottom: 20px;">${article.title}</h1>
                <div style="font-size: 1.2rem; line-height: 1.6;">${article.content}</div>
              </article>
            `;
            document.body.style.backgroundColor = "#f4f4f4";
            console.log("Simplified mode activated.");
          } else {
            alert("Unable to parse the page content.");
          }
        },
      });
    } else {
      // Restore the original page by reloading
      chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
          window.location.reload();
        },
      });
    }

    // Toggle the state
    isSimpleModeActive = !isSimpleModeActive;
  });
}

export default simpleModeToggle;
