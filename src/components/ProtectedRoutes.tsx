import { ReactNode, useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { Navigate } from 'react-router-dom'

export function ProtectedRoutes({ children }: { children: ReactNode }) {
	const { isLoggedIn } = useContext(AuthContext)

	if (isLoggedIn) {
		return <div>{children}</div>
	} else {
		return <Navigate to='/' />
	}
}
