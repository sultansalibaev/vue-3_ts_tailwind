import axios from 'axios'

const $api = axios.create({
	withCredentials: true,
	baseURL: process.env.VUE_APP_SERVER_API
})

$api.interceptors.response.use((config) => {
	console.log('originalRequest', config)
	return config
}, async (error: any) => {
	const originalRequest = error.config
	console.log('originalRequest', originalRequest)
	if (
		error.response?.status === 401 &&
		Boolean(error.config) &&
		error.response?.request?.responseURL !== process.env.VUE_APP_SERVER_API + '/auth/refresh'
	) {
		try {
			const response = await $api.post('/auth/refresh')

			console.log('auth/refresh', response.data)

			// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
			if (!response.data) throw new Error()

			return await $api.request(originalRequest)
		} catch (e) {
			console.error('Пользователь не авторизован', e)
			localStorage.removeItem('user')
		}
	} else {
		throw error
	}
})

export {
	$api
}
