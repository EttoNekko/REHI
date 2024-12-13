let pageTintOptions = { r: 67, g: 67, b: 0, alpha: 0.4, focus: 100 };

// load options from storage, merge with current defaults

// chrome.storage.local.get({ pageTintOptions: {} }, function (response) {
//     for (var d in pageTintOptions) {
//         pageTintOptions[d] = response.pageTintOptions[d] || pageTintOptions[d];
//     }
// });


function incommingMessage(request, sender, sendResponse) {
    // inject css and main script
    console.log('request', request);

    if (request.inject) {
        chrome.scripting.executeScript({
            target: { tabId: request.inject },
            files: ["test.js"],
        });

        chrome.scripting.insertCSS({
            target: { tabId: request.inject },
            css: `#injected-frame-001 {
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              z-index: 2147483647;
              pointer-events:none;
            }`,
        });
    }

    // pages request current style options on load, respond with current options

    if (request.getStyle) {
        sendResponse(pageTintOptions);
    }

    // update options with request
    // send updated options to each open tab

    if (request.setStyle) {
        pageTintOptions = request.setStyle;

        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (tab) {
                chrome.tabs.sendMessage(tab.id, { pageTintStyle: pageTintOptions });
            });
        });
    }

    // save updated options to local storage

    if (request.saveStyle) {
        chrome.storage.local.set({ pageTintOptions: pageTintOptions });
    }

    // relay configFocus message from popup to injected script

    if (request.centerFocus) {
        chrome.tabs.sendMessage(request.centerFocus.id, { centerFocus: true });
    }
}

// // pass incomming messages to incommingMessage()

chrome.runtime.onMessage.addListener(incommingMessage);

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'runColorFilter') {
//     const { r, g, b, alpha, focus, clientX, clientY } = message;
//     // color_filter(r, g, b, alpha, focus, clientX, clientY);
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       chrome.scripting.executeScript({
//         target: { tabId: tabs[0].id },
//         func: (r, g, b, alpha, focus, clientX, clientY) => {
//           // eslint-disable-next-line no-unused-vars
//           const color_filter = async (r, g, b, alpha, focus, clientX, clientY) => {
//             let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//             chrome.scripting.executeScript({
//               target: { tabId: tab.id },
//               func: (r, g, b, alpha, focus, clientX, clientY) => {
//                 console.log('Data:', r, g, b, alpha, focus, clientX, clientY);
//                 let color = 'transparent';
//                 let border_color = 'transparent';
//                 let height = window.innerHeight;
//                 let focusval = 0;

//                 color = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
//                 focusval = focus / 2;
//                 border_color = focusval > 0 ? color : 'transparent';

//                 if (alpha === 0) {
//                   // Remove the filter if opacity is 0
//                   const overlay = document.querySelector('.color-filter');
//                   if (overlay) {
//                     overlay.remove();
//                   }
//                   const styleElement = document.getElementById('color-filter-style');
//                   if (styleElement) {
//                     styleElement.remove();
//                   }
//                   console.log('Color filter removed');
//                   return;
//                 }

//                 const css = `
//                     .color-filter {
//                         position: fixed;
//                         top: 0;
//                         bottom: 0;
//                         left: 0;
//                         right: 0;
//                         width: 100%;
//                         height: 100%;
//                         background-color: rgba(${r},${g},${b},${alpha}); /* Adjust the color and opacity as needed */, 127, 45, 0.6); /* Adjust the color and opacity as needed */
//                         pointer-events: none; /* Ensure the overlay doesn't block interactions */
//                         z-index: 2147483647;
//                         pointer-events: none;
//                     }
//                     `;
//                 let styleElement = document.getElementById('color-filter-style');
//                 if (!styleElement) {
//                   styleElement = document.createElement('style');
//                   styleElement.id = 'color-filter-style';
//                   styleElement.textContent = css;
//                   document.head.appendChild(styleElement);
//                 } else {
//                   styleElement.textContent = css;
//                 }

//                 let overlay = document.querySelector('.color-filter');
//                 if (!overlay) {
//                   overlay = document.createElement('div');
//                   overlay.className = 'color-filter';

//                   overlay.style.display = focus ? 'block' : 'none';
//                   document.body.appendChild(overlay);
//                 } else {
//                   overlay.style.display = focus ? 'block' : 'none';
//                 }

//                 console.log(overlay.getAttribute('style'));
//                 overlay.style.backgroundColor = color;
//                 overlay.style.setProperty(
//                   'border-top',
//                   Math.max(clientY - focusval, 0) + 'px solid ' + border_color,
//                 );
//                 overlay.style.setProperty(
//                   'border-bottom',
//                   Math.max(height - clientY - focusval, 0) + 'px solid ' + border_color,
//                 );
//                 // overlay.style['background-color'] = color;
//                 // overlay.style['border-top']    = Math.max(clientY - focusval, 0) + 'px solid ' + border_color;
//                 // overlay.style['border-bottom'] = Math.max(height - clientY - focusval, 0) + 'px solid ' + border_color;
//                 console.log(overlay.style);
//                 console.log('Blue light filter toggled with rgba', r, g, b, alpha);
//               },
//               args: [r, g, b, alpha, focus, clientX, clientY],
//             });
//           };
//         },
//       });
//     });
//     console.log('dang cac cac');
//     sendResponse({ status: 'Color filter applied' });
//   }
// });
