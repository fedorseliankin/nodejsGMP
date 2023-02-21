import http from "http";
import express from "express";
import router from "./routes";

const app = express();
app.use(express.json());

app.use("/items", router);

app.use("/", function(req, res) {
	res.send("node-ex-api works :-)");
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug("Server listening on port " + port);
