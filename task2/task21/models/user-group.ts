import { Model, DataTypes, BelongsToManyOptions } from "sequelize";
import { connection } from "../connection";
import { GroupModel } from "./group";
import { UserModel } from "./user";

export class UserGroupModel extends Model {
	userId!: string;

	groupId!: string;
}

UserGroupModel.init({
	userId: DataTypes.UUID,
	groupId: DataTypes.UUID,
}, {
	sequelize: connection,
	tableName: "userGroup",
}).sync();

GroupModel.belongsToMany(UserModel, {
	through: UserGroupModel,
	foreignKey: "groupId",
	onDelete: "CASCADE",
} as BelongsToManyOptions);


UserModel.belongsToMany(GroupModel, {
	through: UserGroupModel,
	foreignKey: "userId",
	onDelete: "CASCADE",
} as BelongsToManyOptions);