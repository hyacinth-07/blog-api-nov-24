import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import bcrypt from 'bcryptjs';

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
	bcrypt.hash(user.password, 10, async (err, hashedPassword) => {
		if (err) return err;
		user.password = hashedPassword;
		await prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: user.password,
				isAuthor: user.isAuthor,
			},
		});
	});
};

// ADD COMMENT

export const addComment = async (comment: types.Comment): Promise<void> => {
	await prisma.comment.create({
		data: {
			body: comment.body,
			authorId: comment.authorId,
			postCommentId: comment.postCommentId,
			likes: comment.likes,
			dislikes: comment.dislikes,
		},
	});
};

// GET ALL COMMENTS

export const getAllPosts = async (): Promise<types.Post[]> => {
	const allPosts = await prisma.post.findMany({
		where: {
			isPublished: true,
		},
		include: {
			comments: {
				orderBy: {
					likes: 'desc',
				},
				include: {
					author: true,
				},
			},
			author: true,
		},
	});
	return allPosts;
};

// GET ONE COMMENT

export const getOnePost = async (
	commentId: string
): Promise<types.Post | null> => {
	const onePost = await prisma.post.findUnique({
		where: {
			isPublished: true,
			id: commentId,
		},
		include: {
			comments: {
				orderBy: {
					likes: 'desc',
				},
				include: {
					author: true,
				},
			},
			author: true,
		},
	});

	return onePost;
};

// LIKE ONE COMMENT

export const likeComment = async (
	userId: string,
	commentId: string
): Promise<void> => {
	await prisma.likedComments.create({
		data: {
			userId: userId,
			commentId: commentId,
		},
	});

	await prisma.comment.update({
		where: {
			id: commentId,
		},
		data: {
			likes: { increment: 1 },
		},
	});
};

// DISLIKE ONE COMMENT
