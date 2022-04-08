export const TOKEN_KEY = 'token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const setToken = (token: string) => {
	localStorage.setItem(TOKEN_KEY, token)
	window.dispatchEvent(new CustomEvent('token-change'))
}
export const removeToken = () => {
	localStorage.removeItem(TOKEN_KEY)
	window.dispatchEvent(new CustomEvent('token-change'))
}

export const getIsToken = () => !!getToken()
