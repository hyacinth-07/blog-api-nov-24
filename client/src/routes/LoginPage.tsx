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
				body: JSON.stringify(body),
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data);
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

	const handleGet = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:3000/auth/login/', {
				method: 'GET',
			});

			if (response.ok) {
				console.log('can you read me?');
			}
		} catch (err) {
			console.log(err);
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

			<form onSubmit={handleGet}>
				<button type="submit">test get</button>
			</form>
		</>
	);
}
