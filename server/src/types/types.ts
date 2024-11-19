export type Post = {
	title: string;
	body: string;
	authorId: string;
	isPublished: boolean;
};

export type User = {
	name: string;
	email: string;
	password: string;
	isAuthor: boolean;
};
