import { DataTypes, Model } from "sequelize";
import { connection } from "../connection";

export type Permission = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";

export class GroupModel extends Model {
	id!: string;
	name!: string;
	permissions!: Permission[];
}

GroupModel.init({
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
	},
	name: DataTypes.STRING,
	permissions: DataTypes.ARRAY(DataTypes.STRING),
}, {
	sequelize: connection,
	tableName: "groups",
}).sync();