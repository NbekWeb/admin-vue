import { axiosInstance } from "./axios"

export async function getEnCoder_API(offset = 0, limit = 10) {
   try {
      const response = await axiosInstance.get(
         `/device/definition/`, {
         params: {
            offset,
            limit
         }
      }
      )

      return [null, response.data]
   } catch (error) {
      return [error, null]
   }
}

export async function addEnCoder_API(data) {
   try {
      const response = await axiosInstance.post(
         `/device/definition/`, data
      )

      return [null, response.data]
   } catch (error) {
      return [error, null]
   }
}
export async function editEnCoder_API(data) {
   try {
      const response = await axiosInstance.patch(
         `/device/definition/${data.user}/`, data
      )

      return [null, response.data]
   } catch (error) {
      return [error, null]
   }
}


