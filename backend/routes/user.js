const express = require("express");
const jwt = require("jsonwebtoken");
const z = require("zod");
const { User, Account } = require("../db");
const JWT_SECRET = require("../config");
const authMiddleware = require("../middleware");
const router = express.Router();


const userSchema = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string()
});

const userSigninSchema = z.object({
  username: z.string().email(),
  password: z.string()
})

const updateBodySchema = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

router.post("/signup", async (req, res) => {
  console.log("signup route hit")
  const { username, firstName, lastName, password } = req.body;
  const { success } = userSchema.safeParse(req.body);

  const isUserExist = await User.findOne({ username });
  if (isUserExist || !success) {
    return res.status(403).send({
      message: "Email already taken / Incorrect inputs"
    })
  }

  const user = await User.create({
    username,
    firstName,
    lastName,
    password
  })

  await Account.create({
    userId: user._id,
    balance: 1 + Math.random() * 10000,
  })

  const token = jwt.sign({ id: user._id }, JWT_SECRET);

  res.status(200).send({
    message: "User created successfully",
    token: token,
  });

});


router.post("/signin", authMiddleware, async (req, res) => {
  console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;
  // console.log("username & password", username, password)
  //validating inputs
  const { success } = userSigninSchema.safeParse({ username, password });
  if (!success) {
    return res.status(411).send({
      message: "Error while logging in"
    })
  }

  //finding user in db
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(404).send({
      message: "user not found"
    });
  };

  //creating token
  const token = jwt.sign({ id: user._id }, JWT_SECRET);

  res.status(200).send({
    token: token
  })
})

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBodySchema.safeParse(req.body);
  if (!success) {
    return res.status(411).send({
      message: "Error while updating information"
    })
  }

  await User.findByIdAndUpdate(req.body.userId, req.body);
  res.json({
    message: "Updated successfully"
  })
})

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [{
      firstName: { $regex: filter },
    }, {
      lastName: { $regex: filter }
    }]
  })
  res.json({
    user: users.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    }))
  })
})
module.exports = router;