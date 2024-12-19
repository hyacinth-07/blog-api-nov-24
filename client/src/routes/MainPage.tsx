import { useState, useEffect } from 'react';
import { Post } from '../types/types';
import PostBox from '../components/PostBox';
import LoadingScreen from '../components/LoadingScreen';
import { fetchGet } from '../utilities/fetching';

export default function MainPage() {
	const [data, setData] = useState<Array<Post> | null>(null);

	useEffect(() => {
		try {
			fetchGet<Array<Post> | null>('http://localhost:3000/api/').then((data) =>
				setData(data)
			);
		} catch (error) {
			throw new Error(`Error fetching data: ${error}`);
		}
	}, []);

	if (!data) return <LoadingScreen />;

	const posts = data.map((elem: Post) => <PostBox elem={elem} key={elem.id} />);

	return (
		<>
			<div>{posts}</div>
		</>
	);
}
