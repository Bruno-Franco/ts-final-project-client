import Login from './pages/Login'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ErrorPage from './pages/ErrorPage'
import IntroMessage from './pages/IntroMessage'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import MyPage from './pages/MyPage'
import MyProfile from './pages/MyProfile'
function App() {
	return (
		<div className='h-screen'>
			<Navbar />
			<Routes>
				<Route path='/' element={<IntroMessage />} />
				<Route path='/login' element={<Login />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route
					path='/my-bikes/bikes/:userId'
					element={
						<ProtectedRoutes>
							<MyPage />
						</ProtectedRoutes>
					}
				/>
				<Route
					path='/my-profile/users/:userId'
					element={
						<ProtectedRoutes>
							<MyProfile />
						</ProtectedRoutes>
					}
				/>

				<Route path='*' element={<ErrorPage />} />
			</Routes>

			<Footer />
		</div>
	)
}

export default App
