import { ReactNode, useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { Navigate } from 'react-router-dom'

export function EmployeeRoutes({ children }: { children: ReactNode }) {
	const { isEmployee } = useContext(AuthContext)

	if (isEmployee) {
		return <div>{children}</div>
	}
	return <Navigate to='/' />
}
