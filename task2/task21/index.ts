import http from "http";
import express from "express";
import { userRouter,  groupRouter } from "./routes";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/groups", groupRouter);

app.use("/", function(req, res) {
	res.send("node-ex-api works :-)");
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug("Server listening on port " + port);
