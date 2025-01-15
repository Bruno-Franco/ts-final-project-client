import { AuthContext } from '@/context/AuthContext'
import React, { useContext, useEffect, useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
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
import { Trash2Icon, Edit3Icon, PlusCircleIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Appointment {
	id: number
	date: string
}

type Bike = {
	id?: string
	vin?: string
	plate?: string
	model?: string
	family?: string
	apointments?: Appointment[]
}
type Date = any | null
// type Appointments = {
// 	preferredDate?: any
// 	userId?: string
// 	bikeId?: string
// }
function MyPage() {
	const { user } = useContext(AuthContext)

	const [selectDate, setSelectedDate] = useState<Date | null>(null)
	// const [appointments, SetAppointments] = useState<Appointments[] | null>(
	// 	null
	// )
	const [bike, setBike] = useState<Bike | null>(null)
	const [bikeUpdated, setBikeUpdated] = useState<Bike | null>(null)
	const [myBikes, setMyBikes] = useState<Bike[] | undefined>([])
	const APIURL = import.meta.env.VITE_APIURL
	const { userId } = useParams()

	useEffect(() => {
		async function getBikes() {
			try {
				let getMyBikes = await fetch(
					`${APIURL}/my-page/bikes/${userId}`
				)
				let data = await getMyBikes.json()
				// console.log('data received', data)

				setMyBikes(data)
			} catch (error) {}
		}

		// async function getAppointments() {
		// 	try {
		// 		let response = await fetch(
		// 			`${APIURL}/my-page/appointments/${userId}`,
		// 			{
		// 				method: 'GET',
		// 				headers: {
		// 					Accept: 'application/jon',
		// 				},
		// 			}
		// 		)
		// 		let data = await response.json()

		// 		SetAppointments(data)
		// 	} catch (err) {
		// 		console.log(err)
		// 	}
		// }
		// getAppointments()
		getBikes()
	}, [user.id])

	async function getBikesAfterBook() {
		try {
			let getMyBikes = await fetch(`${APIURL}/my-page/bikes/${userId}`)
			let data = await getMyBikes.json()
			// console.log('data received', data)

			setMyBikes(data)
		} catch (error) {
			console.log(error)
		}
	}
	///////////////////////
	//////////////////////
	// CREATE BIKE
	async function createBike(crBike: Bike) {
		try {
			const bikeToSend = {
				vin: crBike.vin,
				model: crBike.model,
				family: crBike.family,
				plate: crBike.plate,
			}
			let sendBike = await fetch(`${APIURL}/my-page/bikes/${userId}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(bikeToSend),
			})
			let response = await sendBike.json()
			setMyBikes([...myBikes, response])
		} catch (err) {
			console.log(err)
		}
	}
	///////////////////////
	//////////////////////
	// DELETE BIKE
	async function deleteBike(dlBike: Bike) {
		if (!dlBike.id) {
			console.error('Bike ID is missing')
			throw new Error('Bike ID is missing')
		}

		// console.log(`Deleting bike with ID: ${dlBike.id}`)
		try {
			let delBike = await fetch(`${APIURL}/my-page/bikes/${userId}`, {
				method: 'DELETE',
				headers: {
					Accept: 'application.json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: dlBike.id }),
			})
			if (!delBike.ok) {
				throw new Error(`Failed to delete bike: ${delBike.statusText}`)
			}
			// let response = await delBike.json()
			// console.log('Response from API:', response)
			let updatedArr = myBikes?.filter((bike) => dlBike.id !== bike.id)

			setMyBikes(updatedArr)
		} catch (err) {
			console.log(err)
		}
	}
	///////////////////////
	//////////////////////
	// UPDATE BIKE STATE
	function updateBikeState(upBike: Bike) {
		setBikeUpdated(upBike)
	}
	///////////////////////
	//////////////////////
	// UPDATE BIKE STATE DATABASE
	async function updateBike() {
		if (!bikeUpdated || !bikeUpdated.id) {
			console.error('Bike object or ID is missing')
			throw new Error('Bike object or ID is missing')
		}

		// console.log(`Updating bike with ID: ${bikeUpdated?.id}`)
		try {
			let response = await fetch(`${APIURL}/my-page/bikes/${userId}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bikeUpdated),
			})

			if (!response.ok) {
				throw new Error(`Failed to update bike: ${response.statusText}`)
			}

			let updateArr = myBikes?.map((bike) => {
				if (bike.id === bikeUpdated.id) {
					return bikeUpdated
				} else {
					return bike
				}
			})
			setMyBikes(updateArr)

			// let responseData = await response.json()
			// console.log('Bike updated successfully:', responseData)
		} catch (err) {
			console.log(err)
		}
	}

	//////////////////////////
	//////////////////////////
	// BOOK AN APpOINTMENT
	async function bookBike(booBike: Bike) {
		console.log(`Booked for bike and day`, booBike, selectDate)
		try {
			/*let response = */ await fetch(
				`${APIURL}/my-page/appointments/${userId}`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						bikeId: booBike.id,
						preferredDate: selectDate,
					}),
				}
			)
			getBikesAfterBook()
			setSelectedDate('')
			// let data = await response.json()
			// console.log(data)
		} catch (err) {
			console.log(err)
		}
	}
	console.log(user.avatar)

	///////////////////////
	/////////////////////////////////////////////
	/////////////////////////////////////////////
	//////////////////////
	return (
		<div className='intro-h'>
			<div>
				<h1>Hey, {user.firstName.toUpperCase()}!</h1>
				<span className='inline-block'>
					<Avatar>
						<AvatarImage
							src={user.avatar && user.avatar.toLowerCase()}
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</span>
			</div>
			<Card className='max-w-[1000px] m-auto mt-10 mb-20'>
				<CardHeader>
					<CardTitle>My Motorcycles</CardTitle>
					<CardDescription>
						You can register your bikes!
					</CardDescription>
					<CardDescription>
						To do That fill in the places bellow!
					</CardDescription>
					<CardContent>
						<form
							onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
								e.preventDefault()
								if (bike?.plate === '') {
								} else {
									createBike(bike)
									setBike({
										vin: '',
										plate: '',
										model: '',
										family: '',
									})
								}
							}}
						>
							<div className='grid w-full items-center gap-4'>
								<div className='flex flex-col space-y-1.5'>
									<Label className='text-left' htmlFor='vin'>
										VIN
									</Label>
									<Input
										id='vin'
										placeholder='Your VIN is on the Bikes Chassis'
										value={bike?.vin}
										onChange={(e) => {
											// console.log(e.target.value)

											setBike({
												...bike,
												vin: e.target.value.toUpperCase(),
											})
										}}
									/>
									<Label
										className='text-left'
										htmlFor='model'
									>
										Model
									</Label>
									<Input
										required
										id='model'
										placeholder='Your Model: Ex Street Bob'
										value={bike?.model}
										onChange={(e) => {
											// console.log(e.target.value)

											setBike({
												...bike,
												model: e.target.value.toUpperCase(),
											})
										}}
									/>
									<Label
										className='text-left'
										htmlFor='plate'
									>
										Plate
									</Label>
									<Input
										required
										id='plate'
										placeholder='Your Plate Number'
										value={bike?.plate}
										onChange={(e) => {
											// console.log(e.target.value)

											setBike({
												...bike,
												plate: e.target.value.toUpperCase(),
											})
										}}
									/>
								</div>
								<div className='flex flex-col space-y-1.5'>
									<Label
										className='text-left'
										htmlFor='family'
									>
										Family
									</Label>
									<select
										required
										value={bike?.family}
										className='flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
										onChange={(e) => {
											// console.log(e.target.value)

											setBike({
												...bike,
												family: e.target.value,
											})
										}}
									>
										<option value='none' selected>
											Choose a Bike Family!
										</option>
										<option value='Sportster'>
											Sportster
										</option>
										<option value='Dyna'>Dyna</option>
										<option value='Touring'>Touring</option>
										<option value='Softail'>Softail</option>
										<option value='Rev-Max'>Rev Max</option>
									</select>
								</div>
							</div>
							<div className='flex justify-between py-4'>
								{/* <Button variant='outline'>Cancel</Button> */}
								<Button>
									<PlusCircleIcon />
									Abb Bike
								</Button>
							</div>
						</form>
					</CardContent>
				</CardHeader>
				<hr className='mx-auto  mb-10 w-[90%] ' />
				<Table className='w-[90%] mx-auto'>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px] text-center'>
								VIN
							</TableHead>
							<TableHead className='w-[100px] text-center'>
								Model
							</TableHead>
							<TableHead className='w-[100px] text-center'>
								Plate
							</TableHead>
							<TableHead className='w-[100px] text-center'>
								Family
							</TableHead>
							<TableHead className='w-[100px] text-center'>
								Book
							</TableHead>
							<TableHead className='w-[100px] text-center'>
								Booked For
							</TableHead>
							<TableHead className='w-[50px] text-center'>
								Delete
							</TableHead>
							<TableHead className='w-[50px] text-center'>
								Update
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{myBikes &&
							myBikes.map((bike) => {
								return (
									<TableRow key={bike.id}>
										<TableCell className=' text-center'>
											{bike.vin}
										</TableCell>
										<TableCell className='text-center'>
											{bike.model}
										</TableCell>
										<TableCell className='text-center'>
											{bike.plate}
										</TableCell>
										<TableCell className='text-center'>
											{bike.family}
										</TableCell>
										<TableCell className='text-center'>
											{/* <Input
												className='datepicker-input flex h-9 w-[150px] items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm '
												type='date'
												value={selectDate}
												placeholder='Select you date'
												onChange={(e) => {
													setSelectedDate(
														e.target.value
													)
												}}
											/> */}
											{bike.apointments &&
											bike.apointments?.length > 0 ? (
												<>
													<Input
														disabled
														className='datepicker-input flex h-9 w-[150px] items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm '
														type='date'
														value={selectDate}
														placeholder='Select you date'
														onChange={(e) => {
															setSelectedDate(
																e.target.value
															)
														}}
													/>
													<Button
														disabled
														variant='outline'
														className='my-3 text-red-600'
														onClick={() => {
															// console.log(
															// 	selectDate
															// )
															bookBike(bike)
														}}
													>
														Booked!!!
													</Button>
												</>
											) : (
												<>
													<Input
														className='datepicker-input flex h-9 w-[150px] items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm '
														type='date'
														value={selectDate}
														placeholder='Select you date'
														onChange={(e) => {
															setSelectedDate(
																e.target.value
															)
														}}
													/>
													<Button
														variant='secondary'
														className='my-3'
														onClick={() => {
															// console.log(
															// 	selectDate
															// )
															bookBike(bike)
														}}
													>
														Book
													</Button>
												</>
											)}
										</TableCell>

										<TableCell className='text-center'>
											{bike.apointments &&
											bike.apointments?.length > 0
												? bike.apointments[0].preferredDate
														.split('')
														.splice(0, 10)
														.join('')
												: 'Book Your Date!'}
										</TableCell>
										<TableCell>
											<Trash2Icon
												className='mx-auto'
												onClick={() => {
													deleteBike(bike)
												}}
											/>
										</TableCell>
										<TableCell>
											<Dialog>
												<DialogTrigger asChild>
													<Edit3Icon
														className='mx-auto'
														onClick={() => {
															updateBikeState(
																bike
															)
														}}
													/>
												</DialogTrigger>
												<DialogContent>
													<DialogHeader>
														<DialogTitle>
															Edit your bike info!
														</DialogTitle>
														<DialogDescription>
															Make changes to your
															bike here. Click
															save when you're
															done.
														</DialogDescription>
													</DialogHeader>
													<div className='grid gap-4 py-4'>
														<div className='grid grid-cols-4 items-center gap-4'>
															<Label
																htmlFor='vin'
																className='text-right'
															>
																VIN
															</Label>
															<Input
																id='vin'
																value={
																	bikeUpdated?.vin
																}
																className='col-span-3'
																onChange={(
																	e
																) => {
																	setBikeUpdated(
																		{
																			...bikeUpdated,
																			vin: e.target.value.toUpperCase(),
																		}
																	)
																}}
															/>
														</div>
														<div className='grid grid-cols-4 items-center gap-4'>
															<Label
																htmlFor='model'
																className='text-right'
															>
																Model
															</Label>
															<Input
																id='model'
																value={
																	bikeUpdated?.model
																}
																className='col-span-3'
																onChange={(
																	e
																) => {
																	setBikeUpdated(
																		{
																			...bikeUpdated,
																			model: e.target.value.toUpperCase(),
																		}
																	)
																}}
															/>
														</div>
														<div className='grid grid-cols-4 items-center gap-4'>
															<Label
																htmlFor='plate'
																className='text-right'
															>
																Plate
															</Label>
															<Input
																id='plate'
																value={
																	bikeUpdated?.plate
																}
																className='col-span-3'
																onChange={(
																	e
																) => {
																	setBikeUpdated(
																		{
																			...bikeUpdated,
																			plate: e.target.value.toUpperCase(),
																		}
																	)
																}}
															/>
														</div>

														<div className='grid grid-cols-4 items-center gap-4'>
															<Label
																htmlFor='family'
																className='text-right'
															>
																Family
															</Label>
															<select
																required
																value={
																	bikeUpdated?.family
																}
																className='col-span-3 flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
																onChange={(
																	e
																) => {
																	// console.log(
																	// 	e.target
																	// 		.value
																	// )

																	setBikeUpdated(
																		{
																			...bikeUpdated,
																			family: e
																				.target
																				.value,
																		}
																	)
																}}
															>
																<option
																	value='none'
																	selected
																>
																	Select an
																	Option
																</option>
																<option value='Sportster'>
																	Sportster
																</option>
																<option value='Dyna'>
																	Dyna
																</option>
																<option value='Touring'>
																	Touring
																</option>
																<option value='Softail'>
																	Softail
																</option>
																<option value='Rev-Max'>
																	Rev Max
																</option>
															</select>
														</div>
													</div>
													<DialogFooter>
														<DialogClose asChild>
															<Button
																onClick={
																	updateBike
																}
															>
																Save changes
															</Button>
														</DialogClose>
													</DialogFooter>
												</DialogContent>
											</Dialog>
										</TableCell>
									</TableRow>
								)
							})}
					</TableBody>
				</Table>
			</Card>
		</div>
	)
}

export default MyPage
