import { Router } from "express";
import { getGroups, addGroup, getGroupById, deleteGroup, updateGroup, addUsersToGroup } from "../controllers";

export const groupRouter = Router()
	.post("/", addGroup)
	.post("/addUsersToGroup", addUsersToGroup)
	.get("/", getGroups)
	.get("/:id", getGroupById)
	.put("/:id", updateGroup)
	.delete("/:id", deleteGroup);
