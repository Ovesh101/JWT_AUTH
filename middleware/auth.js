

import jwt from "jsonwebtoken"

import  {UnauthenticatedError}  from "../errors/index.js"

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log("req.header" , req.headers);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    req.user = { id, username }
    console.log(req.user);
    next()
  } catch (error) {
    return res.status(401).json({err : "cant access this route"})
  }
}


export default authenticationMiddleware
