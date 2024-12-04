import { Post } from '../types/types';
import CommentBox from './CommentBox';
import DateComponent from './Date';

type PostProp = {
	elem: Post;
};

export default function PostItem({ elem }: PostProp) {
	const comments = elem.comments.map((c) => <CommentBox elem={c} />);

	return (
		<>
			<article className="*:font-openSans">
				<div className="flex justify-around items-center pt-4 pb-4">
					<h1 className="text-3xl">{elem.title}</h1>
					<h3 className="text-xl italic">by {elem.author.name}</h3>
				</div>
				<p className="text-base p-4 bg-brown-100 rounded-lg">{elem.body}</p>
				<div className="*:text-sm p-2">
					<DateComponent
						createdAt={elem.createdAt}
						updatedAt={elem.updatedAt}
					/>
				</div>
				<div className="flex flex-col">
					<p className="self-end p-4">
						button that hide/shows comments, a counter, then add
					</p>
					{comments}
				</div>
			</article>
		</>
	);
}
