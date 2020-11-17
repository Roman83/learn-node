const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 8080;

function setHeaders(res, params = {}) {
  const headers = Object.entries({
    'Access-Control-Allow-Origin': '*',
    'X-Author': 'Roman83',
    'Content-Type': 'text/plain; charset=UTF-8',
    ...params,
  });
  for (const [key, value] of headers) {
    res.setHeader(key, value);
  }
}

const server = http.createServer((req, res) => {
  switch (req.url) {
  case '/login/': 
    res.statusCode = 200;
    setHeaders(res);
    res.end('Roman83');
    break;
  case '/sample/':
    res.statusCode = 200;
    setHeaders(res);
    res.end('function task(x) { return x * (this**2); }');
    break
  case '/promise/':
    res.statusCode = 200;
    setHeaders(res);
    res.end('function task(x) { return new Promise((res, rej) => { if (x < 18) { res("yes"); } else { rej("no"); }}); }');
    break;
  case '/fetch/':
    fs.readFile('fetch.html', (err, result) => {
      if (err) {
        res.statusCode = 500;
        setHeaders(res);
        res.end();
      } else {
        res.statusCode = 200;
        setHeaders(res, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(result);
      }
    });
    break;
  case '/week4/': 
    res.statusCode = 200;
    setHeaders(res, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'x-test,Content-Type,Accept,Access-Control-Allow-Headers',
    });
    console.log(req.body);
    let body = '';
    req.on('data', data => body += data.toString());
    req.on('end', () => {
      res.end(JSON.stringify({
        message: 'Roman83',
        'x-result': req.headers['x-test'],
        'x-body': body,
      }));
    });
    break;
  default:
    fs.readFile('index.html', (err, result) => {
      if (err) {
        res.statusCode = 500;
        setHeaders(res);
        res.end();
      } else {
        res.statusCode = 200;
        setHeaders(res, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(result);
      }
    });
  }
  
});

server.listen(PORT, () => {
  console.log(`Server running at localhost/${PORT}`);
});
