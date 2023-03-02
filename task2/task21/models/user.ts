import Joi from "joi";
import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";
import { DataTypes, Model } from "sequelize";
import { connection } from "../connection";

export class UserModel extends Model {
	id?: string;
	login!: string;
	password!: string;
	age!: number;
	isDeleted?: boolean;
}

export const userPostSchema = Joi.object<UserModel>({
	id: Joi.string(),
	login: Joi.string().required(),
	password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
	age: Joi.number().min(4).max(130).required(),
	isDeleted: Joi.boolean(),
});

export const UserUpdateSchema = userPostSchema.fork(
	["login", "password", "age", "isDeleted"],
	(schema) => schema.optional(),
);

export interface UseReausetSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UserModel;
}

UserModel.init({
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
	},
	login: DataTypes.STRING,
	password: DataTypes.STRING,
	age: DataTypes.SMALLINT,
	isDeleted: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
}, {
	sequelize: connection,
	tableName: "users",
}).sync();
