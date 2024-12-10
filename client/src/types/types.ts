export type Post = {
	id: string;
	title: string;
	body: string;
	authorId: string;
	isPublished: boolean;
	comments: Array<Comment>;
	createdAt: string | Date;
	updatedAt: string | Date;
	author: User;
};

export type Comment = {
	id: string;
	body: string;
	authorId: string;
	postCommentId: string;
	likes: number;
	dislikes: number;
	createdAt: string | Date;
	updatedAt: string | Date;
	author: User;
};

export type User = {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: string | Date;
	isAuthor: boolean;
};

export type Login = {
	username: string;
	password: string;
};
