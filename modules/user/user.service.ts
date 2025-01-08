/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import { Request, Response } from 'express';
import { Session } from 'express-session';
import { msgs, returnRes } from '../../utils/messages';
import prisma from "../../prisma/prisma.service";



const user = {
  register: async (req : Request) => {
    const { email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userDetails = await prisma.user.create({
        data: { email, password: hashedPassword },
      });
      if (userDetails) {
        (req.session as Session & { userId?: string }).userId = userDetails.id;
        const { id, email } = userDetails;
        return returnRes(200, msgs.registered, { id, email });
      }
      return returnRes(400, msgs.somethingWrong);
    } catch (error: any) {
      console.error('[ register error : ]',error);
      if (error.message !== undefined) {
        if (error.name === 'MongoServerError' && error.message.includes('duplicate')) {
          return returnRes(409, msgs.emailExist);
        } else if (error.name === 'PasswordError') {
          return returnRes(400, error.message);
        }
        return returnRes(400, msgs.somethingWrong);
      }
      return returnRes(400, msgs.somethingWrong);
    }
  },
  login: async (req : Request) => {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return returnRes(401, msgs.unauthorized);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return returnRes(401, msgs.invalidPassword);

      (req.session as Session & { userId?: string }).userId = user.id;
      if (isMatch) {
        const { id, name, email } = user;
        return returnRes(200, msgs.loggedIn, { id, name, email });
      }

      return returnRes(401, msgs.unauthorized);
    } catch (error: any) {
      console.error('[ login error : ]',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
  whoAmI: async (req: Request) => {
    try {
      const userId = (req.session as Session & { userId?: string }).userId
      const userData = await prisma.user.findUnique({where: {id: userId }});
      if (userData) {
        const { id, name, email } = userData;
        return returnRes(200, msgs.dataSent, { id, name, email });
      }
      return returnRes(400, msgs.somethingWrong);
    } catch (error: any) {
      console.error('[ whoAmI error : ]',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
  logout: async (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) return returnRes(500, msgs.logoutFailed);
      res.clearCookie("connect.sid");
      return returnRes(200, msgs.loggedOut);
    });
  },
};

export default user;