export const electrodomesticosData = [
	{
		page: 1,
		electrodomesticos: [
			{
				id: "01",
				name: "televisor",
				price: "50.000",
			},
			{
				id: "02",
				name: "licuadora",
				price: "20.000",
			},
		],
	},
	{
		page: 2,
		electrodomesticos: [
			{
				id: "03",
				name: "cafetera",
				price: "35.000",
			},
			{
				id: "04",
				name: "microondas",
				price: "150.000",
			},
		],
	},
	{
		page: 3,
		electrodomesticos: [
			{
				id: "05",
				name: "pochoclera",
				price: "15.000",
			},
			{
				id: "06",
				name: "heladera",
				price: "500.000",
			},
		],
	},
]

export const getAllElectrodomesticos = () => {
	return electrodomesticosData.flatMap(pageData => {
		return (
			pageData.electrodomesticos?.filter(
				electrodomestico => electrodomestico
			) || []
		)
	})
}

export const searchElectrodomesticos = (params: {
	page: number
	filter: string
	sort: "asc" | "desc"
}) => {
	const { page, filter, sort } = params

	const filterLower = filter.trim().toLowerCase()

	const filteredElectrodomesticos = electrodomesticosData.flatMap(pageData => {
		return (
			pageData.electrodomesticos?.filter(electrodomestico => {
				return (
					electrodomestico?.name?.toLowerCase().includes(filterLower) ?? false
				)
			}) || []
		)
	})

	const sortedAndFilteredElectodomesticos =
		sort === "asc"
			? filteredElectrodomesticos.sort((a, b) => a.name.localeCompare(b.name))
			: filteredElectrodomesticos.sort((a, b) => b.name.localeCompare(a.name))

	return sortedAndFilteredElectodomesticos
}
