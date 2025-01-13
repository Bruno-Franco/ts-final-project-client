import logo from '../assets/hdlogo.png'

function Navbar() {
	return (
		<nav className='w-full flex justify-between content-center h-20 px-4 py-3 sm:px-6 lg:px-8'>
			<img
				className='h-full'
				src={logo}
				alt='Harley Davidson service logo'
			/>
			<div className='w-28 flex items-center justify-between'>
				<p>Login</p> <p>|</p>
				<p>Sign Up</p>
			</div>
		</nav>
	)
}

export default Navbar
