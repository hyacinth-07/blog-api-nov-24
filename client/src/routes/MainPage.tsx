import { useState, useEffect } from 'react';
import { Post } from '../types/types';
import PostBox from '../components/PostBox';

export default function MainPage() {
	// const [data, setData] = useState<Array<Post> | null>(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch('http://localhost:3000/api/', { credentials: 'include' })
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

	// crude verification
	const u = data[0];

	if (u) {
		console.log(u.name);
	} else {
		console.log('no user');
	}

	const p = data[1];
	const posts = p.map((elem: Post) => <PostBox elem={elem} />);

	return (
		<>
			<div>{posts}</div>
		</>
	);
}
