import { axiosInstance } from "./axios"

export async function getTariff_API(offset = 0, limit = 10) {
   try {
      const response = await axiosInstance.get(
         `/source/tariffs/`, {
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

export async function addTariff_API(data) {
   try {
      const response = await axiosInstance.post(
         `/source/tariffs/`, data
      )

      return [null, response.data]
   } catch (error) {
      return [error, null]
   }
}
export async function editTariff_API(data) {
   try {
      const response = await axiosInstance.put(
         `/source/tariffs/${data.id}/`, data
      )

      return [null, response.data]
   } catch (error) {
      return [error, null]
   }
}


