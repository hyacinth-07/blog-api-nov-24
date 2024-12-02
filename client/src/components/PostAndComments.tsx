import { Post } from '../types/types';

type PostProp = {
	elem: Post;
};

export default function PostItem({ elem }: PostProp) {
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
