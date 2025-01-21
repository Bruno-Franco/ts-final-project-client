import Login from './pages/Login'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ErrorPage from './pages/ErrorPage'
import IntroMessage from './pages/IntroMessage'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { EmployeeRoutes } from './components/EmployeeRoutes'
import MyPage from './pages/MyPage'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import AllAppointments from './pages/AllAppointments'
function App() {
	return (
		<div className='h-screen'>
			<Navbar />
			<Routes>
				<Route path='/' element={<IntroMessage />} />
				<Route path='/login' element={<Login />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route
					path='/all-appointments'
					element={
						<EmployeeRoutes>
							<AllAppointments />
						</EmployeeRoutes>
					}
				/>
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
				<Route
					path='/my-appointments/users/:userId'
					element={
						<ProtectedRoutes>
							<MyAppointments />
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
