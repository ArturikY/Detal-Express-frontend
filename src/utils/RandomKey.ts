export const RandomKey = () => {
	let key = Math.floor(Math.random() * 1000)

	if (key < 100) {
		key += 100
	}

	return `${key}`
}
