import { Request, Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { GroupModel, UseReausetSchema, UserModel } from "../models";
import { GroupService } from "../services";

const groupService = new GroupService();

export const addGroup = (req: Request, res: Response) => {
	const {name, permissions} = req.body;
  groupService.add({name, permissions} as GroupModel)
    .then(group => res.json(group))
    .catch((error: Error) => res.status(500).send(error));
};
export const addUsersToGroup = (req: ValidatedRequest<UseReausetSchema>, res: Response) => {
	// groupService.add(req.body)
	// 	.then((user: UserModel) => res.json(user))
	// 	.catch((error: Error) => {
	// 		res.status(500).json({ error: error.message });
	// 	});
};
export const getGroups = (req: Request, res: Response) => {
	// const { login, limit } = req.body;
	// groupService.get(login, limit).then((users) => {
	// 	res.json(users);
	// });
};
export const getGroupById = (req: Request, res: Response) => {
	// groupService.getById(req.params.id)
	// 	.then((user: UserModel) => res.json(user))
	// 	.catch((error: Error) => res.status(400).send(error));
};
export const updateGroup = (req: ValidatedRequest<UseReausetSchema>, res: Response) => {
	// groupService.update(req.params.id, req.body)
	// 	.then((user) => res.json(user))
	// 	.catch((error: Error) => res.status(404).send(error));
};
export const deleteGroup = (req: ValidatedRequest<UseReausetSchema>, res: Response) => {
	// groupService.delete(req.params.id).then((user: UserModel) => res.json(user));
};
