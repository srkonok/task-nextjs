"use client";
import "@styles/globals.css";

import React from 'react';

const Preloader = () => {
  return (
    <div className="preloader-container">
      <div className="preloader-spinner">
        <div className="preloader-spinner-inner"></div>
      </div>
    </div>
  );
};

export default Preloader;
