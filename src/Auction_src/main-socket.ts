// https://www.npmjs.com/package/ws

import WebSocket from "ws";

const ws = new WebSocket('ws://localhost/et2428');

ws.on('error', console.error);

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function message(data:string) {
  console.log('received: %s', data);
});