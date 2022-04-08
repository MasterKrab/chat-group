const getAvatar = (username: string, avatar?: string) =>
	avatar || `https://avatars.dicebear.com/api/identicon/${username}.svg`

export default getAvatar
