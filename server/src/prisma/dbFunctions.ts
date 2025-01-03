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

export const likeComment = async (userId: string, commentId: string) => {
	// check if user already liked the comment
	const previousLike = await prisma.likedComments.findUnique({
		where: {
			userId_commentId: {
				userId: userId,
				commentId: commentId,
			},
		},
	});

	// if they did, unlike the comment
	if (previousLike) {
		removeLike(userId, commentId);
		const data = getLikeCount(commentId);
		return data;
	} else {
		// if they did not, like the comment
		// and add to the like count
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

		// check if they also disliked it
		const previousDislike = await prisma.dislikedComments.findUnique({
			where: {
				userId_commentId: {
					userId: userId,
					commentId: commentId,
				},
			},
		});
		// if they did, remove the dislike
		if (previousDislike) {
			removeDislike(userId, commentId);
			const data = getLikeCount(commentId);
			return data;
		} else {
			// if they did not, do nothing
			const data = getLikeCount(commentId);
			return data;
		}
	}
};

// REMOVE LIKE

export const removeLike = async (
	userId: string,
	commentId: string
): Promise<void> => {
	await prisma.likedComments.delete({
		where: {
			userId_commentId: {
				userId: userId,
				commentId: commentId,
			},
		},
	});

	await prisma.comment.update({
		where: {
			id: commentId,
		},
		data: {
			likes: { decrement: 1 },
		},
	});
};

// DISLIKE ONE COMMENT

export const dislikeComment = async (userId: string, commentId: string) => {
	// check if user already disliked the comment
	const previousDislike = await prisma.dislikedComments.findUnique({
		where: {
			userId_commentId: {
				userId: userId,
				commentId: commentId,
			},
		},
	});

	// if they did, un-dislike the comment
	if (previousDislike) {
		removeDislike(userId, commentId);
		return;
	} else {
		// if they did not, dislike the comment
		// and add to the dislike count
		await prisma.dislikedComments.create({
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
				dislikes: { increment: 1 },
			},
		});

		// check if they also liked it
		const previousLike = await prisma.likedComments.findUnique({
			where: {
				userId_commentId: {
					userId: userId,
					commentId: commentId,
				},
			},
		});
		// if they did, remove the like
		if (previousLike) {
			removeLike(userId, commentId);
		} else {
			// if they did not, do nothing
			return;
		}
	}
};

// REMOVE DISLIKE

export const removeDislike = async (
	userId: string,
	commentId: string
): Promise<void> => {
	await prisma.dislikedComments.delete({
		where: {
			userId_commentId: {
				userId: userId,
				commentId: commentId,
			},
		},
	});

	await prisma.comment.update({
		where: {
			id: commentId,
		},
		data: {
			dislikes: { decrement: 1 },
		},
	});
};

// GET LIKE COUNT

async function getLikeCount(commentId: string) {
	const data = await prisma.comment.findUnique({
		where: {
			id: commentId,
		},
	});

	if (data === null) return;
	return data;
}

// GET DISLIKE COUNT

// async function getDislikeCount(commentId: string) {
// 	const data = await prisma.comment.findUnique({
// 		where: {
// 			id: commentId,
// 		},
// 	});

// 	if (data === null) return;
// 	return data.dislikes;
// }
