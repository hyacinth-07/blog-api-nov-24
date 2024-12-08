import { Post } from '../types/types';
import DateComponent from './Date';
import CommentAccordion from './CommentAccordion';
import { NavLink } from 'react-router';

type PostProp = {
	elem: Post;
};

export default function PostBox({ elem }: PostProp) {
	const comments = elem.comments;

	return (
		<>
			<article className="*:font-openSans">
				<div className="flex justify-around items-center pt-4 pb-4">
					<NavLink to={elem.id}>
						<h1 className="text-3xl">{elem.title}</h1>
					</NavLink>
					<h3 className="text-xl italic">by {elem.author.name}</h3>
				</div>
				<p className="text-base p-4 bg-brown-100 rounded-lg">{elem.body}</p>
				<div className="*:text-sm p-2">
					<DateComponent
						createdAt={elem.createdAt}
						updatedAt={elem.updatedAt}
					/>
				</div>
				<CommentAccordion elem={comments} />
			</article>
		</>
	);
}
