import { GroupModel, initModels, UserGroupModel } from "../models";
import { v4 as uuidv4 } from "uuid";
import {startConnection} from "../connection";

export class GroupDataAccessor {
	private readonly groupModel = GroupModel;
	private readonly userGroupModel = UserGroupModel;
	constructor() {
		initModels(startConnection());
	}

	add(group: GroupModel): Promise<GroupModel> {
		const { name, permissions } = group;

		return this.groupModel.create({
			id: uuidv4(),
			name,
			permissions,
		});
	}

	get(): Promise<GroupModel[]> {
		return this.groupModel.findAll();
	}

	getById(id: string): Promise<GroupModel> {
		return this.groupModel.findOne({ where: { id } });
	}

	update(id: string, group: GroupModel) {
		const { name } = group;

		return this.groupModel.update({
			name
		},
		{
			where: { id },
			returning: true,
		});
	}

	addUsersToGroup(groupId: string, usersId: string[]): Promise<number> {
		return this.groupModel.sequelize.transaction((transaction) => {
			return Promise
				.all(usersId.map(
					userId => this.userGroupModel.create({
						groupId,
						userId,
					}, { transaction })))
				.then(res => res.length);
		});
	}

	delete(id: string) {
		return this.groupModel.destroy({ where: { id } });
	}
}
