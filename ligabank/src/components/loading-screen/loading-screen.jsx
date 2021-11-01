import React from 'react';
import './loading-screen.scss';

export default function LoadingScreen() {
  return (
    <div className="lds-ring" data-testid="loading-id">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
