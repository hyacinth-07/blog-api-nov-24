import { NavLink } from 'react-router';
import { User } from '../types/types';

type SideBarProp = {
	isLogged: User | undefined;
};

export default function SideBar({ isLogged }: SideBarProp) {
	return (
		<>
			<nav className="flex flex-col items-center justify-evenly gap-5 mt-4 bg-brown-500 rounded-lg h-[250px]">
				{isLogged ? <p>Welcome, {isLogged.name}</p> : <p>Welcome, guest</p>}

				{isLogged ? (
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
