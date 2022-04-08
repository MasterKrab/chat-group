const getAreDifferentDays = (previusDate: string, date: string) =>
	new Date(previusDate).getDate() !== new Date(date).getDate()

export default getAreDifferentDays
