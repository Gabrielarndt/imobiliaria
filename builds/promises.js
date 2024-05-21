// promises.js

// Função de timeout com promessa
function timeoutPromise(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }
  
  // Função de intervalo com promessa
  function intervalPromise(callback, ms) {
    return new Promise((resolve, reject) => {
      const intervalId = setInterval(() => {
        callback();
      }, ms);
  
      // Se precisar interromper o intervalo, resolve a promessa com o ID do intervalo
      resolve(intervalId);
    });
  }
  
  // Função para limpar um intervalo com base no ID
  function clearIntervalPromise(intervalId) {
    return new Promise((resolve, reject) => {
      clearInterval(intervalId);
      resolve();
    });
  }
  
  // Função para aguardar até que uma condição seja verdadeira
  function waitForCondition(conditionFn, intervalMs, timeoutMs) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const intervalId = setInterval(() => {
        if (conditionFn()) {
          clearInterval(intervalId);
          resolve();
        } else if (Date.now() - startTime >= timeoutMs) {
          clearInterval(intervalId);
          reject(new Error('Timeout exceeded'));
        }
      }, intervalMs);
    });
  }
  
  // Exportando as funcionalidades
  module.exports = {
    timeoutPromise,
    intervalPromise,
    clearIntervalPromise,
    waitForCondition
  };
  