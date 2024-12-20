import { createContext } from 'react';
import { User } from '../types/types';

type UserContextType = {
	user: User | undefined;
	refreshUser: () => void;
};

export const UserContext = createContext<UserContextType>({
	user: undefined,
	refreshUser: () => {},
});
