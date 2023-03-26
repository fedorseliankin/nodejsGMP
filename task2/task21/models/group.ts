import { DataTypes, Model, Sequelize } from "sequelize";

export type Permission = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";

export class GroupModel extends Model {
	id!: string;
	name!: string;
	permissions!: Permission[];
}

export const initGroupModel = (connectionDb: Sequelize) => GroupModel.init({
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
	},
	name: DataTypes.STRING,
	permissions: DataTypes.ARRAY(DataTypes.STRING),
}, {
	sequelize: connectionDb,
	tableName: "groups",
}).sync();
