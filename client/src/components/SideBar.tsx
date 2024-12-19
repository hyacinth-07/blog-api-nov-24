import { NavLink } from 'react-router';

export default function SideBar() {
	return (
		<>
			<nav className="flex flex-col items-center justify-evenly gap-5 mt-4 bg-brown-500 rounded-lg h-[250px]">
				<p>username | guest</p>
				<NavLink to="/login">
					<p>login | logout</p>
				</NavLink>
				<p>sign up</p>
				<p>settings</p>
			</nav>
		</>
	);
}
