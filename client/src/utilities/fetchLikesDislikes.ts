export const fetchLikesDislikes = async (
	url: string,
	userId: string,
	commentId: string
) => {
	const body = { userId: userId, commentId: commentId };

	const response = await fetch(
		`http://localhost:3000/api/${commentId}/${url}`,
		{
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		}
	);

	if (!response.ok) {
		try {
			const error = await response.json();
			console.log(error);
		} catch {
			console.log('Unexpected error', response.statusText);
		}
	}
};
