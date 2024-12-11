import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import FontMenu from './assets/font_change/FontMenu.jsx';
import ContrastMenu from './assets/contrast_mode/ContrastMenu.jsx';
import BlueLightFilterMenu from './assets/blue_light_filter/BlueLightMenu.jsx';
import ColorFilterMenu from './assets/color_filter/ColorFilterMenu.jsx';
import FocusModeMenu from './assets/focus_mode/FocusModeMenu.jsx';
import BionicModeMenu from './assets/bionic_mode/BionicMenu.jsx';
import TextToSpeechMenu from './assets/text_to_speech/TextToSpeechMenu.jsx';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [activeButton, setActiveButton] = useState(null);
  const buttonContainerRef = useRef(null);

  const options = [
    { label: 'Font', icon: '⌨', stateIndex: 0 },
    { label: 'Contrast mode', icon: '⌨' },
    { label: 'Blue Light filter', icon: '⌨' },
    { label: 'Color filter', icon: '⌨' },
    { label: 'Focus mode', icon: '⌨' },
    { label: 'Bionic mode', icon: '⌨' },
    { label: 'Text to Speach', icon: '⌨' },
  ];

  const popupMenus = [
    <FontMenu />,
    <ContrastMenu />,
    <BlueLightFilterMenu />,
    <ColorFilterMenu />,
    <FocusModeMenu />,
    <BionicModeMenu />,
    <TextToSpeechMenu />,
  ];

  const handleButtonClick = (index) => {
    setActiveButton((prevActiveButton) => (prevActiveButton === index ? null : index));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonContainerRef.current && !buttonContainerRef.current.contains(event.target)) {
        setActiveButton(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='flex h-80 w-fit flex-row justify-center bg-transparent'>
        {/* Secondary Popup Menus */}
        {activeButton !== null && (
          <div className='h-full w-fit overflow-auto shadow-lg'>{popupMenus[activeButton]}</div>
        )}
        <div className='relative z-50 h-full w-72 overflow-auto bg-black text-white shadow-lg'>
          {/* Header */}
          <div className='sticky top-0 flex items-center justify-between bg-gradient-to-t from-gray-500 via-gray-800 via-30% to-black to-60% px-2 py-2'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-blue-500'>
                <span className='text-sm font-bold text-white'>👁</span>
              </div>
            </div>
            <h1 className='text-2xl font-bold'>REHI</h1>
            <button className='text-lg text-white hover:text-gray-300'>✖</button>
          </div>

          {/* Options */}
          <div className='p-2' ref={buttonContainerRef}>
            {options.map((option, index) => (
              <button
                key={index}
                className={`flex w-full space-x-4 rounded-lg px-2 py-2 outline-none ${
                  activeButton === index ? 'border-2 hover:border-gray-100 hover:bg-gray-700' : ''
                }`}
                onClick={() => handleButtonClick(index)}
              >
                <span className='flex h-8 w-8 items-center justify-center rounded-md bg-gray-700'>
                  {option.icon}
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
