// ** Service Imports
import axiosInstance from 'src/services'

// ** Types Imports

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const ImageUrl = {
  upload: `${baseUrl}/image/upload`,

  get: (filename: string) => `${baseUrl}/image/${filename}`
}

const ImageService = {
  upload: (data: FormData) => {
    return axiosInstance({
      method: 'POST',
      url: ImageUrl.upload,
      data,
      headers: { 'Content-Type': 'multipart/form-data' }
    }) as Promise<{
      image: string
    }>
  },
  get: (filename: string) => {
    return axiosInstance({
      method: 'GET',
      headers: {
        responseType: 'blob'
      },
      url: ImageUrl.get(filename)
    }) as Promise<{
      Ok: boolean
    }>
  }
}

export default ImageService
