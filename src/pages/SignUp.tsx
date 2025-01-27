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
import { useState } from 'react'

type NewUser = {
	firstName?: string
	email?: string
	password?: string
	isEmployee?: boolean
}

const initialStateNewUser = {
	firstName: '',
	email: '',
	password: '',
	isEmployee: false,
}

function SignUp() {
	let navigate = useNavigate()
	const APIURL = import.meta.env.VITE_APIURL
	const [logMessage, setLogMessage] = useState('')
	// const [newUser, setNewUser] = useState<NewUser | undefined>(undefined)
	const [newUser, setNewUser] = useState<
		NewUser | typeof initialStateNewUser
	>(initialStateNewUser)

	async function handleNewUser(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		// create user
		// always include headers
		let response = await fetch(`${APIURL}/auth/signup`, {
			method: 'POST',
			headers: {
				Accept: 'application.json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUser),
		})
		let data = await response.json()
		if (data.message === 'Error') {
			setLogMessage(`Resource Already Taken!!`)
		} else {
			navigate('/login')
		}
	}
	return (
		<div className='h-[500px] flex items-center justify-center'>
			<Card className='w-[350px]'>
				<CardHeader>
					<CardTitle>Sign Up</CardTitle>
					{logMessage !== '' ? (
						<CardDescription className='text-red-600'>
							{logMessage}
						</CardDescription>
					) : (
						''
					)}
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							handleNewUser(e)
						}}
					>
						<div className='grid w-full items-center text-left gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='name'>Name</Label>
								<Input
									id='name'
									placeholder='First Name'
									type='text'
									value={newUser?.firstName}
									required
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>
									) => {
										setNewUser({
											...newUser,
											firstName: e.target.value,
										})
									}}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									placeholder='Email'
									type='email'
									value={newUser?.email}
									required
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>
									) => {
										setNewUser({
											...newUser,
											email: e.target.value,
										})
									}}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='password'>Password</Label>
								<Input
									id='password'
									placeholder='Password'
									value={newUser?.password}
									type='password'
									required
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>
									) => {
										setNewUser({
											...newUser,
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
							<Button type='submit'>Register</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

export default SignUp
