import React, { useState } from 'react';
import { Switch, Typography } from '@material-tailwind/react';

const BionicMenu = () => {
  const [isActive, setIsActive] = useState(false);
  const handleActiveChange = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className='h-full w-60 text-white shadow-lg'>
      {/*Header*/}
      <div className='sticky top-0 flex items-center justify-center bg-gradient-to-t from-gray-500 via-gray-800 via-30% to-black to-60% px-1 py-2'>
        <h2 className='text-xl font-bold'>Bionic Mode</h2>
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
                Toggle Bionic Mode
              </Typography>
            </div>
          }
          className=''
        />
      </div>
    </div>
  );
};

export default BionicMenu;
