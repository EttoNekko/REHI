import React, { useEffect, useState } from 'react';
import { Switch, Typography } from '@material-tailwind/react';
import contrastModeToggle from '../../features/contrast_mode/contrast_mode';

const ContrastMenu = ({ resetToggle, setResetToggle }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    chrome.storage.local.get('isContrastModeActive', (result) => {
      const isContrastModeActive = result.isContrastModeActive === 'true';
      setIsActive(isContrastModeActive);
      if (isContrastModeActive) {
        contrastModeToggle();
      }
    });

    return () => {
      // Cleanup function to reset contrast mode when component unmounts
      chrome.storage.local.remove('isContrastModeActive');
    };
  }, []);

  const handleActiveChange = () => {
    setIsActive((prev) => {
      const newState = !prev;
      try {
        contrastModeToggle();
        chrome.storage.local.set({ isContrastModeActive: newState.toString() });
      } catch (error) {
        console.error('Failed to toggle contrast mode:', error);
        return prev;
      }
      return newState;
    });
  };

  useEffect(() => {
    if (resetToggle) {
      if (isActive) {
        setIsActive((prev) => {
          const newState = !prev;
          try {
            contrastModeToggle();
            chrome.storage.local.set({ isContrastModeActive: newState.toString() });
          } catch (error) {
            console.error('Failed to toggle contrast mode:', error);
            return prev;
          }
          return newState;
        });
      }
      setResetToggle(false);
    }
  }, [resetToggle]);

  return (
    <div className='h-full w-60 text-white shadow-lg'>
      {/*Header*/}
      <div className='sticky top-0 flex items-center justify-center bg-gradient-to-t from-gray-500 via-gray-800 via-30% to-black to-60% px-1 py-2'>
        <h2 className='text-xl font-bold'>Constrast Mode</h2>
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
                Toggle Contrast Mode
              </Typography>
            </div>
          }
          className=''
        />
      </div>
    </div>
  );
};

export default ContrastMenu;
