import { Model, DataTypes, Sequelize } from "sequelize";

export class UserGroupModel extends Model {
	userId!: string;

	groupId!: string;
}
export const initUserGroupModel = (connectionDb: Sequelize) => 
	UserGroupModel.init({
		userId: DataTypes.UUID,
		groupId: DataTypes.UUID,
	}, {
		sequelize: connectionDb,
		tableName: "userGroup",
	}).sync();
