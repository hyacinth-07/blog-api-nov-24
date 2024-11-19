import { Request, Response } from 'express';

// MAIN PAGE

export const mainPage = async (req: Request, res: Response): Promise<void> => {
	res.send('This is the main page');
	return;
};
