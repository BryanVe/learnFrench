import {axiosInstance} from '..'

export const getLevels = async () => {
    const response = await axiosInstance.get(`/api/all-levels`)
    return response.data
}

export const getSublevels = async () => {
    const response = await axiosInstance.get(`/api/all-sublevels`)
    return response.data as Record<string, SubLevel>
}