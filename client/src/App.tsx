import './index.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
// ROUTES
import MainPage from './routes/MainPage';
import Root from './routes/Root';

const App: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Root />}>
						<Route index element={<MainPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
