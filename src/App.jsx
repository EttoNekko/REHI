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

import resetIcon from './assets/icons/buttonIcon/resetIcon.svg';
import fontIcon from './assets/icons/buttonIcon/fontIcon.svg';
import contrastIcon from './assets/icons/buttonIcon/contrastWheel.svg';
import colorWheelIcon from './assets/icons/buttonIcon/colorWheel.svg';
import triColorWheelIcon from './assets/icons/buttonIcon/triColorWheel.svg';
import focusIcon from './assets/icons/buttonIcon/targetIcon.svg';
import bionicIcon from './assets/icons/buttonIcon/bionicIcon.svg';
import microphoneIcon from './assets/icons/buttonIcon/microphoneIcon.svg';
import headerImage from './assets/icons/logo.png'; // Replace with the actual path to your image

function App() {
  const [count, setCount] = useState(0);
  const [activeButton, setActiveButton] = useState(null);
  const [resetToggle, setResetToggle] = useState(false);

  const options = [
    { label: 'Reset all', icon: resetIcon, hasMenu: false },
    { label: 'Font', icon: fontIcon, hasMenu: true },
    { label: 'Contrast mode', icon: contrastIcon, hasMenu: true },
    { label: 'Color filter', icon: colorWheelIcon, hasMenu: true },
    { label: 'Color deficiency', icon: triColorWheelIcon, hasMenu: true },
    { label: 'Focus mode', icon: focusIcon, hasMenu: true },
    { label: 'Bionic mode', icon: bionicIcon, hasMenu: true },
    { label: 'Text to Speech', icon: microphoneIcon, hasMenu: true },
  ];

  const popupMenus = [
    null,
    <FontMenu resetToggle={resetToggle} setResetToggle={setResetToggle} />,
    <ContrastMenu resetToggle={resetToggle} setResetToggle={setResetToggle} />,
    <ColorFilterMenu resetToggle={resetToggle} setResetToggle={setResetToggle} />,
    <ColorDeficiencyMenu resetToggle={resetToggle} setResetToggle={setResetToggle} />,
    <FocusModeMenu resetToggle={resetToggle} setResetToggle={setResetToggle} />,
    <BionicModeMenu resetToggle={resetToggle} setResetToggle={setResetToggle} />,
    <TextToSpeechMenu resetToggle={resetToggle} setResetToggle={setResetToggle} />,
  ];

  const handleButtonClick = (index) => {
    setActiveButton((prevActiveButton) => (prevActiveButton === index ? null : index));
    if (index === 0) {
      setResetToggle((prev) => !prev);
    }
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
              <img src={headerImage} alt='Header Icon' className='h-12 w-12' />
            </div>
            <h1 className='text-2xl font-bold'>REHI</h1>
          </div>

          {/* Options */}
          <div className='p-2'>
            {options.map((option, index) => (
              <button
                key={index}
                className={`z-10 flex w-full space-x-4 rounded-lg px-2 py-2 outline-none ${
                  activeButton === index ? 'border-2 hover:border-gray-100 hover:bg-gray-700' : ''
                }`}
                onClick={() => handleButtonClick(index)}
              >
                <span className='flex h-8 w-8 items-center justify-center rounded-md bg-gray-700'>
                  <img src={option.icon} alt={`${option.label} Icon`} className='h-6 w-6' />
                </span>
                <span className='text-lg'>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
