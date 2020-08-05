const express = require('express');
const helmet = require('helmet');
const server = express();

//custom middleware
function logger(req, res, next) {
  console.log(req.method, req.url, Date().toString());
  next();
}

//apply middleware
server.use(helmet());
server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;