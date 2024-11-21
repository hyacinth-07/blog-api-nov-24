import { Request, Response } from 'express';
import * as dbFunctions from '../prisma/dbFunctions.js';

// MAIN PAGE

export const mainPage = async (req: Request, res: Response): Promise<void> => {
	const posts = await dbFunctions.getAllPosts();
	res.send(posts);
};

export const onePostPage = async (
	req: Request,
	res: Response
): Promise<void> => {
	const post = await dbFunctions.getOnePost(req.params.postId);
	res.send(post);
};

export const userHomePage = async (
	req: Request,
	res: Response
): Promise<void> => {
	res.send('Welcome user!');
};
