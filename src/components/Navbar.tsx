import logo from '../assets/hdlogo.png'
import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '@/context/AuthContext'
import { Button } from './ui/button'

function Navbar() {
	const navigate = useNavigate()
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

	return (
		<nav className='w-full flex justify-between content-center h-20 px-4 py-3 sm:px-6 lg:px-8'>
			<NavLink to='/'>
				<img
					className='h-full'
					src={logo}
					alt='Harley Davidson service logo'
				/>
			</NavLink>
			{isLoggedIn ? (
				<Button
					onClick={() => {
						setIsLoggedIn(false)
					}}
				>
					Logout
				</Button>
			) : (
				<div className='w-28 flex items-center justify-between'>
					<NavLink to='/login'>
						<p>Login</p>
					</NavLink>
					<p>|</p>
					<NavLink to='/sign-up'>
						<p>Sign Up</p>
					</NavLink>
				</div>
			)}
		</nav>
	)
}

export default Navbar
