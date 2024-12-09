import { Comment } from '../types/types';
import CommentBox from './CommentBox';
import { useState } from 'react';

export default function CommentAccordion(elem) {
	const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

	const comments = elem.elem.map((c: Comment) => <CommentBox elem={c} />);
	const numberOfComments = elem.elem.length;

	return (
		<>
			<section className="flex w-full justify-end gap-4 p-2">
				<span>Show {numberOfComments} comments</span>
				<button onClick={() => setAccordionOpen(!accordionOpen)}>Expand</button>
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
