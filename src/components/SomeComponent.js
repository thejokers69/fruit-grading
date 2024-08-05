// src/components/SomeComponent.js
import React, { useEffect } from 'react';
import { logInfo, logError } from '../logger';

const SomeComponent = () => {
  useEffect(() => {
    logInfo('SomeComponent mounted');

    return () => {
      logInfo('SomeComponent unmounted');
    };
  }, []);

  const handleError = (error) => {
    logError(`An error occurred: ${error}`);
  };

  return (
    <div>
      <h1>Some Component</h1>
      {/* Simulate an error */}
      <button onClick={() => handleError(new Error('Test error'))}>Trigger Error</button>
    </div>
  );
};

export default SomeComponent;