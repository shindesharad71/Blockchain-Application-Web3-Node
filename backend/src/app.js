const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const Web3 = require("web3");
const mongoose = require("mongoose");

require("dotenv").config();
const middlewares = require("./middlewares");
const AccountSchema = require("./models/account");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// Connect to MongoDB.
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.connect("mongodb://localhost:27017/blockchain", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const web3Client = new Web3(
  new Web3.providers.HttpProvider(
    process.env.NETWORK_URL || "http://localhost:7545"
  )
);

app.get("/create", async (req, res) => {
  try {
    const accountCreated = await web3Client.eth.accounts.create();
    const account = new AccountSchema.Account(accountCreated);
    const result = await account.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.get("/user/:userId", async (req, res) => {
  try {
    const {userId} = req.params;
    const result = await AccountSchema.Account.findById(userId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.get("/balance/:walletAddress", async (req, res) => {
  try {
    const { walletAddress } = req.params;
    let walletBalance = await web3Client.eth.getBalance(walletAddress);
    walletBalance = web3Client.utils.fromWei(walletBalance, "ether");
    res.status(201).json({ balance: walletBalance });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.get("/send", async (req, res) => {
  try {
    const transaction = await web3Client.eth.sendTransaction({
      from: "0x64206d82EeC6CaE2fa010C365Ca1BDa3803B5C07",
      to: "0x5F3Cb193eB20f24bDD746B9FA33680c292b8fe38",
      value: web3Client.utils.toWei("1", "ether")
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
