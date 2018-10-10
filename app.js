const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config/config.json');
// const jwt = require('jwt-simple');

app.set('jwtTokenSecret', config.env.JWT_SECRET);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  });

const bookRoutes = require('./routes/book.routes');
const userRoutes = require('./routes/user.routes');

app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome to our book store'});
})

app.use('/api', bookRoutes);
app.use('/users', userRoutes);
app.use(require('./helpers/error-handler'));

module.exports = app;