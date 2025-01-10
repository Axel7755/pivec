//Peer server
const { PeerServer } = require('peer');
const path = require('path');
const fs = require('fs');
const cors = require("cors");

const keyPath = path.join(__dirname, '/key.pem'); 
const certPath = path.join(__dirname, '/cert.pem');
var privateKey = fs.readFileSync(keyPath, 'utf8');
var certificate = fs.readFileSync(certPath, 'utf8');

const peerServer = PeerServer({
  port: 3001,
  path: '/',
  ssl: {
    key: privateKey,
    cert: certificate
  }
});

peerServer.use(cors());

peerServer.on('connection', (client) => {
  console.log(`Cliente conectado: ${client.getId()}`);
});

peerServer.on('disconnect', (client) => {
  console.log(`Cliente desconectado: ${client.getId()}`);
});