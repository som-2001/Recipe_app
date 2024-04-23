import React from 'react';

export const Footer = () => {
  return (
    <div style={{
      backgroundColor: '#35393b',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      position: 'relative',
      bottom: 0,
      width: '100%'
    }}>
      <div>
        <p>© {new Date().getFullYear()}. All Rights Reserved.</p>
        <p>Contact Us: somgorai726@gmail.com</p>
        <p>Follow Us:</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a href="#" style={{ color: 'white', marginRight: '10px' }}>Facebook</a>
          <a href="#" style={{ color: 'white', marginRight: '10px' }}>Twitter</a>
          <a href="#" style={{ color: 'white' }}>Instagram</a>
        </div>
      </div>
    </div>
  );
}

