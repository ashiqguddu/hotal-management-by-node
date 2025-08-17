const jwt = require("jsonwebtoken");

const jwtAuthMiddlewate = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "invalid token" });
  }
  //  extract the jwt form the request headers
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // verify the JWT token
    const decoded = jwt.verify(token, process.env.Jwt_secretKey);

    //  attch user information to the request object

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "invalid token " });
  }
};
// generate Jwt token
const generateToken = function (userData) {
  // generate a new JWT token using User data
  return jwt.sign(userData, process.env.Jwt_secretKey);
};
module.exports = { jwtAuthMiddlewate, generateToken };
