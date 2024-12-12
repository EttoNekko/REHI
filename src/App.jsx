import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import FontMenu from './assets/font_change/FontMenu.jsx';
import ContrastMenu from './assets/contrast_mode/ContrastMenu.jsx';
import ColorFilterMenu from './assets/color_filter/ColorFilterMenu.jsx';
import ColorDeficiencyMenu from './assets/color_deficiency/ColorDeficiencyMenu.jsx';
import FocusModeMenu from './assets/focus_mode/FocusModeMenu.jsx';
import BionicModeMenu from './assets/bionic_mode/BionicMenu.jsx';
import TextToSpeechMenu from './assets/text_to_speech/TextToSpeechMenu.jsx';
import './App.css';

import resetIcon from './assets/icons/resetIcon.svg';

function App() {
  const [count, setCount] = useState(0);
  const [activeButton, setActiveButton] = useState(null);
  const [resetToggle, setResetToggle] = useState(false);

  const options = [
    {},
    { label: 'Font', icon: '⌨' },
    { label: 'Contrast mode', icon: '⌨' },
    { label: 'Color filter', icon: '⌨' },
    { label: 'Color deficiency', icon: '⌨' },
    { label: 'Focus mode', icon: '⌨' },
    { label: 'Bionic mode', icon: '⌨' },
    { label: 'Text to Speach', icon: '⌨' },
  ];

  const popupMenus = [
    null,
    <FontMenu resetToggle={resetToggle} />,
    <ContrastMenu resetToggle={resetToggle} />,
    <ColorFilterMenu resetToggle={resetToggle} />,
    <ColorDeficiencyMenu resetToggle={resetToggle} />,
    <FocusModeMenu resetToggle={resetToggle} />,
    <BionicModeMenu resetToggle={resetToggle} />,
    <TextToSpeechMenu resetToggle={resetToggle} />,
  ];

  const handleButtonClick = (index) => {
    setActiveButton((prevActiveButton) => (prevActiveButton === index ? null : index));
  };

  return (
    <>
      <div className='flex h-[23rem] w-fit flex-row justify-center bg-transparent'>
        {/* Secondary Popup Menus */}
        <div className='h-full w-fit overflow-y-auto bg-black shadow-lg'>
          {popupMenus.map((menu, index) => (
            <div key={index} className={activeButton === index ? 'block' : 'hidden'}>
              {menu}
            </div>
          ))}
        </div>
        <div className='relative z-50 h-full w-72 overflow-auto bg-black text-white shadow-lg'>
          {/* Header */}
          <div className='sticky top-0 flex items-center justify-center bg-gradient-to-t from-gray-500 via-gray-800 via-30% to-black to-60% px-2 py-2'>
            <div className='absolute left-4 flex items-center gap-2'>
              <div className='flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-blue-500'>
                <span className='text-sm font-bold text-white'>👁</span>
              </div>
            </div>
            <h1 className='text-2xl font-bold'>REHI</h1>
          </div>

          {/* Options */}
          <div className='p-2'>
            <button
              key={0}
              className={`flex w-full space-x-4 rounded-lg px-2 py-2 outline-none ${
                activeButton === 0 ? 'border-2 hover:border-gray-100 hover:bg-gray-700' : ''
              }`}
              onClick={() => {
                handleButtonClick(0);
                setResetToggle((prev) => !prev);
              }}
            >
              <span className='flex h-8 w-8 items-center justify-center rounded-md bg-gray-700'>
                <img src={resetIcon} alt='Reset Icon' className='h-6 w-6 text-white' />
              </span>
              <span className='text-lg'>Reset all</span>
            </button>

            {options.map(
              (option, index) =>
                option.label && (
                  <button
                    key={index}
                    className={`flex w-full space-x-4 rounded-lg px-2 py-2 outline-none ${
                      activeButton === index
                        ? 'border-2 hover:border-gray-100 hover:bg-gray-700'
                        : ''
                    }`}
                    onClick={() => handleButtonClick(index)}
                  >
                    <span className='flex h-8 w-8 items-center justify-center rounded-md bg-gray-700'>
                      {option.icon}
                    </span>
                    <span className='text-lg'>{option.label}</span>
                  </button>
                ),
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
