const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");
const router = express.Router();

console.log("v1 route hit");
router.use("/user", userRouter);
router.use("/account", accountRouter)

module.exports = router;