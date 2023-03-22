import { Dialect, Sequelize } from "sequelize";
import pg from "pg";

export const startConnection = () => {
	const connection = new Sequelize(process.env.CONNECTION_STRING, {
		dialect: "postgres" as Dialect,
		dialectModule: pg,});
	connection.authenticate()
		.then(() => console.log("Database connection established"))
		.catch((error) => console.log(`Connection failed: ${error}`));
	return connection;
};