import { Outlet } from 'react-router';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';

export default function Root() {
	return (
		<>
			<div className="h-screen w-screen bg-slate-100 pt-8 pb-8 flex flex-col justify-between items-center">
				<main className="w-[1200px] border border-black grid grid-cols-[900px_300px]">
					<Outlet />
					<SideBar />
				</main>
				<Footer />
			</div>
		</>
	);
}
