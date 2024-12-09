import { Comment, Post } from '../types/types';
import DateComponent from './Date';
import CommentBox from './CommentBox';
import { NavLink } from 'react-router';

type PostProp = {
	elem: Post;
};

export default function SinglePost({ elem }: PostProp) {
	const comments = elem.comments.map((c: Comment) => <CommentBox elem={c} />);

	return (
		<>
			<article className="*:font-openSans">
				<div className="flex justify-around items-center pt-4 pb-4">
					<h1 className="text-3xl">{elem.title}</h1>
					<h3 className="text-xl italic">by {elem.author.name}</h3>
				</div>
				<p className="text-base p-4 bg-brown-100 rounded-lg">{elem.body}</p>
				<section className="flex w-full gap-4 *:text-sm p-2 justify-between">
					<DateComponent
						createdAt={elem.createdAt}
						updatedAt={elem.updatedAt}
					/>
					<NavLink to="/">
						<p>Go Back</p>
					</NavLink>
				</section>
				{comments}
			</article>
		</>
	);
}
