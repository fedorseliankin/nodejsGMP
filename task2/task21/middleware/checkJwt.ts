import {NextFunction, Request, Response} from "express";
import { verify } from "jsonwebtoken";
import { SECRET } from "../consts";

export const checkAuthToken = (req: Request, res: Response, next: NextFunction): void => {
	const token = req.headers["x-access-token"] as string;

	if (!token){
		res.status(403)
			.send({success: false, message: "No token provided."});
		return;
	}
	verify(token, SECRET, (err) => {
		if (err) {
			res.status(403).json({
				success: false,
				message:  err.message,
			});
		} else {
			next();
		}
	});
};
