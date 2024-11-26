import { Request, Response, NextFunction } from 'express';

export const logUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	if (req.user === undefined) {
		console.log('no user logged in');
		next();
		return;
	}
	console.log(req.user);
	next();
};
