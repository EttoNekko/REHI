let color        = 'transparent';
let border_color = 'transparent';
let in_focus     = true;
let height       = window.innerHeight;
let clientY      = height / 2;
let focusval     = 0;

const color_filter = async (r, g, b, alpha, focus) => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (r, g, b, alpha, focus) => {
            // if (opacity === 0) {
            //     // Remove the filter if opacity is 0
            //     const overlay = document.querySelector('.blue-light-filter');
            //     if (overlay) {
            //         overlay.remove();
            //     }
            //     const styleElement = document.getElementById('blue-light-filter-style');
            //     if (styleElement) {
            //         styleElement.remove();
            //     }
            //     console.log('Blue light filter removed');
            //     return;
            // }

            const css = `
        .color-filter {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(214, 127, 45, 0.6); /* Adjust the color and opacity as needed */
            pointer-events: none; /* Ensure the overlay doesn't block interactions */
            z-index: 2147483647;
            pointer-events: none;
        }
        `;
            let styleElement = document.getElementById('color-filter-style');
            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = 'color-filter-style';
                styleElement.textContent = css;
                document.head.appendChild(styleElement);
            } else {
                styleElement.textContent = css;
            }

            let overlay = document.querySelector('.color-filter');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'color-filter';
                overlay.style.display = focus ? 'none' : 'block';
                document.body.appendChild(overlay);
            }
            else {
                overlay.style.display = focus ? 'none' : 'block';
            }
            color = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
            focusval = focus / 2;
            border_color = focusval > 0 ? color : 'transparent';
            overlay.style['background-color'] = color;
            overlay.style['border-top']    = Math.max(clientY - focusval, 0) + 'px solid ' + border_color;
            overlay.style['border-bottom'] = Math.max(height - clientY - focusval, 0) + 'px solid ' + border_color;
            
            console.log('Blue light filter toggled with rgba', r, g, b, alpha);
        },
        args: [r, g, b, alpha, focus]
    });
}

export default color_filter;