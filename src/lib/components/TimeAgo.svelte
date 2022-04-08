<script lang="ts">
	import { afterUpdate } from 'svelte'
	import dateToRelativeTime from '$lib/utils/dateToRelativeTime'

	export let date: string

	interface TimeUnits {
		[key: string]: number
	}

	const TIME_UNITS: TimeUnits = {
		second: 1000,
		minute: 60000,
		hour: 3600000
	}

	const getTimeUnit = (relativeTime: string) => {
		if (relativeTime === 'now') return TIME_UNITS.second

		const regex = /second|minute|hour/

		const match = relativeTime.match(regex)

		return match ? TIME_UNITS[match[0]] : null
	}

	const normalizedDate = new Date(date)

	let relativeTime = dateToRelativeTime(normalizedDate)
	let timeout: NodeJS.Timeout

	const updateRelativeTime = () => {
		if (timeout) clearTimeout(timeout)

		const time = getTimeUnit(relativeTime)

		if (!time)
			return (relativeTime = normalizedDate.toLocaleString('en', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			}))

		relativeTime = dateToRelativeTime(new Date(date))

		timeout = setTimeout(() => (relativeTime = dateToRelativeTime(normalizedDate)), time)
	}

	afterUpdate(updateRelativeTime)
</script>

<time datetime={date}>{relativeTime}</time>
