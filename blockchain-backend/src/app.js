const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const Web3 = require("web3");

require("dotenv").config();
const middlewares = require("./middlewares");
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

const web3Client = new Web3(
  new Web3.providers.HttpProvider(
    process.env.NETWORK_URL || "http://localhost:7545"
  )
);

app.get("/create", async (req, res) => {
  // const account = await web3Client.eth.accounts.create();
  const account = await web3Client.eth.personal.newAccount('password');
  res.status(201).json(account);
});

app.get("/create/wallet", async (req, res) => {
  const wallet = await web3Client.eth.accounts.privateKeyToAccount(
    "0xC59605638ED005c93E2A6AE13F6214145A22019e"
  );
  res.status(201).json(wallet);
});

app.get("/balance/:walletAddress", async (req, res) => {
  const { walletAddress } = req.params;
  let walletBalance = await web3Client.eth.getBalance(walletAddress);
  res.status(201).json({ balance: walletBalance});
});

app.get("/send", async (req, res) => {
  try {
    const transaction = await web3Client.eth.sendTransaction({
      from: '0x64206d82EeC6CaE2fa010C365Ca1BDa3803B5C07',
      to: '0x5F3Cb193eB20f24bDD746B9FA33680c292b8fe38', 
      value: web3Client.utils.toWei('1', 'ether') 
    });
    res.status(201).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
