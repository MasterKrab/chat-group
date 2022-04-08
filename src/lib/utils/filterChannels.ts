import type Channel from '$lib/types/channel'
import Fuse from 'fuse.js'

const filterChannels = (channels: Channel[], term: string) => {
	const fuse = new Fuse(channels, {
		keys: ['name', 'description']
	})

	const result = fuse.search(term)

	return result.map(({ item }) => item)
}

export default filterChannels
