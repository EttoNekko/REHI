import React, { useState, useEffect } from 'react';
import bluefilter from '../../features/blue_light_filters/bluelightfilter';

const BlueLightMenu = () => {
  const [opacity, setOpacity] = useState(0.3);
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    // Check if the filter is active when the component mounts
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => {
            const overlay = document.querySelector('.blue-light-filter');
            if (overlay) {
              const currentOpacity = parseFloat(getComputedStyle(overlay).backgroundColor.split(',')[3]);
              return { isActive: true, opacity: currentOpacity };
            }
            return { isActive: false, opacity: 0.3 };
          },
        },
        (results) => {
          if (results && results[0] && results[0].result) {
            const { isActive, opacity } = results[0].result;
            setIsFilterActive(isActive);
            setOpacity(opacity);
          }
        }
      );
    });
  }, []);

  const handleSliderChange = (event) => {
    const newOpacity = parseFloat(event.target.value);
    setOpacity(newOpacity);
    if (!isFilterActive) {
      setIsFilterActive(true);
    }
    bluefilter(newOpacity);

    console.log(newOpacity);
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsFilterActive(isChecked);
    if (isChecked) {
      bluefilter(opacity);
    } else {
      bluefilter(0); // Set opacity to 0 to remove the filter
    }
  };

  return (
    <div className='h-full w-60 bg-black text-white shadow-lg'>
      {/* Header */}
      <div className='sticky top-0 flex items-center justify-center bg-gradient-to-t from-gray-500 via-gray-800 via-30% to-black to-60% px-1 py-2'>
        <h2 className='text-xl font-bold'>Blue Light Filter</h2>
        <button className='absolute right-2 text-lg hover:text-gray-300'>✖</button>
      </div>
      <p>Insert blue light filter setting Please</p>
      {/* Toggle checkbox */}
      <label className='flex items-center space-x-2'>
        <input
          type='checkbox'
          checked={isFilterActive}
          onChange={handleCheckboxChange}
        />
        <span>Enable Blue Light Filter</span>
      </label>
      {/* Slider */}
      <input
        type='range'
        min='0.2'
        max='0.8'
        step='0.01'
        value={opacity}
        className='slider'
        id='intensity'
        style={{ width: '100%' }}
        onChange={handleSliderChange}
      />
    </div>
  );
}

export default BlueLightMenu;