const setLineHeight = (lineHeight) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let tabId = tabs[0].id;
    chrome.scripting.insertCSS({
      target: { tabId: tabId, allFrames: true },
      css: `body { line-height: ${lineHeight} !important; }`,
    });
  });
};

const setWordSpacing = (wordSpacing) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let tabId = tabs[0].id;
    chrome.scripting.insertCSS({
      target: { tabId: tabId, allFrames: true },
      css: `body { word-spacing: ${wordSpacing}px !important; }`,
    });
  });
};

const setLetterSpacing = (letterSpacing) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let tabId = tabs[0].id;
    chrome.scripting.insertCSS({
      target: { tabId: tabId, allFrames: true },
      css: `body { letter-spacing: ${letterSpacing}px !important; }`,
    });
  });
};

export { setLineHeight, setWordSpacing, setLetterSpacing };