import { Comment } from '../types/types';
import formatDate from '../utilities/dateFormatter';

type CommentProp = {
	elem: Comment;
};

export default function CommentBox({ elem }: CommentProp) {
	const date = formatDate(elem.createdAt);

	return (
		<>
			<article className="border border-blue-200">
				<p>{elem.body}</p>
				<p>{elem.author.name}</p>
				<p>
					{elem.likes} | {elem.dislikes}
				</p>
				<p>{date}</p>
			</article>
		</>
	);
}
