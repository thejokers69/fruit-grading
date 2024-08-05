// src/logger.js
export const logInfo = (message) => {
    console.info(`INFO: ${message}`);
    // Vous pouvez aussi envoyer les logs vers un serveur distant
  };
  
  export const logError = (message) => {
    console.error(`ERROR: ${message}`);
    // Vous pouvez aussi envoyer les logs vers un serveur distant
  };