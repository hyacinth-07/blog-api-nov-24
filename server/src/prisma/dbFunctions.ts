import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

// TYPES
import * as types from '../types/types.js';

// ADD POST

export const addPost = async (post: types.Post): Promise<void> => {
	await prisma.post.create({
		data: {
			title: post.title,
			body: post.body,
			authorId: post.authorId,
			isPublished: post.isPublished,
		},
	});
};

// ADD USER

export const addUser = async (user: types.User): Promise<void> => {
	const newUser = await prisma.user.create({
		data: {
			name: user.name,
			email: user.email,
			password: user.password,
			isAuthor: user.isAuthor,
		},
	});
	console.log(newUser);
};
