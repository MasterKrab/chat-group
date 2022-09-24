import { writable } from 'svelte/store'
import { getToken } from '$lib/utils/token'
import type Message from '$lib/types/message'

const createChat = () => {
	const { subscribe, set, update } = writable<{
		id?: string
		name?: string
		description?: string
		messages?: Message[]
		isLoading: boolean
		sendMessage?: (message: string) => void
		disconnect?: () => void
	}>({
		messages: [],
		isLoading: false
	})

	let socket: WebSocket

	const connect = (channelId = import.meta.env.VITE_DEFAULT_CHANNEL) => {
		socket = new WebSocket(
			`${import.meta.env.VITE_API_SOCKET_URL}/chat?id=${channelId}&token=${getToken()}`
		)

		update((state) => ({
			...state,
			isLoading: true
		}))

		socket.addEventListener('message', (event) => {
			const message = JSON.parse(event.data)

			if (message.type === 'joined') {
				update((state) => ({
					...state,
					name: message.name as string,
					description: message.description as string,
					messages: []
				}))

				window.dispatchEvent(new Event('join-channel'))

				return
			}

			if (message.type === 'messages') {
				update((state) => ({
					...state,
					messages: message.messages as Message[],
					isLoading: false
				}))
			}

			if (message.type === 'message') {
				update((state) => ({
					...state,
					messages: [...state.messages, message.message as Message]
				}))
				return
			}
		})

		const sendMessage = (content: string) => {
			socket.send(
				JSON.stringify({
					type: 'message',
					content
				})
			)
		}

		const disconnect = () => {
			socket.close()
		}

		update((state) => ({
			...state,
			sendMessage,
			disconnect
		}))
	}

	const changeChannel = (id: string) => {
		if (!socket) return connect(id)

		socket.addEventListener('close', () => connect(id))
		socket.close()
	}

	return {
		subscribe,
		set,
		connect,
		changeChannel
	}
}

export default createChat()
