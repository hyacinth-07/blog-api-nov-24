import { Comment } from './Comments';

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
