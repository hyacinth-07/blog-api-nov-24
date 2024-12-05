import { Outlet } from 'react-router';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Root() {
	return (
		<>
			<div className="w-screen min-h-screen bg-brown-200 pt-8 pb-8 flex flex-col justify-between items-center">
				<div>
					<Header />
					<main className="w-[1200px] grid grid-cols-[900px_300px] gap-3">
						<Outlet />
						<SideBar />
					</main>
				</div>
				<Footer />
			</div>
		</>
	);
}
