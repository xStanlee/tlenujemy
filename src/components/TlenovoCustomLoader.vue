<template>
    <div class="loader-container">
      <svg
        width="240"
        height="80"
        viewBox="0 0 240 80"
        xmlns="http://www.w3.org/2000/svg"
        class="tlenovo-loader"
      >
        <!-- Central "O" letter -->
        <text
          x="40"
          y="48"
          text-anchor="middle"
          fill="white"
          font-family="'Segoe UI', Arial, sans-serif"
          font-size="24"
          font-weight="600"
          opacity="0.9"
          stroke="white"
          stroke-width="0.5"
        >
          O
        </text>
                
        <!-- Subscript "2" -->
        <text
          x="52"
          y="52"
          fill="white"
          font-family="'Segoe UI', Arial, sans-serif"
          font-size="12"
          font-weight="400"
          opacity="0.9"
          stroke="white"
          stroke-width="0.5"
        >
          2
          <animate
            attributeName="opacity"
            values="0.9;0.5;0.9"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </text>
        
        <!-- Modern TLENOVO text -->
        <text
          x="90"
          y="45"
          fill="white"
          font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
          font-size="22"
          font-weight="300"
          letter-spacing="3px"
          opacity="0.95"
          stroke="white"
          stroke-width="0.3"
        >
          TLENOVO
          <animate
            attributeName="opacity"
            values="0.95;0.7;0.95"
            dur="3s"
            repeatCount="indefinite"
          />
        </text>
        
        <!-- Modern border pulse -->
        <rect
          x="5"
          y="5"
          width="230"
          height="70"
          fill="none"
          stroke="white"
          stroke-width="1"
          opacity="0"
          rx="8"
        >
          <animate
            attributeName="opacity"
            values="0;0.25;0"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dasharray"
            values="0 400;200 200;0 400"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  </template>
  
  <style scoped>
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  
  .tlenovo-loader {
    display: block;
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.2));
    width: 240px;
    height: 80px;
    transition: all 0.3s ease;
  }
  
  .tlenovo-loader:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
  }
  </style>
  