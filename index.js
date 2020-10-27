const http = require('http');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Author', 'Roman83');
  res.end('Roman83');
});

server.listen(PORT, () => {
  console.log(`Server running at localhost/${PORT}`);
});
