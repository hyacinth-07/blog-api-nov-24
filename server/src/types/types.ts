export type User = {
	name: string;
	email: string;
	password: string;
	isAuthor: boolean;
};

export type Post = {
	title: string;
	body: string;
	authorId: string;
	isPublished: boolean;
};

export type Comment = {
	body: string;
	authorId: string;
	likes: number;
	dislikes: number;
};

export interface dbForm {
	users: Array<User>;
	posts: Array<Post>;
	comments: Array<Comment>;
}
