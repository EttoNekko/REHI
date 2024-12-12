import React from 'react';

const TextToSpeechMenu = () => {
  return (
    <div className='h-full w-60 bg-black text-white shadow-lg'>
      {/*Header*/}
      <div className='sticky top-0 flex items-center justify-center bg-gradient-to-t from-gray-500 via-gray-800 via-30% to-black to-60% px-1 py-2'>
        <h2 className='text-xl font-bold'>Text 2 Speech</h2>
        <button className='absolute right-2 text-lg hover:text-gray-300'>✖</button>
      </div>
      <p>Insert text2bitch setting Please</p>
    </div>
  );
};

export default TextToSpeechMenu;