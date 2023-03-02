import { DataTypes, Op, Options, Sequelize } from "sequelize";
import { UserModel } from "../models";
import { defaultConfig } from "../configs";
import { v4 as uuidv4 } from "uuid";

export class UserDacaAccessor {
	private database: Sequelize;
	private readonly userModel = UserModel;
	constructor(config: Options = defaultConfig){
		this.createConnection(config);
		this.initModel();
	}

	private async createConnection(config: Options) {
		this.database = new Sequelize(config);
		try {
			await this.database.authenticate();
			console.log("Database connection established");
		} catch (error) {
			console.log(`Connection failed: ${error}`);
		}
	}
  
	private async initModel(): Promise<void> {
		this.userModel.init({
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
			sequelize: this.database,
			tableName: "users",
		}).sync();
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
