const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const routes = {
  '/':         'index.html',
  '/index.html': 'index.html',
  '/incoming': 'incoming.html',
};

const server = http.createServer((req, res) => {
  const file = routes[req.url];
  if (file) {
    fs.readFile(path.join(__dirname, file), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading page');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Hamster Haven running at http://localhost:${PORT}`);
});
