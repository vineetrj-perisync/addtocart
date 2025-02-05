import React from 'react';

function Save({ border = true }) {
  return (
    <button className={`${border ? 'border border-black' : ''} p-2`}>
      <img src="/images/save.png" alt="Save icon" className="w-6" />
    </button>
  );
}

export default Save;
