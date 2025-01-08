import { NextFunction, Request, Response } from "express";
import { msgs } from "../utils/messages";
import { Session } from "express-session";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) : void => {
  const sessionUserId = (req.session as Session & { userId?: string }).userId
  if (!sessionUserId) {
    res.status(401).send({message: msgs.unauthorized}).end();
    return;
  }
  next();
};

export default isAuthenticated;
