import { Comment } from '../types/types';
import DateComponent from './Date';
import ThumbsUp from '../assets/thumbs-up-svgrepo-com.svg?react';
import ThumbsDown from '../assets/thumb-down-svgrepo-com.svg?react';

type CommentProp = {
	elem: Comment;
};

export default function CommentBox({ elem }: CommentProp) {
	const date = (
		<DateComponent createdAt={elem.createdAt} updatedAt={elem.updatedAt} />
	);

	return (
		<>
			<article className="*:font-openSans flex flex-col m-4 *:m-2 bg-brown-300 rounded-lg">
				<section className="self-end">
					<p>
						comment by {elem.author.name}, {date}
					</p>
				</section>
				<p>{elem.body}</p>
				<section className="self-end flex gap-3 min-h-8 *:items-center">
					<span className="flex gap-3">
						<ThumbsUp className="w-6 h-6" />
						{elem.likes}
					</span>
					<span className="flex gap-3">
						<ThumbsDown className="w-6 h-6" />
						{elem.dislikes}
					</span>
				</section>
			</article>
		</>
	);
}
