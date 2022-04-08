import { writable } from 'svelte/store'
import type User from '$lib/types/user'
import { getIsToken, removeToken, TOKEN_KEY } from '$lib/utils/token'
import axios from 'axios'
import getRequestConfig from '$lib/utils/getRequestConfig'

const createChannels = () => {
	const { subscribe, set, update } = writable<{
		data: User | null
		isLoading: boolean
	}>({
		data: null,
		isLoading: true
	})

	const updateUser = (user: User | null) => {
		update((state) => ({
			...state,
			data: user
		}))
	}

	const fetchUser = () => {
		if (!getIsToken())
			return set({
				data: null,
				isLoading: false
			})

		axios
			.get<User>(`${import.meta.env.VITE_API_URL}/user`, getRequestConfig())
			.then(({ data }) => updateUser(data))
			.catch(() => updateUser(null))
			.finally(() =>
				update((state) => ({
					...state,
					isLoading: false
				}))
			)
	}

	const handleStorage = ({ key }: StorageEvent) => {
		key === TOKEN_KEY && fetchUser()
	}

	const connect = () => {
		fetchUser()

		window.addEventListener('storage', handleStorage)
		window.addEventListener('token-change', fetchUser)
	}

	const removeUser = () => {
		removeToken()
	}

	return {
		subscribe,
		set,
		connect,
		updateUser,
		removeUser
	}
}

export default createChannels()
