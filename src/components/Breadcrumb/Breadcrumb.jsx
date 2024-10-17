import React from 'react';

const Breadcrumb = ({ heading, subHeading }) => {
  return (
    <div className='px-5 py-10 bg-gradient-to-r from-purple-900 to-pink-500 text-white'>
        <p className='text-pink-300'>{subHeading}</p>
        <h6 className='text-3xl font-semibold'>{heading}</h6>
    </div>
  );
};

export default Breadcrumb;
