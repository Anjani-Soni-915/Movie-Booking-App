const jwt = require("jsonwebtoken");
const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Expect "Bearer token"

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).send({ message: "Access forbidden" });
      req.user = user;
      next();
    });
  } else {
    res.status(401).send({ message: "No token provided" });
  }
};

module.exports = authenticateJWT;
