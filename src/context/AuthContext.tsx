import { createContext, useState, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// type User = {}
const APIURL = import.meta.env.VITE_APIURL
type IAuthContext = {
	user: any
	custAppointments: any
	isLoggedIn: boolean
	isEmployee?: boolean
	handleLogout: () => void
	storeToken: (param: string) => void
	setUser: (newState: any) => void
	setIsLoggedIn: (newState: boolean) => void
	setIsEmployee?: (newState: boolean) => void
	authenticateUser: () => void
	getAppointments: () => void
}
const initialValue = {
	user: {},
	custAppointments: [],
	isLoggedIn: false,
	isEmployee: false,
	handleLogout: () => {},
	storeToken: () => {},
	setUser: () => {},
	setIsLoggedIn: () => {},
	setIsEmployee: () => {},
	authenticateUser: () => {},
	getAppointments: () => {},
}
const AuthContext = createContext<IAuthContext | typeof initialValue>(
	initialValue
)

function AuthContextWrapper({ children }: { children: ReactNode }) {
	// STATES FOR APP
	const navigate = useNavigate()
	const [isLoggedIn, setIsLoggedIn] = useState(initialValue.isLoggedIn)
	const [isEmployee, setIsEmployee] = useState(initialValue.isEmployee)
	const [user, setUser] = useState(initialValue)
	const [custAppointments, setCustAppointments] = useState([])

	// GET APPOINTMENTS
	async function getAppointments() {
		try {
			let response = await fetch(`${APIURL}/my-page/appointments`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			})
			let data = await response.json()
			data.map((appo: any) => {
				return {
					id: appo.id,
					title: `${appo.user.firstName} | ${appo.user.phone} | ${appo.bike.model} | ${appo.bike.plate}`,
					start: `${appo.preferredDate
						.split('')
						.splice(0, 10)
						.join('')} 10:00`,
					end: `${appo.preferredDate
						.split('')
						.splice(0, 10)
						.join('')} 16:00`,
				}
			})
			setCustAppointments(
				data.map((appo: any) => {
					return {
						id: appo.id,
						title: `${appo.user.firstName} | ${appo.user.phone} | ${appo.bike.model} | ${appo.bike.plate}`,
						start: `${appo.preferredDate
							.split('')
							.splice(0, 10)
							.join('')} 10:00`,
						end: `${appo.preferredDate
							.split('')
							.splice(0, 10)
							.join('')} 16:00`,
					}
				})
			)
		} catch (error) {
			console.log(error)
		}
	}
	/////////////////
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
				console.log(data.isEmployee)

				if (data.isEmployee) {
					setIsEmployee(true)
					setIsLoggedIn(true)
					getAppointments()
					navigate(`/my-profile/users/${data.id}`)
				} else {
					setIsLoggedIn(true)
					navigate(`/my-bikes/bikes/${data.id}`)
				}
			}
		} catch (error) {
			setIsLoggedIn(false)
			setIsEmployee(false)
			setUser(initialValue)
		}
	}

	function handleLogout() {
		navigate('/')
		localStorage.removeItem('authToken')
		setIsLoggedIn(false)
	}
	useEffect(() => {
		authenticateUser()
	}, [])
	return (
		<AuthContext.Provider
			value={{
				user,
				isLoggedIn,
				isEmployee,
				setIsLoggedIn,
				setUser,
				storeToken,
				authenticateUser,
				handleLogout,
				custAppointments,
				getAppointments,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthContextWrapper }
