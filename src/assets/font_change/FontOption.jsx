import { Typography, IconButton, Slider } from '@material-tailwind/react';
import React from 'react';

const FontOption = ({ label, settingLabel, optionSetting }) => {
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
        <IconButton size='sm' color='white' variant='gradient'>
          <p className='text-lg'>-</p>
        </IconButton>
        <Slider color='blue' className='mx-2 w-1/2' defaultValue={0} />
        <IconButton size='sm' color='white' variant='gradient'>
          <p className='text-lg'>+</p>
        </IconButton>
      </div>
    </div>
  );
};

export default FontOption;
