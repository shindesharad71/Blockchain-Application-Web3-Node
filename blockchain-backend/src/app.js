const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const Web3 = require('web3');

require('dotenv').config();
const middlewares = require('./middlewares');
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());


const web3Client = new Web3(new Web3.providers.HttpProvider(process.env.NETWORK_URL || "ws://localhost:7545"));


app.get('/create', async (req, res) => {
  const account = await web3Client.eth.accounts.create();
  res.status(201).json(account);
});

app.get('/create/wallet', async (req, res) => {
  const wallet = await web3Client.eth.accounts.wallet.create(1);
  res.status(201).json(wallet);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
