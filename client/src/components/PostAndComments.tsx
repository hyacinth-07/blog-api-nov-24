import { Post } from '../types/types';
import formatDate from '../utilities/dateFormatter';
import CommentBox from './CommentBox';

type PostProp = {
	elem: Post;
};

export default function PostItem({ elem }: PostProp) {
	const date = formatDate(elem.createdAt);

	const comments = elem.comments.map((c) => <CommentBox elem={c} />);
	console.log(comments);

	return (
		<>
			<article className="border border-red-200">
				<h1>{elem.title}</h1>
				<h2>by {elem.author.name}</h2>
				<p>{elem.body}</p>
				<p>{date}</p>
				<div>{comments}</div>
			</article>
		</>
	);
}
