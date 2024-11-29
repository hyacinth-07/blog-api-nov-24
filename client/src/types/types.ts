export type Post = {
	id: string;
	title: string;
	body: string;
	authorId: string;
	isPublished: boolean;
	comments: Array<Comment>;
	createdAt: string | Date;
	updatedAt: string | Date;
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
};
