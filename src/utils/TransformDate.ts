export const TransformDate = (date: String) => {
	const currentDate = date.split('T')[0].split('-')
	const validDate = `${currentDate[2]}.${currentDate[1]}.${currentDate[0]}`

	return validDate
}
