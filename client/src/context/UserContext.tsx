import { useEffect, useState } from 'react';
import { User } from '../types/types';
import { fetchGet } from '../utilities/fetching';
import { UserContext } from './UserContextDefinition';

type LoggedUser = User | undefined;
type UserProviderProps = { children: React.ReactNode };

export const UserProvider = ({ children }: UserProviderProps) => {
	const [user, setUser] = useState<LoggedUser>(undefined);

	useEffect(() => {
		try {
			fetchGet<User | undefined>('http://localhost:3000/api/userCheck').then(
				(user) => setUser(user)
			);
		} catch (error) {
			throw new Error(`Error fetching user: ${error}`);
		}
	}, []);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
