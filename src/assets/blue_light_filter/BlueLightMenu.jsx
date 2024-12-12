import React, { useState, useEffect } from 'react';
import bluefilter from '../../features/blue_light_filters/bluelightfilter';
import { Switch, Typography } from '@material-tailwind/react';
import { RgbaStringColorPicker } from 'react-colorful';

const BlueLightMenu = () => {
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [color, setColor] = useState('rgba(18, 46, 46, 0.46)');

  useEffect(() => {
    // Check if the filter is active when the component mounts
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => {
            const overlay = document.querySelector('.blue-light-filter');
            if (overlay) {
              const currentColor = getComputedStyle(overlay).backgroundColor;
              let result = { isActive: true, color: currentColor };
              console.log(result);
              return result;
            }
            return { isActive: false, color: 'rgba(18, 46, 46, 0)' };
          },
        },
        (results) => {
          const { isActive, color } = results[0].result;
          console.log('Blue light filter is active:', isActive);
          console.log('Blue light filter color:', color);
          setIsFilterActive(isActive);
          setColor(color);
        },
      );
    });
  }, []);

  const handleColorChange = (event) => {
    const newcolor = event;
    setColor(newcolor);
    if (!isFilterActive) {
      setIsFilterActive(true);
      return;
    }
    bluefilter(newcolor);
    // console.log(newcolor);
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsFilterActive(isChecked);
    if (isChecked) {
      bluefilter(color);
    } else {
      bluefilter('rgba(18, 46, 46, 0.00)'); // Set opacity to 0 to remove the filter
    }
  };

  return (
    <div className='h-full w-60 text-white shadow-lg'>
      {/* Header */}
      <div className='sticky top-0 flex items-center justify-center bg-gradient-to-t from-gray-500 via-gray-800 via-30% to-black to-60% px-1 py-2'>
        <h2 className='text-xl font-bold'>Color Filter</h2>
      </div>
      {/*Body*/}
      <div className='space-y-5 px-2 py-3'>
        <Switch
          color='blue'
          checked={isFilterActive}
          onChange={handleCheckboxChange}
          label={
            <div>
              <Typography color='white' className='font-medium'>
                Toggle Filter
              </Typography>
            </div>
          }
          className=''
        />
        <RgbaStringColorPicker color={color} onChange={handleColorChange} />
      </div>
    </div>
  );
};

export default BlueLightMenu;
