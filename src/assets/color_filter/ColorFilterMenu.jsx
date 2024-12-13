import React, { useState, useEffect } from 'react';
import color_filter from '../../features/color_filters/color_filter';

const ColorFilterMenu = () => {
  const [alpha, setAlpha] = useState(0.3);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [r, setR] = useState(128);
  const [g, setG] = useState(128);
  const [b, setB] = useState(128);
  const [focus, setFocus] = useState(50);
  // const [currentX, setCurrentX] = useState(0);
  // const [currentY, setCurrentY] = useState(500);

  const handleSliderChange = (event) => {
    const name = event.target.className;
    console.log(name);
    console.log(event.target.value);
    switch (name) {
      case 'slider R':
        setR(parseInt(event.target.value));
        break;
      case 'slider G':
        setG(parseInt(event.target.value))
        break;
      case 'slider B':
        setB(parseInt(event.target.value));
        break;
      case 'slider A':
        setAlpha(parseFloat(event.target.value));
        break;
      case 'slider F':
        setFocus(parseInt(event.target.value));
        break;
      default:
        break;
    }
    if (!isFilterActive) {
      setIsFilterActive(true);
    }
    // color_filter(r, g, b, alpha, focus, 0, 500);
    // chrome.runtime.sendMessage({messageId: 'colorFilter', r: r, g: g, b: b, alpha: alpha, focus: focus});
    chrome.runtime.sendMessage({messageId: 'toggleVisor', active: 'on'});
    console.log(r, g, b, alpha);
  };

  useEffect(() => {
    // Check if the filter is active when the component mounts
    async () => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      console.log("cac", tab.id);
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: () => {
            // window.onmousemove = (event) => {
            //   console.log(`Mouse moved to: (${event.clientX}, ${event.clientY})`);
            //   clientX = event.clientX;
            //   clientY = event.clientY;
            //   // TODO: Send the mouse coordinates to the background script
            //   // color_filter(r, g, b, alpha, focus, currentX, currentY);
            // };
  
            const overlay = document.querySelector('.color-filter');
            if (overlay) {
              console.log(getComputedStyle(overlay).backgroundColor, 'useEffect');
              const currentR = parseFloat(getComputedStyle(overlay).backgroundColor.substring(5).split(',')[0]);
              const currentG = parseFloat(getComputedStyle(overlay).backgroundColor.split(',')[1]);
              const currentB = parseFloat(getComputedStyle(overlay).backgroundColor.split(',')[2]);
              const currentAlpha = parseFloat(getComputedStyle(overlay).backgroundColor.split(',')[3]);
              console.log(currentR, currentG, currentB, currentAlpha, 'useEffect');
  
              return { isActive: true, r: currentR, g: currentG, b: currentB, alpha: currentAlpha};
            }
            return { isActive: false, r: 128, g: 128, b: 128, alpha: 0};
          },
        },
        (results) => {
          // if (!results[0].result) {
          //   console.log("inject");
          //   chrome.runtime.sendMessage({ inject: tab.id });
          //   chrome.scripting.executeScript({
          //     target: { tabId: tab.id },
          //     func: () => {
          //       window.__visorScriptInjected = true;
          //     },
          //   });
          // }
          if (results && results[0] && results[0].result) {
            const isActive = results[0].result;
            console.log(results[0].result, 'useEffect');
            setIsFilterActive(isActive);
            setR(parseInt(results[0].result.r));
            setG(parseInt(results[0].result.g));
            setB(parseInt(results[0].result.b));
            setAlpha(parseFloat(results[0].result.alpha));
          }
        }
      );
    };
  }, []);
  
  
  // useEffect(() => {
  //   // Constantly query currentY for color_filter
  //   const interval = setInterval(() => {
  //     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //       chrome.scripting.executeScript(
  //         {
  //           target: { tabId: tabs[0].id },
  //           func: () => {
  //             let clientX = 0;
  //             let clientY = 500;

  //             return new Promise((resolve) => {
  //               const handleMouseMove = (event) => {
  //                 const clientX = event.clientX;
  //                 const clientY = event.clientY;
  //                 window.removeEventListener('mousemove', handleMouseMove);
  //                 resolve({ clientX, clientY });
  //               };
  //               window.addEventListener('mousemove', handleMouseMove);
  //             });
  //           },
  //         },
  //         (results) => {
  //           if (results && results[0] && results[0].result) {
  //             const { clientX, clientY } = results[0].result;
  //             setCurrentX(clientX);
  //             setCurrentY(clientY);
  //             if (isFilterActive) {
  //               console.log("vai con cac o ", clientX, clientY);
  //               color_filter(r, g, b, alpha, focus, clientX, clientY);
  //             }
  //           }
  //         }
  //       );
  //     });
  //   }, 16); // Adjust the interval time as needed

  //   return () => clearInterval(interval);
  // }, [isFilterActive, r, g, b, alpha, focus];

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsFilterActive(isChecked);
    if (isChecked) {
      // color_filter(r, g, b, alpha, focus, currentX, currentY);
      chrome.runtime.sendMessage({messageId: 'toggleVisor', active: 'on'});
    } else {
      // color_filter(128, 128, 128, 0, 50, 0, 500);
      chrome.runtime.sendMessage({messageId: 'toggleVisor', active: 'off'});
    }
  };

  return (
    <div className='h-full w-60 bg-black text-white shadow-lg'>
      {/*Header*/}
      <div className='sticky top-0 flex items-center justify-center bg-gradient-to-t from-gray-500 via-gray-800 via-30% to-black to-60% px-1 py-2'>
        <h2 className='text-xl font-bold'>Color Filter options</h2>
        <button className='absolute right-2 text-lg hover:text-gray-300'>✖</button>
      </div>
      {/* Toggle checkbox */}
      <label className='flex items-center space-x-2' id='color-filter-checkbox'>
        <input
          type='checkbox'
          checked={isFilterActive}
          onChange={handleCheckboxChange}
        />
        <span>Enable Color Filter</span>
      </label>
        {/* Slider */}
        <label className='flex items-center space-x-2'>
          <div className='text-red-600 font-bold'>R</div>
          <input
          type='range'
          min='0'
          max='255'
          step='1'
          value={r}
          className='slider R'
          id='intensity'
          style={{ width: '100%' }}
          onChange={handleSliderChange}
          />
        </label>
        <label className='flex items-center space-x-2'>
          <div className='text-green-600 font-bold'>G</div>
          <input
          type='range'
          min='0'
          max='255'
          step='1'
          value={g}
          className='slider G'
          id='intensity'
          style={{ width: '100%' }}
          onChange={handleSliderChange}
          />
        </label>
        <label className='flex items-center space-x-2'>
          <div className='text-blue-600 font-bold'>B</div>
          <input
          type='range'
          min='0'
          max='255'
          step='1'
          value={b}
          className='slider B'
          id='intensity'
          style={{ width: '100%' }}
          onChange={handleSliderChange}
          />
        </label>
        <label className='flex items-center space-x-2'>
          <div className='text-red font-bold'>A</div>
          <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          value={alpha}
          className='slider A'
          id='intensity'
          style={{ width: '100%' }}
          onChange={handleSliderChange}
          />
        </label>
        <label className='flex items-center space-x-2'>
          <div className='text-red font-bold'>F</div>
          <input
          type='range'
          min='0'
          max='255'
          step='1'
          value={focus}
          className='slider F'
          id='intensity'
          style={{ width: '100%' }}
          onChange={handleSliderChange}
          />
        </label>


    </div>
  );
};

export default ColorFilterMenu;
