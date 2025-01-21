import { useEffect, useState, useContext } from 'react'
// SCHEDULE
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
	createViewMonthAgenda,
	createViewMonthGrid,
	createViewWeek,
} from '@schedule-x/calendar'
import CustomTimeGridEvent from '../components/CustomTimeGridEvent.tsx'
import CustomDateGridEvent from '../components/CustomDateGridEvent.tsx'
import { AuthContext } from '@/context/AuthContext'

function AllAppointments() {
	const eventsService = useState(() => createEventsServicePlugin())[0]
	const { custAppointments } = useContext(AuthContext)
	// const [custAppointments, setCustAppointments] = useState([])
	console.log(custAppointments)

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

		events: custAppointments,

		theme: 'shadcn',
		plugins: [eventsService],
	})
	//////////////////
	useEffect(() => {
		eventsService.getAll()
	}, [])
	return (
		<div>
			AllAppointments
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
export default AllAppointments
