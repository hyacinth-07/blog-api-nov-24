import { Post } from '../types/types';
import formatDate from '../utilities/dateFormatter';

type PostProp = {
	elem: Post;
};

export default function PostItem({ elem }: PostProp) {
	const date = formatDate(elem.createdAt);

	return (
		<>
			<article>
				<h1>{elem.title}</h1>
				<h2>by {elem.author.name}</h2>
				<p>{elem.body}</p>
				<p>{date}</p>
				<div>// COMMENTS ARRAY</div>
			</article>
		</>
	);
}
