
import { Router } from "express";
import { createValidator } from "express-joi-validation";
import { userPostSchema, UserUpdateSchema } from "../models";
import { getUsers, getUserById, addUser, updateUser, deleteUser } from "../controllers";


const validator = createValidator();

export default Router()
	.post("/", validator.body(userPostSchema), addUser)
	.get("/", getUsers)
	.get("/:id", getUserById)
	.put("/:id", validator.body(UserUpdateSchema), updateUser)
	.delete("/:id", deleteUser);
