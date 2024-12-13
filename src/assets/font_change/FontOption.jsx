import { Typography, IconButton, Slider } from '@material-tailwind/react';
import React, { useState } from 'react';
import { setLineHeight, setWordSpacing, setLetterSpacing } from '../../features/font_features/font';

const FontOption = ({ label, settingLabel, settingOptions }) => {
  const [value, setValue] = useState(settingOptions.min);

  const handleSliderChange = (event) => {
    let newValue = event ? event.target.value : value;
    setValue(newValue);

    console.log(label, newValue);

    if (label === 'Line height') {
      setLineHeight(newValue);
    } else if (label === 'Word spacing') {
      setWordSpacing(newValue);
    } else if (label === 'Letter spacing') {
      setLetterSpacing(newValue);
    } else {
      console.error('Invalid label');
    }
  };

  return (
    <div className='flex h-full flex-col'>
      {/*Label*/}
      <div className='mb-1 flex items-center justify-between'>
        <Typography color='white' className='font-medium'>
          {label}
        </Typography>
        <Typography color='white' className='font-medium'>
          {settingLabel}
        </Typography>
      </div>
      {/*B&S*/}
      <div className='flex items-center justify-between'>
        <IconButton size='sm' color='white' variant='gradient' onClick={() => handleSliderChange(null, value - 1)}>
          <p className='text-lg'>-</p>
        </IconButton>
        <Slider
          color='blue'
          className='mx-2 w-1/2'
          value={value}
          min={settingOptions.min}
          max={settingOptions.max}
          onChange={handleSliderChange}
        />
        <IconButton size='sm' color='white' variant='gradient' onClick={() => handleSliderChange(null, value + 1)}>
          <p className='text-lg'>+</p>
        </IconButton>
      </div>
    </div>
  );
};

export default FontOption;