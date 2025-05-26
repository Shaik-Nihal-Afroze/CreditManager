import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwtToken", token, {
    maxAge:  24 * 60 * 60 * 1000, // MS
    httpOnly: true,
    secure: true,           
    sameSite: 'None' 
  });

  return token;
};