import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { logger } from "./middlewares/logEvents.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { corOptions } from "./config/cors.js";
import rootRouter from "./routes/root.js";
import registerRouter from "./routes/auth/register.js";
import loginRouter from "./routes/auth/login.js";
import usersRouter from "./routes/users.js";
import verifyJWT from "./middlewares/verifyJWT.js";
import refreshTokenRouter from "./routes/refreshToken.js";
import logoutRouter from "./routes/auth/logout.js";
import credentials from "./middlewares/credentials.js";
import connectMongo from "./db/mongo.js";
import { fileURLToPath } from "url";
import path from "path";
import booksRouter from "./routes/books.js";
import studentsRouter from "./routes/students.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// connecting to mongo
connectMongo();

// middlewares
app.use(credentials);
app.use(cors(corOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// logger middleware
app.use(logger);

// Routes
// Test Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/api/v1/", rootRouter);
app.use("/auth/register", registerRouter);
app.use("/auth/login", loginRouter);
app.use("/auth/logout", logoutRouter);
app.use("/api/v1/tokens/refresh", refreshTokenRouter);

app.use("/api/v1/users", usersRouter);

app.use(verifyJWT);

app.use("/api/v1/books", booksRouter);
app.use("/api/v1/students", studentsRouter);

// Listening to Database
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB.");
});

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

app.use(errorHandler);
