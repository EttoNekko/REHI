chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'textToSpeech',
    title: 'Đọc văn bản',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'textToSpeech-en-US',
    parentId: 'textToSpeech',
    title: 'English',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'textToSpeech-vi-VN',
    parentId: 'textToSpeech',
    title: 'Tiếng Việt',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId.startsWith('textToSpeech') && info.selectionText) {
    let lang = 'vi-VN'; // Default language
    if (info.menuItemId === 'textToSpeech-vi-VN') {
      lang = 'vi-VN';
    } else if (info.menuItemId === 'textToSpeech-en-US') {
      lang = 'en-US';
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: readTextAloud,
      args: [info.selectionText, lang],
    });
  }
});

function readTextAloud(text, lang) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang; // Set the language
  speechSynthesis.speak(utterance);
}
