const getAvatar = (username: string, avatar?: string) =>
	avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${name}`

export default getAvatar
