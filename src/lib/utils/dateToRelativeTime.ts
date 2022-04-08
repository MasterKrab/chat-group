type Unit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'

type DateUnit = [Unit, number]

type DateUnits = DateUnit[]

const DATE_UNITS: DateUnits = [
	['year', 31536000],
	['month', 2592000],
	['week', 604800],
	['day', 86400],
	['hour', 3600],
	['minute', 60],
	['second', 1]
]

const [LAST_UNIT] = DATE_UNITS[DATE_UNITS.length - 1]

interface DateDiffs {
	value: number
	unit: Unit
}

const getDateDiffs = (date: Date): DateDiffs => {
	const now = Date.now()
	const elapsed = (date.getTime() - now) / 1000

	const [unit, secondsInUnit] = DATE_UNITS.find(
		([unit, secondsInUnit]) => Math.abs(elapsed) > secondsInUnit || unit === LAST_UNIT
	)

	return {
		unit,
		value: Math.round(elapsed / secondsInUnit)
	}
}

const dateToRelativeTime = (date: Date): string => {
	const rtf = new Intl.RelativeTimeFormat('en')

	const { value, unit } = getDateDiffs(date)

	const result = rtf.format(value, unit)

	return result === '0 seconds ago' ? 'now' : result
}

export default dateToRelativeTime
