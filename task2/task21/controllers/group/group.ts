import { Request, Response } from "express";
import { GroupModel } from "../../models";
import { GroupService } from "../../services";

const groupService = new GroupService();

export const addGroup = (req: Request, res: Response) => {
	const {name, permissions} = req.body;
	groupService.add({name, permissions} as GroupModel)
		.then(group => res.json(group))
		.catch((error: Error) => res.status(500).send(error));
};
export const addUsersToGroup = (req: Request, res: Response) => {
	const {groupId, userIds} = req.body;
	groupService.addUsersToGroup(groupId, userIds)
		.then((num) => res.json(num))
		.catch((error: Error) => {
			res.status(500).json({ error: error.message });
		});
};
export const getGroups = (_: Request, res: Response) => {
	groupService.get().then(group => res.send(group));
};
export const getGroupById = (req: Request, res: Response) => {
	groupService.getById(req.params.id)
		.then((group: GroupModel) => res.json(group))
		.catch((error: Error) => res.status(400).send({error}));
};
export const updateGroup = (req: Request, res: Response) => {
	groupService.update(req.params.id, req.body)
		.then(([_, groups]) => res.json(groups[0]))
		.catch((error: Error) => res.status(404).send(error));
};
export const deleteGroup = (req: Request, res: Response) => {
	groupService.delete(req.params.id).then(num => res.json(num));
};
