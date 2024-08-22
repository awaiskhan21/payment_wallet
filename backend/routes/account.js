const express = require("express");
const authMiddleware = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();


router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.body.userId
  });
  res.status(200).send({
    balance: account.balance
  })
})

router.post("/transfer", authMiddleware, async (req, res) => {

  const session = await mongoose.startSession();
  const { amount, to, userId } = req.body;

  session.startTransaction();
  const account = Account.findOne({ userId }).session(session);
  if (account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).send({
      message: "Insufficient balance "
    })
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account"
    })
  }

  //performing the transfer
  await Account.updateOne({ userId }, { $inc: { balance: -amount } }).session(session);
  await Account.updateOne({ to }, { $inc: { balance: amount } }).session(session);

  //commit transaction
  await session.commitTransaction();
  res.json({
    message: "transaction successful"
  })
})
module.exports = router;