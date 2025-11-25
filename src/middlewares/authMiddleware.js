import jwt from 'jsonwebtoken'

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization
  if(!authHeader){
    return res.status(401).json({message: "Token missing"})
  }

  const [, token] = authHeader.split(" ")

  if(!token){
    return res.status(401).json({message: "Token format invalid"})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(401).json({message: "Invalid token"})
  }
}
