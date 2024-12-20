import { createContext } from 'react';
import { User } from '../types/types';

type LoggedUser = User | undefined;

export const UserContext = createContext<LoggedUser>(undefined);
