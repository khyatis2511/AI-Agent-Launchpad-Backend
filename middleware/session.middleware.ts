import MongoStore from "connect-mongo";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET ?? "secret",
  resave: false,
  saveUninitialized: true,
  proxy: true,
  name: 'MyCoolWebAppCookieName', 
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL
  }),
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "none",
  },
});

export default sessionMiddleware;
