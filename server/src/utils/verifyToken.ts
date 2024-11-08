import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).json({ message: "token not found" });
    }

    const decoded = jwt.verify(token, "NkCHChjrYthCqco4OWBtIgD0YhKP9Okr");
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyToken;
