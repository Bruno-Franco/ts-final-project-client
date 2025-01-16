import { Button } from '@/components/ui/button'
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from '@/components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router'
import React, { useState, useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

type IsUser = {
	email?: string
	password?: string
}

function Login() {
	const { setIsLoggedIn, setUser, printUser } = useContext(AuthContext)
	const [isUser, setIsUser] = useState<IsUser | undefined>(undefined)
	let navigate = useNavigate()
	const [logMessage, setLogMessage] = useState('')
	const APIURL = import.meta.env.VITE_APIURL

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		try {
			let response = await fetch(`${APIURL}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(isUser),
			})
			let data = await response.json()

			if (data.password === 'NothingToShow') {
				console.log('from my login page', data)
				setIsLoggedIn(true)
				setUser(data)
				printUser()
				navigate(`/my-bikes/bikes/${data.id}`)
				setLogMessage('')
			}
		} catch (error) {
			setLogMessage(`Wrong Credentials!`)
		}
	}

	return (
		<div className='h-[500px] flex items-center justify-center'>
			<Card className='w-[350px]'>
				<CardHeader>
					<CardTitle>Log In</CardTitle>
					{logMessage !== '' ? (
						<CardDescription className='text-red-600'>
							{logMessage}
						</CardDescription>
					) : (
						''
					)}
				</CardHeader>
				<CardContent>
					<form onSubmit={handleLogin}>
						<div className='grid w-full items-center text-left gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									placeholder='Email'
									type='email'
									value={isUser?.email}
									required
									onChange={(e) => {
										setIsUser({
											...isUser,
											email: e.target.value,
										})
									}}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='password'>Email</Label>
								<Input
									id='password'
									placeholder='Password'
									type='password'
									value={isUser?.password}
									required
									onChange={(e) => {
										setIsUser({
											...isUser,
											password: e.target.value,
										})
									}}
								/>
							</div>
						</div>
						<div className='flex justify-between py-4'>
							<Button
								variant='outline'
								onClick={() => {
									navigate('/')
								}}
							>
								Cancel
							</Button>
							<Button type='submit'>Enter</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

export default Login
