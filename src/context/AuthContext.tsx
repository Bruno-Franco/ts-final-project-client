import { createContext, useState, ReactNode } from 'react'

// type User = {}

type IAuthContext = {
	user: any
	isLoggedIn: boolean
	printUser: () => void
	setUser: (newState: any) => void
	setIsLoggedIn: (newState: boolean) => void
}
const initialValue = {
	user: {},
	isLoggedIn: false,
	printUser: () => {},
	setUser: () => {},
	setIsLoggedIn: () => {},
}
const AuthContext = createContext<IAuthContext | typeof initialValue>(
	initialValue
)

function AuthContextWrapper({ children }: { children: ReactNode }) {
	// STATES FOR APP

	const [isLoggedIn, setIsLoggedIn] = useState(initialValue.isLoggedIn)
	const [user, setUser] = useState(initialValue.isLoggedIn)
	function printUser() {
		// console.log('user printed >>>>>>>>> ', isLoggedIn, user)
	}

	return (
		<AuthContext.Provider
			value={{ user, isLoggedIn, setIsLoggedIn, setUser, printUser }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthContextWrapper }
