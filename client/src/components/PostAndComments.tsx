import { Post } from '../types/Post';

export default function PostItem({ elem }: { elem: Post }) {
	return (
		<>
			<article>
				<h1>{elem.title}</h1>
				<p>{elem.body}</p>
				<p>... and there should be more</p>
			</article>
		</>
	);
}
