const http = require('http');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/login/') {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Author', 'Roman83');
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.end('Roman83');
  } else if (req.url === '/sample/') {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Author', 'Roman83');
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.end('function task(x) { return x * (this**2); }');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at localhost/${PORT}`);
});
