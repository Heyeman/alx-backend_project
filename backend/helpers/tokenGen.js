const crypto = require("crypto"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
const genJwt = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};
const genKey = async () => {
  const token = crypto.randomUUID(),
    hashedToken = await bcrypt.hash(token, 10);
  return hashedToken;
};
module.exports = { genJwt, genKey };
