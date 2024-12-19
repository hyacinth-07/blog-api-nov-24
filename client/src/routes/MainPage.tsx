import { useState, useEffect } from 'react';
import { Post } from '../types/types';
import PostBox from '../components/PostBox';
import { fetchGet } from '../utilities/fetching';

export default function MainPage() {
	const [data, setData] = useState<Array<Post> | null>(null);

	useEffect(() => {
		try {
			fetchGet('http://localhost:3000/api/').then((data) => setData(data));
		} catch (error) {
			throw new Error(`Error fetching data: ${error}`);
		}
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
