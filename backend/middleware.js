const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);

  if (!token) {
    res.status(403).json({
      message: "issue with authentication"
    })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body.userId = decoded.id;
    console.log(decoded)
    next()
  } catch (e) {
    return res.status(403).json({
      message: "Invalid token"
    })
  }
}

module.exports = authMiddleware;