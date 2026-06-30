const express = require('express');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

require('./db/mongoose');

// Routes
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const cinemaRouter = require('./routes/cinema');
const showtimeRouter = require('./routes/showtime');
const roomRouter = require('./routes/room');
const reservationRouter = require('./routes/reservation');
const invitationsRouter = require('./routes/invitations');

const app = express();
app.disable('x-powered-by');
const port = process.env.PORT || 8080;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/build')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization'
  );

  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});
app.use(express.json());

// Liveness probe: confirms the HTTP server is up without touching the DB,
// so a slow/unready Mongo connection can't make the container look unhealthy.
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use(userRouter);
app.use(movieRouter);
app.use(cinemaRouter);
app.use(roomRouter);
app.use(showtimeRouter);
app.use(reservationRouter);
app.use(invitationsRouter);

// app.get('/api/test', (req, res) => res.send('Hello World'))

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/*', (req, res) => {
  const indexPath = path.join(__dirname, '../../client/build/index.html');
  res.sendFile(indexPath, (err) => {
    if (err) res.status(404).json({ error: 'Not found' });
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(port, () => console.log(`app is running in PORT: ${port}`));
