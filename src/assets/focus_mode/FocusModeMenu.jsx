import React, { useState, useEffect } from 'react';
import { Switch, Typography } from '@material-tailwind/react';
import simpleModeToggle from '../../features/simple_mode/simple_mode';

const FocusModeMenu = ({ resetToggle, setResetToggle }) => {
  const [isTunnelModeActive, setIsTunnelModeActive] = useState(false);
  const [isSimpleModeActive, setIsSimpleModeActive] = useState(false);
  const simpleOnMessage = { messageId: 'toggleVisor', active: 'on' };
  const simpleOffMessage = { messageId: 'toggleVisor', active: 'off' };

  useEffect(() => {
    chrome.storage.local.get(['isSimpleModeActive', 'isTunnelModeActive'], (result) => {
      if (result.isSimpleModeActive !== undefined) {
        setIsSimpleModeActive(result.isSimpleModeActive);
        if (result.isSimpleModeActive) {
          simpleModeToggle();
        }
      }
      if (result.isTunnelModeActive !== undefined) {
        setIsTunnelModeActive(result.isTunnelModeActive);
        if (result.isTunnelModeActive) {
          const message = { messageId: 'toggleVisor', active: 'on' };
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message);
          });
        }
      }
    });
  }, []);

  const handleTunnelModeChange = () => {
    setIsTunnelModeActive((prev) => {
      const newState = !prev;
      const message = newState ? simpleOnMessage : simpleOffMessage;
      chrome.storage.local.set({ isTunnelModeActive: newState });
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message);
      });
      return newState;
    });
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
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { messageId: 'toggleVisor', active: 'off' });
      });
      setIsTunnelModeActive(false);
      if (isSimpleModeActive) simpleModeToggle();
      setIsSimpleModeActive(false);
      chrome.storage.local.set({ isSimpleModeActive: false, isTunnelModeActive: false });
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
