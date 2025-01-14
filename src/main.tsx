import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContextWrapper } from './context/AuthContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Router>
			<AuthContextWrapper>
				<App />
			</AuthContextWrapper>
		</Router>
	</StrictMode>
)
