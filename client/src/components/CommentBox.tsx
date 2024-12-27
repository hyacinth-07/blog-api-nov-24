import { Comment } from '../types/types';
import DateComponent from './Date';
import ArrowUp from '../assets/arrowUp.svg?react';
import ArrowDown from '../assets/arrowDown.svg?react';
import { fetchLikesDislikes } from '../utilities/fetchLikesDislikes';

import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContextDefinition';

type CommentProp = {
	elem: Comment;
};

export default function CommentBox({ elem }: CommentProp) {
	const date = (
		<DateComponent createdAt={elem.createdAt} updatedAt={elem.updatedAt} />
	);

	const [isLiked, setIsLiked] = useState<boolean>(false);
	const [isDisliked, setIsDisliked] = useState<boolean>(false);

	const { user } = useContext(UserContext);

	function handleLikes() {
		if (!user) {
			console.log('You need to log in!');
			return;
		} else {
			if (isLiked === true) {
				setIsLiked(false);
				// try {
				// 	fetchLikesDislikes(
				// 		'http://localhost:3000/comment/like',
				// 		user.id,
				// 		elem.id
				// 	);
				// } catch (error) {
				// 	console.error(error);
				// }
			} else {
				setIsLiked(true);

				if (isDisliked === true) setIsDisliked(false);
			}
		}
	}

	function handleDislikes() {
		if (!user) {
			console.log('You need to log in!');
			return;
		} else {
			if (isDisliked === true) {
				setIsDisliked(false);
			} else {
				setIsDisliked(true);

				if (isLiked === true) setIsLiked(false);
			}
		}
	}

	return (
		<>
			<article className="*:font-openSans flex flex-col m-4 *:m-2 bg-brown-300 rounded-lg">
				<section className="self-end">
					<p>
						comment by {elem.author.name}, {date}
					</p>
				</section>
				<p>{elem.body}</p>
				<section className="self-end flex gap-3 min-h-8 *:items-center">
					<span className="flex gap-3">
						<ArrowUp
							className={`w-6 h-6 ${isLiked ? 'fill-brown-950' : 'fill-none'}`}
							onClick={handleLikes}
						/>
						{elem.likes}
					</span>
					<span className="flex gap-3">
						<ArrowDown
							className={`w-6 h-6 ${
								isDisliked ? 'fill-brown-950' : 'fill-none'
							}`}
							onClick={handleDislikes}
						/>
						{elem.dislikes}
					</span>
				</section>
			</article>
		</>
	);
}
