import React from 'react';

const Logo: React.FC = () => {
  return (
    <div
      className="logo-container"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        marginRight: '8px',
      }}
    >
      <div
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '8px',
          background: 'linear-gradient(to bottom, #000000, #333333)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          marginRight: '8px',
        }}
      >
        <span
          style={{
            color: 'white',
            fontFamily: 'Satoshi, sans-serif',
            fontWeight: 'bold',
            fontSize: '20px',
            lineHeight: 1,
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          M
        </span>
      </div>
    </div>
  );
};

export default Logo;
