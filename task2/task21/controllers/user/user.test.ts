import {createRequest, createResponse} from "node-mocks-http";
import { MockUserRepository } from "../../mocks/mockUserRepo";
import { addUser, deleteUser, getUserById, getUsers, updateUser } from "./user";

jest.mock("../../data-access/user.ts", () => ({
	UserDataAccessor: MockUserRepository 
}));

describe("User controller", () => {
	describe("getUsers", () => {
		it("return all users", async () => {
			const req = createRequest({
				method: "GET",
			});
			const res = createResponse();
			jest.spyOn(res, "json");
			await getUsers(req, res);
			expect(res.json).toBeCalledWith([
        { login: '1'},
        { login: '2' },
      ]);
		});
		it("filter users by Login", async () => {
			const req = createRequest({
				method: "GET",
				body: {login: "1", linit: 1},
			});
			const res = createResponse();
			jest.spyOn(res, "json");
			await getUsers(req, res);
			expect(res.json).toBeCalledWith([
        { login: '1'},
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
			await getUserById(req, res);
			expect(res.json).toBeCalledWith({
        login: '1',
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
			await addUser(req, res);
			expect(res.json).toBeCalledWith({id: '1', login: '1'});
		});
	});
	describe("updateUser", () => {
		it("update user", async () => {
      const user = {login:'1', password: '1', age: 3};
			const req = createRequest({
				method: "PUT",
        params: {id: '1'},
        body: user,
			});
			const res = createResponse();
      jest.spyOn(res, "json");
			await updateUser(req, res);
			expect(res.json).toBeCalledWith({login: "updated", ...user});
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
			await deleteUser(req, res);
			expect(res.json).toBeCalledWith({isDeleted: true, "login": "deleted",});
		});
	});
});
