import React from 'react';
import FontOption from './FontOption';

function FontMenu() {
  const fontOptions = [
    { label: 'Zoom', settingLabel: '100%', settingOptions: { min: 50, max: 200 } },
    { label: 'Fontsize', settingLabel: '16px', settingOptions: { min: 10, max: 36 } },
    { label: 'Line height', settingLabel: '1.5', settingOptions: { min: 1, max: 2 } },
    { label: 'Word spacing', settingLabel: '0px', settingOptions: { min: 0, max: 10 } },
    { label: 'Letter spacing', settingLabel: '0px', settingOptions: { min: 0, max: 5 } },
  ];

  return (
    <div className='w-70 h-full text-white shadow-lg'>
      {/*Header*/}
      <div className='sticky top-0 z-50 flex items-center justify-center bg-gradient-to-t from-gray-500 via-gray-800 via-30% to-black to-60% px-1 py-2'>
        <h2 className='text-xl font-bold'>Font Options</h2>
      </div>
      {/*Body*/}
      <div className='space-y-5 px-2 py-3'>
        {fontOptions.map((option, index) => (
          <React.Fragment key={index}>
            <FontOption
              label={option.label}
              settingLabel={option.settingLabel}
              settingOptions={option.settingOptions}
            />
            {index < fontOptions.length - 1 && <hr className='border-1 border-white' />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default FontMenu;
