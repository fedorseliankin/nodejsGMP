import { GroupModel } from "../models";
import { GroupDacaAccessor } from "../data-access";


export class GroupService {
	private dataAccessor: GroupDacaAccessor;
	constructor(dataAccessor: GroupDacaAccessor = new GroupDacaAccessor()) {
		this.dataAccessor = dataAccessor;
	}

	add(group: GroupModel): Promise<GroupModel> {
		return this.dataAccessor.add(group);
	}
	get(login?: string, limit?: number): Promise<GroupModel[]>{
		return this.dataAccessor.get(login, limit);
	}

	getById(id: string) {
		return this.dataAccessor.getById(id);
	}

	update(id: string, user: GroupModel) {
		// const {login, password, age} = user;
		// return this.dataAccessor.update(id,  new GroupModel({
		// 	login, password, age,
		// })).then(([, updatedUser]) => updatedUser[0]);
	}

	delete(id: string) {
		return this.dataAccessor.delete(id)
			.then(([, updatedUser]) => updatedUser[0]);
	}
}
