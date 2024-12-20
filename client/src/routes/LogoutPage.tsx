import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../context/UserContextDefinition';

export default function LogOutPage() {
	const navigate = useNavigate();
	const { refreshUser } = useContext(UserContext);

	const handleLogout = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:3000/auth/logout/', {
				credentials: 'include',
			});

			if (response.ok) {
				refreshUser();
				navigate('/');
			} else {
				try {
					const error = await response.json();
					console.log(error);
				} catch {
					console.log('Unexpected error', response.statusText);
				}
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
