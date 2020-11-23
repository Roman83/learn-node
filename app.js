function getFromUrl(url, res, http) {
  const req = http.request(url, (result) => {
    let data = '';
    result.on('data', d => data += d);
    result.on('end', () => res.send(data));
  });
  req.end();
}

export default function appConstructor(express, bodyParser, createReadStream, crypto, http) {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS,DELETE');
    next();
  });

  app.get('/login/', (req, res) => {
    res.send('Roman83');
  });

  app.get('/code/', (req, res) => {
    const stream = createReadStream(import.meta.url.substring(7));
    stream.on('open', () => {
      stream.pipe(res);
    });
  });

  app.get('/sha1/:input/', (req, res) => {
    res.send(
      crypto.createHash('sha1').update(req.params.input).digest('hex')
    );
  });

  app.get('/req/', (req, res) => {
    getFromUrl(req.query.addr, res, http);
  });

  app.post('/req/', (req, res) => {
    getFromUrl(req.body.addr, res, http);
  });

  app.all('*', (req, res) => {
    res.send('Roman83');
  });

  return app;
}
