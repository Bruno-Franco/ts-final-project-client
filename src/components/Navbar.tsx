import logo from '../assets/hdlogo.png'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '@/context/AuthContext'
import { Button } from './ui/button'
import { PhoneCallIcon } from 'lucide-react'

function Navbar() {
	const { user, isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

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
				<div className='w-[450px] flex items-center justify-between'>
					<a href={`tel:`}>
						<Button>
							<PhoneCallIcon className='mr-2' />
							Call Us!
						</Button>
					</a>
					|
					<Button
						onClick={() => {
							setIsLoggedIn(false)
						}}
					>
						Logout
					</Button>{' '}
					|{' '}
					<NavLink to={`/my-bikes/bikes/${user.id}`}>
						<p>My Bikes</p>
					</NavLink>
					|{' '}
					<NavLink to={`/my-profile/users/${user.id}`}>
						<p>My Profile</p>
					</NavLink>
				</div>
			) : (
				<>
					<div className='w-[250px] flex items-center justify-between'>
						<a href={`tel:`}>
							<Button>
								<PhoneCallIcon className='mr-2' />
								Call Us!
							</Button>
						</a>
						|
						<NavLink to='/login'>
							<p>Login</p>
						</NavLink>
						<p>|</p>
						<NavLink to='/sign-up'>
							<p>Sign Up</p>
						</NavLink>
					</div>
				</>
			)}
		</nav>
	)
}

export default Navbar
