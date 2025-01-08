import { Request, Response } from 'express';
import user from './user.service';

const userController = {
  register: (req: Request, res: Response) => {
    user.register(req).then((result) => {
      res.status(result.statusCode).send(result).end();
    });
  },
  login: (req: Request, res: Response) => {
    user.login(req).then((result) => {
      res.status(result.statusCode).send(result).end();
    });
  },
  whoAmI: (req: Request, res: Response) => {
    user.whoAmI(req).then((result) => {
      res.status(result.statusCode).send(result).end();
    });
  },
  logout: (req: Request, res: Response) => {
    user.logout(req, res).then((result) => {
      res.status(200).send(result).end();
    });
  },
};

export default userController;