import './index.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
// ROUTES
import MainPage from './routes/MainPage';
import Root from './routes/Root';
import OneArticle from './routes/OneArticlePage';
import LoginPage from './routes/LoginPage';
import LogOutPage from './routes/LogoutPage';

const App: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Root />}>
						<Route index element={<MainPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/logout" element={<LogOutPage />} />
						<Route path="/:postId" element={<OneArticle />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
