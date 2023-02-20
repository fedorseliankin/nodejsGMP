import pg from "pg";
import { Dialect } from "sequelize";
export const defaultConfig = {
	host: "localhost",
	port: 5432,
	database: "postgres",
	username: "fedor",
	dialect: "postgres" as Dialect,
	dialectModule: pg,
};