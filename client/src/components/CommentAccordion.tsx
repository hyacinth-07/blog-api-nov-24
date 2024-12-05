import { Comment } from '../types/types';
import CommentBox from './CommentBox';

type CommentProp = {
	elem: Comment;
};

export default function Accordion(elem) {
	const comments = elem.map((c) => <CommentBox elem={c} />);

	return (
		<>
			<section className="flex">
				<span>Number of comments</span> <button>Expand</button>
			</section>
			<details>{/* <CommentBox elem={comments} /> */}</details>
		</>
	);
}
