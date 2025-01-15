import '../App.css'
import { AuthContext } from '@/context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Edit3Icon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type User = {
	firstName?: string
	lastName?: string
	phone?: number | 0
	avatar?: string
	address?: string
}
const initialState = {
	firstName: '',
	lastName: '',
	phone: 0,
	avatar: '',
	address: '',
}

function MyProfile() {
	const { user } = useContext(AuthContext)
	const APIURL = import.meta.env.VITE_APIURL
	// const [userFromDb, setUserFromDb] = useState<User | initialState>(
	// 	initialState
	// )
	const [updatedUser, setUpdatedUser] = useState<User | typeof initialState>(
		initialState
	)

	useEffect(() => {
		async function getUser() {
			try {
				let response = await fetch(`${APIURL}/users/users/${user.id}`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				})
				let data = await response.json()
				// setUserFromDb(data)
				setUpdatedUser(data)
			} catch (error) {}
		}
		getUser()
	}, [user.id])

	async function userUpdate() {
		try {
			console.log(updatedUser)
			const newUser = {
				...updatedUser,
				firstName: updatedUser.firstName,
				lastName: updatedUser.lastName,
				phone: updatedUser.phone,
				avatar: updatedUser.avatar,
				address: updatedUser.address,
			}
			let response = await fetch(
				`${APIURL}/users/update-user/${user.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newUser),
				}
			)
			let data = await response.json()
			setUpdatedUser(data)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className='intro-h'>
			<div>
				<h1>Hey, {user.firstName.toUpperCase()}!</h1>
				<span className='inline-block'>
					<Avatar>
						<AvatarImage
							src={updatedUser.avatar && updatedUser.avatar}
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</span>
			</div>
			<Card className='max-w-[1000px] m-auto mt-10 mb-20'>
				<CardHeader>
					<CardTitle>My Profile</CardTitle>
					<CardDescription>
						You can update your details!
					</CardDescription>
					<CardDescription>
						To do That click on the button down in the form!!
					</CardDescription>
				</CardHeader>

				<div className='flex justify-center content-center'>
					<Label className='pt-4 font-semibold '>FIRST NAME:</Label>
					<CardContent className='mt-3'>
						{updatedUser.firstName
							? updatedUser.firstName
							: 'Not defined!'}
					</CardContent>
				</div>
				<div className='flex justify-center content-center'>
					<Label className='pt-4 font-semibold'>LAST NAME:</Label>
					<CardContent className='mt-3'>
						{updatedUser.lastName
							? updatedUser.lastName
							: 'Not defined!'}
					</CardContent>
				</div>
				<div className='flex justify-center content-center'>
					<Label className='pt-4 font-semibold'>PHONE NUMBER:</Label>
					<CardContent className='mt-3'>
						{updatedUser.phone ? updatedUser.phone : 'Not defined!'}
					</CardContent>
				</div>
				<div className='flex justify-center content-center'>
					<Label className='pt-4 font-semibold'>ADDRESS:</Label>
					<CardContent className='mt-3'>
						{updatedUser.address
							? updatedUser.address
							: 'Not defined!'}
					</CardContent>
				</div>
				<CardFooter>
					<Dialog>
						<DialogTrigger asChild>
							<Button>
								<Edit3Icon
									className='mx-auto'
									onClick={() => {
										// setUpdatedUser(userFromDb)
									}}
								/>
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									Edit your profile info!
								</DialogTitle>
								<DialogDescription>
									Make changes to your profile here. Click
									save when you're done.
								</DialogDescription>
							</DialogHeader>
							<div className='grid gap-4 py-4'>
								<div className='grid grid-cols-4 items-center gap-4'>
									<Label
										htmlFor='firstname'
										className='text-right'
									>
										First Name
									</Label>
									<Input
										id='firstname'
										type='text'
										value={updatedUser?.firstName}
										className='col-span-3'
										onChange={(e) => {
											setUpdatedUser({
												...updatedUser,
												firstName:
													e.target.value.toUpperCase(),
											})
										}}
									/>
								</div>
								<div className='grid grid-cols-4 items-center gap-4'>
									<Label
										htmlFor='lastname'
										className='text-right'
									>
										Last Name
									</Label>
									<Input
										id='lastname'
										type='text'
										value={updatedUser?.lastName}
										className='col-span-3'
										onChange={(e) => {
											setUpdatedUser({
												...updatedUser,
												lastName:
													e.target.value.toUpperCase(),
											})
										}}
									/>
								</div>
								<div className='grid grid-cols-4 items-center gap-4'>
									<Label
										htmlFor='phone'
										className='text-right'
									>
										Phone Number
									</Label>
									<Input
										id='phone'
										type='number'
										value={updatedUser?.phone}
										className='col-span-3'
										onChange={(e) => {
											let number = parseInt(
												e.target.value,
												10
											)
											setUpdatedUser({
												...updatedUser,
												phone: number,
											})
										}}
									/>
								</div>

								<div className='grid grid-cols-4 items-center gap-4'>
									<Label
										htmlFor='avatar'
										className='text-right'
									>
										Avatar
									</Label>
									<Input
										id='avatar'
										type='text'
										value={updatedUser?.avatar}
										className='col-span-3'
										onChange={(e) => {
											setUpdatedUser({
												...updatedUser,
												avatar: e.target.value,
											})
										}}
									/>
								</div>
								<div className='grid grid-cols-4 items-center gap-4'>
									<Label
										htmlFor='address'
										className='text-right'
									>
										Address
									</Label>
									<Input
										id='address'
										type='text'
										value={updatedUser?.address}
										className='col-span-3'
										onChange={(e) => {
											setUpdatedUser({
												...updatedUser,
												address:
													e.target.value.toUpperCase(),
											})
										}}
									/>
								</div>
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button onClick={userUpdate}>
										Save changes
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</CardFooter>
			</Card>
		</div>
	)
}

export default MyProfile
