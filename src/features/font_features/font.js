const setLineHeight = (lineHeight) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let tabId = tabs[0].id;
    chrome.scripting.insertCSS({
      target: { tabId: tabId, allFrames: true },
      css: `* { line-height: ${lineHeight} !important; }`,
    });
  });
  chrome.storage.local.set({ fontChanged: true });
};

const setWordSpacing = (wordSpacing) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let tabId = tabs[0].id;
    chrome.scripting.insertCSS({
      target: { tabId: tabId, allFrames: true },
      css: `* { word-spacing: ${wordSpacing}px !important; }`,
    });
  });
  chrome.storage.local.set({ fontChanged: true });
};

const setLetterSpacing = (letterSpacing) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let tabId = tabs[0].id;
    chrome.scripting.insertCSS({
      target: { tabId: tabId, allFrames: true },
      css: `* { letter-spacing: ${letterSpacing}px !important; }`,
    });
  });
  chrome.storage.local.set({ fontChanged: true });
};

const setFontSize = (fontSize) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let tabId = tabs[0].id;
    chrome.scripting.insertCSS({
      target: { tabId: tabId, allFrames: true },
      css: `* { font-size: ${fontSize}px !important; }`,
    });
  });
  chrome.storage.local.set({ fontChanged: true });
};

const setFont = (font) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let tabId = tabs[0].id;
    chrome.scripting.insertCSS({
      target: { tabId: tabId, allFrames: true },
      css: `* { font-family: ${font}, sans-serif !important; }`,
    });
  });
  chrome.storage.local.set({ fontChanged: true });
};

export { setLineHeight, setWordSpacing, setLetterSpacing, setFontSize, setFont };