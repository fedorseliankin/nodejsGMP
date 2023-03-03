import { Sequelize } from "sequelize";
import { defaultConfig } from "../configs";

const connection = new Sequelize(defaultConfig);
connection.authenticate()
	.then(() => console.log("Database connection established"))
	.catch((error) => console.log(`Connection failed: ${error}`));

export { connection };