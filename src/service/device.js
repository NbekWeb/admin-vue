import { axiosInstance } from "./axios"

export async function getDevice_API(offset = 0, limit = 10) {
   try {
      const response = await axiosInstance.get(
         `/device/devices/`, {
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

export async function addDevice_API(data) {
   try {
      const response = await axiosInstance.post(
         `/device/devices/`, data
      )

      return [null, response.data]
   } catch (error) {
      return [error, null]
   }
}
export async function editDevice_API(data) {
   try {
      const response = await axiosInstance.put(
         `/device/devices/${data.id}/`, data
      )

      return [null, response.data]
   } catch (error) {
      return [error, null]
   }
}


