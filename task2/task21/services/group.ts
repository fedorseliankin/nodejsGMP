import { GroupModel } from "../models";
import { GroupDataAccessor } from "../data-access";


export class GroupService {
	private dataAccessor: GroupDataAccessor;
	constructor(dataAccessor: GroupDataAccessor = new GroupDataAccessor()) {
		this.dataAccessor = dataAccessor;
	}

	add(group: GroupModel): Promise<GroupModel> {
		return this.dataAccessor.add(group);
	}
	get(): Promise<GroupModel[]>{
		return this.dataAccessor.get();
	}

	getById(id: string): Promise<GroupModel> {
		return this.dataAccessor.getById(id);
	}

	update(id: string, group: GroupModel) {
		return this.dataAccessor.update(id,  group);
	}

	addUsersToGroup(groupId: string, usersIds: string[]): Promise<number> {
		return this.dataAccessor.addUsersToGroup(groupId, usersIds);
	}

	delete(id: string): Promise<number> {
		return this.dataAccessor.delete(id);
	}
}
