import React from 'react';
import FontOption from './FontOption';
import { setFont } from '../../features/font_features/font';

function FontMenu() {
  const fontOptions = [
    // { label: 'Zoom', settingLabel: '100%', settingOptions: { min: 50, max: 200 } },
    // kinda pointless to have these options since they are already available in the browser
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
        {/* Drop down menu to select font */}
        <div className='flex items-center justify-between'>
          <label className='font-medium'>Font</label>
          <select
            className='rounded-md bg-gray-800 p-1 text-white'
            onChange={(e) => setFont(e.target.value)}
          >
            <option value='Arial'>Arial</option>
            <option value='Comic Sans MS'>Comic Sans MS</option>
            <option value='Segoe UI'>Segoe UI</option>
            <option value='Verdana'>Verdana</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FontMenu;
