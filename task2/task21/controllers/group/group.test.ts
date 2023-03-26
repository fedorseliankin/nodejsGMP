import {createRequest, createResponse} from "node-mocks-http";
import { MockGroupRepository } from "../../mocks/mockGroupRepo";
import { getGroups, addGroup, getGroupById, deleteGroup, updateGroup, addUsersToGroup } from "./group";
jest.mock("../../data-access/group.ts", () => ({
	GroupDataAccessor: MockGroupRepository 
}));

describe("Group controller", () => {
	describe("getGroups", () => {
		it("return all groups", async () => {
			const req = createRequest({
				method: "GET",
			});
			const res = createResponse();
			jest.spyOn(res, "send");
			await getGroups(req, res);
			expect(res.send).toBeCalledWith([
        { name: 'group1'},
        { name: 'group2' },
      ]);
		});
	});
	describe("getUserById", () => {
		it("return user by id", async () => {
			const req = createRequest({
				method: "GET",
        params: {id: '1'},
			});
			const res = createResponse();
			jest.spyOn(res, "json");
			await getGroupById(req, res);
			expect(res.json).toBeCalledWith({
        name: 'group1',
        id: '1',
      });
		});
	});
	describe("addUser", () => {
		it("add user", async () => {
			const req = createRequest({
				method: "POST",
        body: {id: '1', login: '1'}
			});
			const res = createResponse();
			jest.spyOn(res, "json");
			await addGroup(req, res);
			expect(res.json).toBeCalledWith({name: undefined, permissions: undefined,});
		});
	});
	describe("addUser", () => {
		it("add user", async () => {
			const req = createRequest({
				method: "POST",
        body: {groupId: '1', userIds: ['1', '2']}
			});
			const res = createResponse();
			jest.spyOn(res, "json");
			await addUsersToGroup(req, res);
			expect(res.json).toBeCalledWith(2);
		});
	});
	describe("updateUser", () => {
		it("update user", async () => {
			const req = createRequest({
				method: "PUT",
        params: {id: '1'},
        body: {name: 'name', permissions: 'READ'},
			});
			const res = createResponse();
      jest.spyOn(res, "json");
			await updateGroup(req, res);
			expect(res.json).toBeCalledWith({name: 'name', permissions: 'READ'});
		});
	});
	describe("deleteUser", () => {
		it("delete all users", async () => {
			const req = createRequest({
				method: "DELETE",
        params: {id: '1'},
			});
			const res = createResponse();
			jest.spyOn(res, "json");
			await deleteGroup(req, res);
			expect(res.json).toBeCalledWith([1, [{}]]);
		});
	});
});
