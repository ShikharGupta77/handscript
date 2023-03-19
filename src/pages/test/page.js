import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'https://10.232.33.191:5001';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('message', (data) => {
      console.log('Received message:', data);
      setMessage(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>React App</h1>
      <p>Message from server: {message}</p>
    </div>
  );
}

export default App;
