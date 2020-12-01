import MongoClient from 'mongodb';
import pug from 'pug';
import fs from 'fs';

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
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS,DELETE');
    next();
  });

  app.get('/login/', (req, res) => {
    res.send('Roman83');
  });

  app.post('/insert/', (req, res) => {
    const { URL, login, password } =  req.body;
    MongoClient.connect(URL, async (err, db) => {
      if (err) {
        res.send(err);
      }

      const result = await db.db().collection('users').insertOne({
        login,
        password,
      });
      res.send('Ok');
      db.close();
    });
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

  app.get('/wordpress/wp-json/wp/v2/posts/', (req, res) => {
    const wp = JSON.parse(fs.readFileSync('wp.json'));
    res.json(wp);
  });

  app.post('/render/', (req, res) => {
    const { body: { random2, random3 }, query: { addr } } = req;

    http.request(addr, (result) => {
      let data = '';
      result.on('data', d => data += d);
      result.on('end', () => {
        res.send(pug.render(data, { random2, random3 }));
      });
    }).end();
  });

  app.all('*', (req, res) => {
    res.send('Roman83');
  });

  return app;
}
