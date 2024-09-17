import React from 'react';

import ReactDOM from 'react-dom/client';
import  App  from './App';
 
async function enableMocking() {
  const { worker } = await import('./mocks/browser');
  

  // if (process.env.NODE_ENV === 'development'|| process.env.NODE_ENV === 'production') {
    return worker.start();
  // }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});


