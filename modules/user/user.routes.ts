import { Router } from 'express';
import userController from './user.controller';
import isAuthenticated from '../../middleware/autheticate.middleware';

const applyUserRoutes = (app : Router) => {
  app.post('/register', userController.register);
  app.post('/login', userController.login);
  app.get('/who-am-i', isAuthenticated, userController.whoAmI);
  app.post('/logout', userController.logout);

  return app;
};

export default applyUserRoutes;