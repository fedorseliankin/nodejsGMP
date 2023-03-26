import {UserModel} from "@models";

export class MockUserRepository {
	add(userModel: UserModel): Promise<UserModel> {
		return Promise.resolve(userModel);
	}
	get(login?: string, limit?: number): Promise<UserModel[]|null> {
    if (login === '1'){
      return Promise.resolve([
        {login: '1'},
      ] as UserModel[]);
    }
    if (login === '2') {
      return Promise.resolve([
        {login: '2'},
      ] as UserModel[]);
    }
		return Promise.resolve([
      {login: '1'},
      {login: '2'},
    ] as UserModel[]);
	}
	getById(id: string): Promise<UserModel|null> {
		return Promise.resolve({
      id,
      login: id,
    } as UserModel);
	}
	update(id: string, user: UserModel): Promise<[affectedCount: number, affectedRows: UserModel[]]> {
		return Promise.resolve([1, [user]]);
	}
	delete(_: string): Promise<[number, UserModel[]]> {
		return Promise.resolve([1, [{isDeleted: true, login: 'deleted', } as UserModel]]);
	}
}