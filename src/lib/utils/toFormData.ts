const toFormData = (data: object) => {
	const formData = new FormData()

	for (const key in data) {
		formData.append(key, data[key])
	}

	return formData
}

export default toFormData
