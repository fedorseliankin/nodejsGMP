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
	get(): Promise<GroupModel[]>{
		return this.dataAccessor.get();
	}

	getById(id: string): Promise<GroupModel> {
		return this.dataAccessor.getById(id);
	}

	update(id: string, group: GroupModel): Promise<GroupModel> {
		const {name, permissions} = group;
		return this.dataAccessor.update(id,  new GroupModel({
			name, permissions,
		})).then(([, updatedGroup]) => updatedGroup[0]);
	}

	addUsersToGroup(groupId: string, usersIds: string[]): Promise<number> {
		return this.dataAccessor.addUsersToGroup(groupId, usersIds);
	}

	delete(id: string): Promise<number> {
		return this.dataAccessor.delete(id);
	}
}
