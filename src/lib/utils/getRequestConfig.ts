import { getToken } from '$lib/utils/token'

const getRequestConfig = () => ({
	headers: {
		Accept: 'application/json',
		Authorization: `Bearer ${getToken()}`
	}
})

export default getRequestConfig
