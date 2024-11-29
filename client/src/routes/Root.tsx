import { Outlet } from 'react-router';

export default function Root() {
	return (
		<>
			<div>
				<div className="h-screen w-screen bg-slate-100">
					<Outlet />
				</div>
			</div>
		</>
	);
}
