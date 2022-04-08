const getInitials = (name: string) =>
	name
		.split(' ', 2)
		.map((word) => word.charAt(0))
		.join('')

export default getInitials
