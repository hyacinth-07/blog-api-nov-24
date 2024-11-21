import { PrismaClient } from '@prisma/client';
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
	await prisma.user.create({
		data: {
			name: user.name,
			email: user.email,
			password: user.password,
			isAuthor: user.isAuthor,
		},
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
			},
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
			},
		},
	});

	return onePost;
};
