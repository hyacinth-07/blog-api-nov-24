import { Comment } from '../types/types';
import DateComponent from './Date';

type CommentProp = {
	elem: Comment;
};

export default function CommentBox({ elem }: CommentProp) {
	return (
		<>
			<article className="border border-blue-200">
				<p>{elem.body}</p>
				<p>{elem.author.name}</p>
				<p>
					{elem.likes} | {elem.dislikes}
				</p>
				<div>
					<DateComponent
						createdAt={elem.createdAt}
						updatedAt={elem.updatedAt}
					/>
				</div>
			</article>
		</>
	);
}
