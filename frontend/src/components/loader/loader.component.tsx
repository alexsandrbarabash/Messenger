import React from 'react';

import { LoaderWrapper } from './loader.styles';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        style={{
          margin: 'auto',
          background: 'none',
          display: 'block',
          shapeRendering: 'auto'
        }}
        width='90px'
        height='90px'
        viewBox='0 0 100 100'
        preserveAspectRatio='xMidYMid'
      >
        <circle
          cx='50'
          cy='50'
          r='32'
          strokeWidth='2'
          stroke='#cde1e7'
          strokeDasharray='50.26548245743669 50.26548245743669'
          fill='none'
          strokeLinecap='round'
        >
          <animateTransform
            attributeName='transform'
            type='rotate'
            repeatCount='indefinite'
            dur='0.53475935828877s'
            keyTimes='0;1'
            values='0 50 50;360 50 50'
          ></animateTransform>
        </circle>
      </svg>
    </LoaderWrapper>
  );
};
