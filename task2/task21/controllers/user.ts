import { Request, Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { UseReausetSchema, UserModel } from "../models";
import { UserService } from "../services";

const userService = new UserService();

export const addUser = (req: ValidatedRequest<UseReausetSchema>, res: Response) => {
	userService.add(req.body)
		.then((user: UserModel) => res.json(user))
		.catch((error: Error) => {
			res.status(500).json({ error: error.message });
		});
};
export const getUsers = (req: Request, res: Response) => {
	const { login, limit } = req.body;
	userService.get(login, limit).then((users) => {
		res.json(users);
	});
};
export const getUserById = (req: Request, res: Response) => {
	userService.getById(req.params.id)
		.then((user: UserModel) => res.json(user))
		.catch((error: Error) => res.status(400).send(error));
};
export const updateUser = (req: ValidatedRequest<UseReausetSchema>, res: Response) => {
	userService.update(req.params.id, req.body)
		.then((user) => res.json(user))
		.catch((error: Error) => res.status(404).send(error));
};
export const deleteUser = (req: ValidatedRequest<UseReausetSchema>, res: Response) => {
	userService.delete(req.params.id).then((user: UserModel) => res.json(user));
};
