import { Typography, IconButton, Slider } from '@material-tailwind/react';
import React, { useState } from 'react';
import { setLineHeight, setWordSpacing, setLetterSpacing } from '../../features/font_features/font';

const FontOption = ({ label, settingLabel, settingOptions }) => {
  const [value, setValue] = useState(settingOptions.min);
  const [labelValue, setLabelValue] = useState(settingLabel);

  const handleSliderChange = (event, newValue) => {
    if (newValue === undefined) {
      newValue = event ? event.target.value : value;
    }
    setValue(parseFloat(newValue));

    console.log(label, newValue);

    if (label === 'Line height') {
      setLineHeight(newValue);
      setLabelValue(newValue);
    } else if (label === 'Word spacing') {
      setWordSpacing(newValue);
      setLabelValue(newValue, 'px');
    } else if (label === 'Letter spacing') {
      setLetterSpacing(newValue);
      setLabelValue(newValue, 'px');
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
          {labelValue}
        </Typography>
      </div>
      {/*B&S*/}
      <div className='flex items-center justify-between'>
        <IconButton
          size='sm'
          color='white'
          variant='gradient'
          onClick={
            () => handleSliderChange(null, value - (settingOptions.max - settingOptions.min) / 10) // 10% of the range
          }
        >
          <p className='text-lg'>-</p>
        </IconButton>
        <Slider
          color='blue'
          className='mx-2 w-1/2'
          value={value}
          min={settingOptions.min}
          max={settingOptions.max}
          step={(settingOptions.max - settingOptions.min) / 10}
          onChange={handleSliderChange}
        />
        <IconButton
          size='sm'
          color='white'
          variant='gradient'
          onClick={
            () => handleSliderChange(null, value + (settingOptions.max - settingOptions.min) / 10) // 10% of the range
          }
        >
          <p className='text-lg'>+</p>
        </IconButton>
      </div>
    </div>
  );
};

export default FontOption;
