import '../App.css'
import { AuthContext } from '@/context/AuthContext'
import { useContext, useState, useEffect } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
	createViewMonthAgenda,
	createViewMonthGrid,
	createViewWeek,
} from '@schedule-x/calendar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import '@schedule-x/theme-default/dist/index.css'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import CustomTimeGridEvent from '../components/CustomTimeGridEvent.tsx'
import CustomDateGridEvent from '../components/CustomDateGridEvent.tsx'

function MyAppointments() {
	const eventsService = useState(() => createEventsServicePlugin())[0]
	const { user } = useContext(AuthContext)

	let appo: any = []
	let test2 = user.bikes.filter((bike: any) => {
		if (bike.apointments.length > 0) {
			let newAppointment = {
				id: bike.apointments[0].id,
				title: `Service ${bike.plate} ${bike.model}`,
				start: `${bike.apointments[0].preferredDate
					.split('')
					.splice(0, 10)
					.join('')} 10:00`,
				end: `${bike.apointments[0].preferredDate
					.split('')
					.splice(0, 10)
					.join('')} 16:00`,
			}
			appo.push(newAppointment)

			return newAppointment
		}
	})
	console.log('apointments', appo)
	console.log('tests', test2)

	if (test2.length === 0) {
		return (
			<div className='w-full flex-col intro-h justify-center content-center '>
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
				<div>
					<h1>THERE'S NO BOOKINGS!!!!!</h1>
				</div>
			</div>
		)
	} else {
		let calendar = useCalendarApp({
			dayBoundaries: {
				start: '09:00',
				end: '17:00',
			},
			weekOptions: {
				/**
				 * The total height in px of the week grid (week- and day views)
				 * */
				gridHeight: 500,

				/**
				 * The number of days to display in week view
				 */
				// nDays: 5,

				/**
				 * The width in percentage of the event element in the week grid
				 * Defaults to 100, but can be used to leave a small margin to the right of the event
				 */
				eventWidth: 95,

				/**
				 * Intl.DateTimeFormatOptions used to format the hour labels on the time axis
				 * Default: { hour: 'numeric' }
				 */
				timeAxisFormatOptions: { hour: '2-digit', minute: '2-digit' },
			},
			views: [
				createViewWeek(),
				createViewMonthGrid(),
				createViewMonthAgenda(),
			],

			events: appo,

			theme: 'shadcn',
			plugins: [eventsService],
		})
		useEffect(() => {
			//get all events

			eventsService.getAll()
		}, [])
		return (
			<div className='w-full flex-col intro-h justify-center content-center '>
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
				<ScheduleXCalendar
					calendarApp={calendar}
					customComponents={{
						timeGridEvent: CustomTimeGridEvent,
						dateGridEvent: CustomDateGridEvent,
					}}
				/>
			</div>
		)
	}
}

export default MyAppointments
