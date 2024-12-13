import React, { useState, useEffect } from 'react';
import { Switch, Typography } from '@material-tailwind/react';
import simpleModeToggle from '../../features/simple_mode/simple_mode';

const FocusModeMenu = ({ resetToggle, setResetToggle }) => {
  const [isTunnelModeActive, setIsTunnelModeActive] = useState(false);
  const [isSimpleModeActive, setIsSimpleModeActive] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(['isSimpleModeActive'], (result) => {
      if (result.isSimpleModeActive !== undefined) {
        setIsSimpleModeActive(result.isSimpleModeActive);
        if (result.isSimpleModeActive) {
          simpleModeToggle();
        }
      }
    });
  }, []);

  const handleTunnelModeChange = () => {
    setIsTunnelModeActive((prev) => !prev);
  };

  const handleSimpleModeChange = () => {
    setIsSimpleModeActive((prev) => {
      const newState = !prev;
      chrome.storage.local.set({ isSimpleModeActive: newState });
      simpleModeToggle();
      return newState;
    });
  };

  useEffect(() => {
    if (resetToggle) {
      setIsTunnelModeActive(false);
      if (isSimpleModeActive) simpleModeToggle();
      setIsSimpleModeActive(false);
      chrome.storage.local.set({ isSimpleModeActive: false });
      setResetToggle(false);
    }
  }, [resetToggle]);

  return (
    <div className='h-full w-60 text-white shadow-lg'>
      {/*Header*/}
      <div className='sticky top-0 z-50 flex items-center justify-center bg-gradient-to-t from-gray-500 via-gray-800 via-30% to-black to-60% px-1 py-2'>
        <h2 className='text-xl font-bold'>Focus Mode</h2>
      </div>
      {/*Body*/}
      <div className='space-y-5 px-2 py-3'>
        <div className='flex items-center'>
          <Typography color='white' className='mr-2 font-medium'>
            Tunnel Mode
          </Typography>
          <Switch
            color='blue'
            checked={isTunnelModeActive}
            onChange={handleTunnelModeChange}
            className=''
          />
        </div>
        <div className='flex items-center'>
          <Typography color='white' className='mr-2 font-medium'>
            Simple Mode
          </Typography>
          <Switch
            color='blue'
            checked={isSimpleModeActive}
            onChange={handleSimpleModeChange}
            className=''
          />
        </div>
      </div>
    </div>
  );
};

export default FocusModeMenu;
