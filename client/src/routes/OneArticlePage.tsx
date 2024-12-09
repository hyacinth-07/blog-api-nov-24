import { useParams } from 'react-router';
import { Post } from '../types/types';
import { useState, useEffect } from 'react';
import SinglePost from '../components/SinglePost';

export default function OneArticle() {
	const { postId } = useParams();
	const [data, setData] = useState<Post | null>(null);

	useEffect(() => {
		fetch(`http://localhost:3000/api/${postId}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => setData(data))
			.catch((error) => console.error('Fetch error:', error));
	}, []);

	if (!data) {
		return <div>loading....</div>;
	}

	// const post = data.map((elem) => <PostBox elem={elem} />);

	return (
		<>
			<SinglePost elem={data} />
		</>
	);
}
