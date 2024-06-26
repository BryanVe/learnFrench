import { axiosInstance } from '..'

export const getChaptersBySublevelId = async (sublevelId: number) => {
	const response = await axiosInstance.get(
		`/api/chapters/sublevel/${sublevelId}`
	)
	return response.data as Chapter[]
}
