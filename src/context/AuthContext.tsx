import { createContext, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
// type User = {}
const APIURL = import.meta.env.VITE_APIURL
type IAuthContext = {
	user: any
	isLoggedIn: boolean
	handleLogout: () => void
	storeToken: (param: string) => void
	setUser: (newState: any) => void
	setIsLoggedIn: (newState: boolean) => void
	authenticateUser: () => void
}
const initialValue = {
	user: {},
	isLoggedIn: false,
	handleLogout: () => {},
	storeToken: () => {},
	setUser: () => {},
	setIsLoggedIn: () => {},
	authenticateUser: () => {},
}
const AuthContext = createContext<IAuthContext | typeof initialValue>(
	initialValue
)

function AuthContextWrapper({ children }: { children: ReactNode }) {
	// STATES FOR APP
	const navigate = useNavigate()
	const [isLoggedIn, setIsLoggedIn] = useState(initialValue.isLoggedIn)
	const [user, setUser] = useState(initialValue)

	const storeToken = (token: string): void => {
		localStorage.setItem('authToken', token)
	}

	async function authenticateUser() {
		const storedToken = localStorage.getItem('authToken')
		try {
			if (storedToken) {
				let response = await fetch(`${APIURL}/auth/verify`, {
					method: 'GET',
					headers: { Authorization: `Bearer ${storedToken}` },
				})
				let data = await response.json()

				setIsLoggedIn(true)
				navigate(`/my-bikes/bikes/${data.id}`)
			}
		} catch (error) {
			setIsLoggedIn(false)
			setUser(initialValue)
		}
	}

	function handleLogout() {
		navigate('/')
		localStorage.removeItem('authToken')
		setIsLoggedIn(false)
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoggedIn,
				setIsLoggedIn,
				setUser,
				storeToken,
				authenticateUser,
				handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthContextWrapper }
