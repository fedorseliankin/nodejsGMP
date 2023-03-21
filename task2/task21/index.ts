import http from "http";
import express from "express";
import { userRouter,  groupRouter } from "./routes";
import { checkAuthToken, internalServerErrorHandler, logger, myLogger } from "./middleware";
import { loginRouter } from "./routes/login";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(myLogger);

app.use("/login", loginRouter);
app.use("/users", checkAuthToken, userRouter);
app.use("/groups", checkAuthToken, groupRouter);

app.use("/", function(_, res) {
	res.send("node-ex-api works :-)");
});
app.use(internalServerErrorHandler);

process.on("uncaughtException", (error, source) => {
	logger.error(`${source}: ${ error}`);
	process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
	logger.error("Unhandled Rejection at:", promise, "reason:", reason);
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
logger.info("Server listening on port " + port);
