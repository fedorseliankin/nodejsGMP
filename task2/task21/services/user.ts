import { UserModel } from "../models";
import { UserDataAccessor } from "../data-access";


export class UserService {
	private dataAccessor: UserDataAccessor;
	constructor(dataAccessor: UserDataAccessor = new UserDataAccessor()) {
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
		return this.dataAccessor.update(id, {
			login, password, age,
		} as UserModel);
	}

	delete(id: string) {
		return this.dataAccessor.delete(id);
	}
}
