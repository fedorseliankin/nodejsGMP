import { BelongsToManyOptions, Sequelize } from "sequelize";
import { GroupModel, initGroupModel } from "./group";
import { initUserModel, UserModel } from "./user";
import { initUserGroupModel, UserGroupModel } from "./user-group";

export const initModels = (connectionDb: Sequelize) => {
	initUserGroupModel(connectionDb);
	initGroupModel(connectionDb);
	initUserModel(connectionDb);
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
};