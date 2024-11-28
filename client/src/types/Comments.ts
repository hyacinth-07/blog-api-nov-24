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
