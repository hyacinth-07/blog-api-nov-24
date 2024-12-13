import express, { Request, Response, NextFunction } from 'express';
import * as dbFunctions from '../prisma/dbFunctions.js';
import { body, validationResult } from 'express-validator';
import * as types from '../types/types.js';
import bcrypt from 'bcryptjs';
import { authenticate } from 'passport';

// MAIN PAGE

export const mainPage = async (req: Request, res: Response): Promise<void> => {
	const posts = await dbFunctions.getAllPosts();
	let user = {};

	// try this one

	if (req.user) {
		user = { authenticated: true, user: req.user };
	} else {
		user = { authenticated: false };
	}

	//

	console.log(user);

	res.json(posts);
};

// SINGLE ARTICLE PAGE

export const onePostPage = async (
	req: Request,
	res: Response
): Promise<void> => {
	const post = await dbFunctions.getOnePost(req.params.postId);
	res.send(post);
};

// USER HOME PAGE

export const userHomePage = async (
	req: Request,
	res: Response
): Promise<void> => {
	res.send('Welcome user!');
};

// SIGN UP

export const validateSignUp = [
	body('username')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Username is required')
		.escape(),
	body('password')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Password is required')
		.escape(),
	body('email')
		.trim()
		.isLength({ min: 1 })
		.isEmail()
		.withMessage('Email is required')
		.escape(),
];

export const userSignUp = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const username: string = req.body.username;
	const password: string = req.body.password;
	const email: string = req.body.email;
	const confirmPassword: string = req.body.confirmPassword;

	if (password != confirmPassword) {
		res.send('Passwords do not match');
		return;
	}

	const validationErrors = validationResult(req);

	if (!validationErrors.isEmpty()) {
		res.send({ errors: validationErrors.array() });
		return;
	} else {
		try {
			// right now the function allows only for commenter role
			// author log in to be implemented in the future
			const newUser: types.User = {
				name: username,
				email: email,
				password: password,
				isAuthor: false,
			};

			await dbFunctions.addUser(newUser);
			res.redirect('/api');
		} catch (e) {
			return next(e);
		}
	}
};

// LOG OUT
// not currently in use

export const logOut = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.logout((err) => {
		if (err) return next(err);
		res.redirect('/');
	});
};
