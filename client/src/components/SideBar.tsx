import { NavLink } from 'react-router';
import { UserContext } from '../context/UserContextDefinition';
import { useContext } from 'react';

export default function SideBar() {
	const { user } = useContext(UserContext);

	return (
		<>
			<nav className="flex flex-col items-center justify-evenly gap-5 mt-4 bg-brown-500 rounded-lg h-[250px]">
				{user ? <p>Welcome, {user.name}</p> : <p>Welcome, guest</p>}

				{user ? (
					<NavLink to="/logout">
						<p>Logout</p>
					</NavLink>
				) : (
					<NavLink to="/login">
						<p>Login</p>
					</NavLink>
				)}

				<p>sign up</p>
				<p>settings</p>
			</nav>
		</>
	);
}
