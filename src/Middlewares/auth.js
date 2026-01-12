const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let token =
      req.headers.authorization?.split(" ")[1] || req.cookies?.auth_token; // 👈 COOKIE TOKEN
    if (token) {
      const user = jwt.verify(token, process.env.SECRET_KEY); //verify token
      console.log("User:", user);
      req.userId = user.id; //attach user id to request object
      next(); //only call next if token is valid
    } else {
      res.status(401).json({ message: "Unauthorized user" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};

module.exports = auth;
