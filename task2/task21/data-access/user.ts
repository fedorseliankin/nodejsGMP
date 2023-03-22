import { Op } from "sequelize";
import { UserModel, initModels } from "../models";
import { v4 as uuidv4 } from "uuid";
import {startConnection} from "../connection";

export class UserDataAccessor {
	private readonly userModel = UserModel;
	constructor() {
		initModels(startConnection());
	}

	add(user: UserModel): Promise<UserModel> {
		const { login, password, age, isDeleted = false } = user;

		return this.userModel.create({
			id: uuidv4(),
			login,
			password,
			age, 
			isDeleted,
		});
	}

	get(login?: string, limit?: number): Promise<UserModel[]> {
		return this.userModel.findAll({
			where: {
				isDeleted: false,
				...(login && {login: {
					[Op.like]: `%${login}%`,
				}}),
			},
			limit,
		});
	}

	getById(id: string): Promise<UserModel> {
		return this.userModel.findOne({ where: { id } });
	}

	update(id: string, user: UserModel) {
		const { login, password, age } = user;

		return this.userModel.update({
			login,
			password,
			age,
		},
		{
			where: { id },
			returning: true,
		});
	}

	delete(id: string) {
		return this.userModel.update({
			isDeleted: true
		},
		{
			where: { id },
			returning: true,
		});
	}
}
