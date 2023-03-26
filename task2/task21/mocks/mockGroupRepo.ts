import {GroupModel} from "@models";

export class MockGroupRepository {
	add(userModel: GroupModel): Promise<GroupModel> {
		return Promise.resolve(userModel);
	}
	addUsersToGroup(groupId: string, usersId: string[]): Promise<number> {
		return Promise.resolve(usersId.length);
	}
	get(): Promise<GroupModel[]|null> {
		return Promise.resolve( [{name: 'group1'}, {name: 'group2'}]as GroupModel[]);
	}
	getById(id: string): Promise<GroupModel|null> {
		return Promise.resolve({id, name: 'group1'} as GroupModel);
	}
	update(id: string, user: GroupModel): Promise<[affectedCount: number, affectedRows: GroupModel[]]> {
		return Promise.resolve([1, [user]]);
	}
	delete(_: string): Promise<[number, GroupModel[]]> {
		return Promise.resolve([1, [{} as GroupModel]]);
	}
}