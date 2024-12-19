import { Outlet } from 'react-router';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { User } from '../types/types';
import { fetchGet } from '../utilities/fetching';

export default function Root() {
	const [user, setUser] = useState<User | undefined>(undefined);

	useEffect(() => {
		try {
			fetchGet<User | undefined>('http://localhost:3000/api/userCheck').then(
				(user) => setUser(user)
			);
		} catch (error) {
			throw new Error(`Error fetching user: ${error}`);
		}
	}, []);

	return (
		<>
			<div className="w-screen min-h-screen bg-brown-200 pt-8 pb-8 flex flex-col justify-between items-center">
				<div>
					<Header />
					<main className="w-[1200px] grid grid-cols-[900px_300px] gap-3">
						<Outlet />
						<SideBar isLogged={user} />
					</main>
				</div>
				<Footer />
			</div>
		</>
	);
}
