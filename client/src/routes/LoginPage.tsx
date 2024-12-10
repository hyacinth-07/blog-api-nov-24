import { useState } from 'react';
import { Login } from '../types/types';
import { useNavigate } from 'react-router';

export default function LoginPage() {
	// for testing purposes
	// Alice Johnson
	// password123

	const [userName, setUserName] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const body: Login = { username: userName, password: password };

		try {
			const response = await fetch('http://localhost:3000/auth/login/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data);
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
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					required
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Log In</button>
			</form>
		</>
	);
}
