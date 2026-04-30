import express from "express";
import dotenv from "dotenv";
import baseUserRoute from "./route/User.route.js"
import baseStreamRoute from "./route/stream.route.js"
import baseRequestRoute from "./route/request.route.js"
import baseChatRoute from "./route/chat.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

let app = express();
dotenv.config({ path: "../.env" });
app.use(express.json())
app.use(
  cors({
    origin: "https://meetingtime-1.onrender.com",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static("public"))
app.use('/userapi',baseUserRoute);
app.use('/requestapi',baseRequestRoute);
app.use('/chatapi',baseChatRoute);
app.use('/streamapi',baseStreamRoute);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  express.static(path.join(__dirname, "../../frontend/meetingTime/dist"))
);
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/meetingTime/dist/index.html"));
});
export {app}