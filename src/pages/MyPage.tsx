import { AuthContext } from '@/context/AuthContext'
import React, { useContext, useEffect, useState, ChangeEvent } from 'react'
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
import { useParams } from 'react-router-dom'

type Family = 'Sportster' | 'Dyna' | 'Touring' | 'Rev-Max' | 'Softail'

type Bike = {
	plate?: string
	model?: string
	family?: Family
}
// type Bike = {
// 	plate: string
// 	model?: string
// 	family?: 'Sportster' | 'Dyna' | 'Touring' | 'Rev-Max' | 'Softail'
// }

function MyPage() {
	const { user } = useContext(AuthContext)

	const [bike, setBike] = useState<Bike | null>(null)
	const [myBikes, setMyBikes] = useState<Bike[] | undefined>([])
	const APIURL = import.meta.env.VITE_APIURL
	useEffect(() => {
		// const { userId } = useParams()
		// async function getBikes() {
		// 	try {
		// 		let bikeCreated = await fetch(
		// 			`${APIURL}/my-page/bikes/${userId}`,
		// 			{
		// 				method: 'POST',
		// 				headers: { 'Content-Type': 'application/json' },
		// 				body: JSON.stringify(newBike),
		// 			}
		// 		)
		// 	} catch (error) {}
		// }
		// getBikes()
	}, [user.id])

	return (
		<div>
			<div>
				<h1>Hello, {user.firstName}</h1>
			</div>
			<Card className='max-w-[1000px] m-auto mt-10'>
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

								setMyBikes([...myBikes, bike])
							}}
						>
							<div className='grid w-full items-center gap-4'>
								<div className='flex flex-col space-y-1.5'>
									<Label htmlFor='model'>Model</Label>
									<Input
										id='model'
										placeholder='Your Model: Ex Street Bob'
										value={bike?.model}
										onChange={(e) => {
											console.log(e.target.value)

											setBike({
												...bike,
												model: e.target.value,
											})
										}}
									/>
									<Label htmlFor='plate'>Plate</Label>
									<Input
										required
										id='plate'
										placeholder='Your Plate Number'
										value={bike?.plate}
										onChange={(e) => {
											console.log(e.target.value)

											setBike({
												...bike,
												plate: e.target.value,
											})
										}}
									/>
								</div>
								<div className='flex flex-col space-y-1.5'>
									<Label htmlFor='family'>Family</Label>
									<select
										required
										value={bike?.family}
										className='flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
										onChange={(e) => {
											console.log(e.target.value)

											setBike({
												...bike,
												family: e.target.value,
											})
										}}
									>
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
								<Button>Abb Bike</Button>
							</div>
						</form>
					</CardContent>
				</CardHeader>
			</Card>
		</div>
	)
}

export default MyPage
