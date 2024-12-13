import React, { useEffect, useState } from 'react';
import { Radio, Switch, Typography } from '@material-tailwind/react';
import { injectFilter } from '../../features/color_blind/color_blind';

const ColorDeficiencyMenu = ({ resetToggle, setResetToggle }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const colorBlindList = [
    'normal',
    'protanomaly',
    'deuteranomaly',
    'tritanomaly',
    'protanopia',
    'deuteranopia',
    'tritanopia',
    'achromatomaly',
    'achromatopsia',
  ];

  useEffect(() => {
    chrome.storage.local.get(['isColorBlindActive', 'selectedColorBlindFilter'], (result) => {
      if (result.isColorBlindActive !== undefined) {
        setIsActive(result.isColorBlindActive);
      }
      if (result.selectedColorBlindFilter) {
        setSelectedFilter(result.selectedColorBlindFilter);
      }
    });
  }, []);

  const handleActiveChange = async () => {
    const filterEnabled = !isActive;
    setIsActive(filterEnabled);
    chrome.storage.local.set({ isColorBlindActive: filterEnabled });
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (!filterEnabled) {
        injectFilter('colorBlindFilters/normal.js', tabs[0].id);
        setSelectedFilter('normal');
        chrome.storage.local.set({ selectedColorBlindFilter: 'normal' });
      }
    });
  };

  const handleFilterChange = async (filter) => {
    setIsActive(true);
    setSelectedFilter(filter);
    chrome.storage.local.set({ isColorBlindActive: true, selectedColorBlindFilter: filter });
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      injectFilter(`colorBlindFilters/${filter}.js`, tabs[0].id);
    });
  };

  useEffect(() => {
    if (resetToggle) {
      if (isActive) {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
          injectFilter('colorBlindFilters/normal.js', tabs[0].id);
        });
        setIsActive(false);
        setSelectedFilter('normal');
        chrome.storage.local.set({ isColorBlindActive: false, selectedColorBlindFilter: 'normal' });
      }
      setResetToggle(false);
    }
  }, [resetToggle]);

  return (
    <div className='h-full w-60 text-white shadow-lg'>
      {/*Header*/}
      <div className='sticky top-0 z-50 flex items-center justify-center bg-gradient-to-t from-gray-500 via-gray-800 via-30% to-black to-60% px-1 py-2'>
        <h2 className='text-xl font-bold'>Color support options</h2>
      </div>
      {/*Body*/}
      <div className='space-y-5 px-2 py-3'>
        <div className='flex items-center'>
          <Switch color='blue' checked={isActive} onChange={handleActiveChange} className='' />
          <Typography color='white' className='mr-2 font-medium'>
            Toggle Color Blind Filter
          </Typography>
        </div>
        {/*Radio list*/}
        <div>
          {colorBlindList
            .filter((filter) => filter !== 'normal')
            .map((filter, index) => (
              <Radio
                key={index}
                id={`radio-${filter}`}
                name='colorBlindFilter'
                label={
                  <Typography color='white' className='mr-2 font-medium'>
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Typography>
                }
                checked={selectedFilter === filter}
                onChange={() => handleFilterChange(filter)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ColorDeficiencyMenu;
