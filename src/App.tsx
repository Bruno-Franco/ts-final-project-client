import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ErrorPage from './pages/ErrorPage'
import IntroMessage from './pages/IntroMessage'
import { Route, Routes } from 'react-router-dom'

function App() {
	return (
		<div className='h-screen'>
			<Navbar />
			<Routes>
				<Route path='/' element={<IntroMessage />} />

				<Route path='*' element={<ErrorPage />} />
			</Routes>

			<Footer />
		</div>
	)
}

export default App
