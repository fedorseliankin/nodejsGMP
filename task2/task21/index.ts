import http from "http";
import express from "express";
import { userRouter,  groupRouter } from "./routes";
import { internalServerErrorHandler, logger, myLogger } from "./middleware";

const app = express();
app.use(express.json());
app.use(myLogger);

app.use("/users", userRouter);
app.use("/groups", groupRouter);

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
