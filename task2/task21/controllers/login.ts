import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET, TIME_EXPIRATION } from "../consts";

export const login = (req: Request, res: Response) => {
	const {username, password} = req.body;
	if (!username || !password) {
		res.status(403).json({message: "invalid credentials"});
	} else {
		res.send(jwt.sign({username}, SECRET , { expiresIn: TIME_EXPIRATION })); 
	}
};
