import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
// ADD POST
export const addPost = async (post) => {
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
export const addUser = async (user) => {
    bcrypt.hash(user.password, 10, async (err, hashedPassword) => {
        if (err)
            return err;
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
export const addComment = async (comment) => {
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
export const getAllPosts = async () => {
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
export const getOnePost = async (commentId) => {
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
