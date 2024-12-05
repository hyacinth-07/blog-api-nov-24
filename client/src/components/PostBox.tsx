import { Post } from '../types/types';
import DateComponent from './Date';
import CommentBox from './CommentBox';
import { useState } from 'react';

type PostProp = {
	elem: Post;
};

export default function PostItem({ elem }: PostProp) {
	const comments = elem.comments.map((c) => <CommentBox elem={c} />);

	function Accordion() {
		const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

		return (
			<>
				<section className="flex w-full justify-end gap-4 p-2">
					<span>Number of comments</span>{' '}
					<button onClick={() => setAccordionOpen(!accordionOpen)}>
						Expand
					</button>
				</section>

				<div
					className={`grid overflow-hidden transition-all duration-1000 ease-in-out ${
						accordionOpen
							? 'grid-rows-[1fr] opacity-100'
							: 'grid-rows-[0fr] opacity-0'
					}`}
				>
					<div className="overflow-hidden">{accordionOpen && comments}</div>
				</div>
			</>
		);
	}

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
				<Accordion />
			</article>
		</>
	);
}
