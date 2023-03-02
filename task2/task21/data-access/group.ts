import { DataTypes, Op, Options, Sequelize } from "sequelize";
import { GroupModel } from "../models";
import { v4 as uuidv4 } from "uuid";

export class GroupDacaAccessor {
	private database: Sequelize;
	private readonly groupModel = GroupModel;

	add(group: GroupModel): Promise<GroupModel> {
		const { name, permissions } = group;

		return this.groupModel.create({
			id: uuidv4(),
			name,
      permissions,
		});
	}

	get(login?: string, limit?: number): Promise<GroupModel[]> {
		return this.groupModel.findAll({
			where: {
				isDeleted: false,
				...(login && {login: {
					[Op.like]: `%${login}%`,
				}}),
			},
			limit,
		});
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

	delete(id: string) {
		return this.groupModel.update({
			isDeleted: true
		},
		{
			where: { id },
			returning: true,
		});
	}
}
