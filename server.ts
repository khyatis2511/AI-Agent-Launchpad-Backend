import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import sessionMiddleware from "./middleware/session.middleware";
import applyUserRoutes from "./modules/user/user.routes";
import applyAgentRoutes from "./modules/agent/agent.routes";

dotenv.config();

const PORT = process.env.PORT ?? 3088;
const app = express();
const router = express.Router();

// console.log('process : ', process.env.DATABASE_URL, process.env.PORT )

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware)

app.use(cors({
  origin: ["http://localhost:3000", "https://ai-agent-launchpad-frontend.vercel.app/"],
  credentials: true,
}));

app.use('/ai/v1/user', applyUserRoutes(router));
app.use('/ai/v1/agent', applyAgentRoutes(router));

app.get('/', (req, res) => {
  res.json('hello word').end();
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
