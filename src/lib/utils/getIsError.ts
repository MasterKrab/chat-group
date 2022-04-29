import axios from 'axios'
import type { AxiosError } from 'axios'

const getIsError = (
	error: Error
): error is AxiosError<{
	detail: string
}> =>
	axios.isAxiosError(error) &&
	error.response &&
	error.response.data &&
	typeof error.response.data.detail === 'string'

export default getIsError
