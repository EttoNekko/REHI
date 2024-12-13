import React, { useState, useEffect } from 'react';
import { Switch, Typography } from '@material-tailwind/react';

import { enableBionic } from '../../features/bionic/bionic';

const BionicMenu = ({ resetToggle, setResetToggle }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    chrome.storage.local.get('isBionicModeActive', (result) => {
      const isBionicModeActive = result.isBionicModeActive === 'true';
      setIsActive(isBionicModeActive);
      if (isBionicModeActive) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['bionic.js'],
          });
        });
      }
    });

    return () => {
      // Cleanup function to reset bionic mode when component unmounts
      chrome.storage.local.remove('isBionicModeActive');
    };
  }, []);

  const handleActiveChange = () => {
    setIsActive((prev) => {
      const newState = !prev;
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (newState) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['bionic.js'],
          });
        } else {
          chrome.tabs.reload(tabs[0].id);
        }
        chrome.storage.local.set({ isBionicModeActive: newState.toString() });
      });
      return newState;
    });
  };

  useEffect(() => {
    if (resetToggle) {
      if (isActive) {
        handleActiveChange();
      }
      setResetToggle(false);
    }
  }, [resetToggle]);

  return (
    <div className='h-full w-60 text-white shadow-lg'>
      {/*Header*/}
      <div className='sticky top-0 flex items-center justify-center bg-gradient-to-t from-gray-500 via-gray-800 via-30% to-black to-60% px-1 py-2'>
        <h2 className='text-xl font-bold'>Bionic Mode</h2>
      </div>
      {/*Body*/}
      <div className='space-y-5 px-2 py-3'>
        <Switch
          color='blue'
          checked={isActive}
          onChange={handleActiveChange}
          label={
            <div>
              <Typography color='white' className='font-medium'>
                Toggle Bionic Mode
              </Typography>
            </div>
          }
          className=''
        />
      </div>
    </div>
  );
};

export default BionicMenu;
