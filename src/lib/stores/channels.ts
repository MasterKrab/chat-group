import { writable } from 'svelte/store'
import type Channel from '$lib/types/channel'
import chat from '$lib/stores/chat'

const createChannels = () => {
	const { subscribe, set, update } = writable<{
		items: Channel[]
		isLoading: boolean
		createChannel?: (name: string, description?: string) => void
	}>({
		items: [],
		isLoading: true
	})

	let socket: WebSocket

	const connect = () => {
		socket = new WebSocket(`${import.meta.env.VITE_API_SOCKET_URL}/channels`)

		update((state) => ({
			...state,
			isLoading: true
		}))

		socket.addEventListener('message', (event) => {
			const message = JSON.parse(event.data)

			if (message.type === 'channels') {
				update((state) => ({
					...state,
					items: message.channels,
					isLoading: false
				}))
				return
			}

			if (message.type === 'new') {
				update((state) => ({
					...state,
					items: [...state.items, message.channel]
				}))
			}
		})

		const createChannel = (name: string, description?: string) => {
			socket.send(
				JSON.stringify({
					type: 'create',
					name,
					description
				})
			)
		}

		update((state) => ({
			...state,
			createChannel
		}))
	}

	const disconnect = () => {
		socket && socket.close()
	}

	return {
		subscribe,
		set,
		connect,
		disconnect
	}
}

export default createChannels()
