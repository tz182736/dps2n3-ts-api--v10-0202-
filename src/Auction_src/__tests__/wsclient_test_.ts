import WebSocket from "ws";

// Replace 'ws://localhost/et2428' with the actual WS server URL
const ws = new WebSocket('ws://localhost/et2428');

// Handle errors
ws.on('error', (error) => {
  console.error('Error:', error);
});

// Log connection established
ws.on('open', () => {
  console.log('Connected to WebSocket server!');
  // Send initial message after connection is established
  ws.send('something');
});

// Log received messages
ws.on('message', (data) => {
  console.log('Received:', data);
});
