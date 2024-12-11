const bluefilter = async (opacity) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (opacity) => {
      if (opacity === 0) {
        // Remove the filter if opacity is 0
        const overlay = document.querySelector('.blue-light-filter');
        if (overlay) {
          overlay.remove();
        }
        const styleElement = document.getElementById('blue-light-filter-style');
        if (styleElement) {
          styleElement.remove();
        }
        console.log('Blue light filter removed');
        return;
      }

      const css = `
      .blue-light-filter {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(214, 127, 45, ${opacity}); /* Adjust the color and opacity as needed */
        pointer-events: none; /* Ensure the overlay doesn't block interactions */
        z-index: 9999; /* Ensure the overlay is on top of other elements */
      }
      `;
      let styleElement = document.getElementById('blue-light-filter-style');
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'blue-light-filter-style';
        styleElement.textContent = css;
        document.head.appendChild(styleElement);
      } else {
        styleElement.textContent = css;
      }

      let overlay = document.querySelector('.blue-light-filter');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'blue-light-filter';
        document.body.appendChild(overlay);
      }
      console.log('Blue light filter toggled with opacity:', opacity);
    },
    args: [opacity]
  });
}

export default bluefilter;