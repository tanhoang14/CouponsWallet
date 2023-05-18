<template>
    <div class="loading flex justify-center items-center h-screen">
      <span class="block w-16 h-16 rounded-full border-2 border-transparent border-t-white animate-spin"></span>
    </div>
  </template>
  
  <style scoped>
  .loading {
    @keyframes circle-loading {
      to {
        transform: rotate(360deg);
      }
    }
  }
  
  </style>
  