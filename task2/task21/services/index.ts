import { UserModel } from "../models";
import { UserDacaAccessor } from "../data-access";


export class UserService {
	private dataAccessor: UserDacaAccessor;
	constructor(dataAccessor: UserDacaAccessor) {
		this.dataAccessor = dataAccessor;
	}

	add(user: UserModel): Promise<UserModel> {
		return this.dataAccessor.add(user);
	}
	get(login?: string, limit?: number): Promise<UserModel[]>{
		return this.dataAccessor.get(login, limit);
	}

	getById(id: string) {
		return this.dataAccessor.getById(id);
	}

	update(id: string, user: UserModel) {
		const {login, password, age} = user;
		return this.dataAccessor.update(id,  new UserModel({
			login, password, age,
		})).then(([, updatedUser]) => updatedUser[0]);
	}

	delete(id: string) {
		return this.dataAccessor.delete(id)
			.then(([, updatedUser]) => updatedUser[0]);
	}
}
