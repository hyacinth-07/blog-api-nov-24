import { useNavigate } from 'react-router';

export default function LogOutPage() {
	const navigate = useNavigate();

	const handleLogout = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:3000/auth/logout/', {
				credentials: 'include',
			});
			if (response.ok) {
				navigate('/');
			} else {
				const error = await response.json();
				console.log(error);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleLogout}>
			<button type="submit">Logout</button>
		</form>
	);
}
