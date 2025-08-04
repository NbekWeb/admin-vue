import { axiosInstance } from "./axios"

export async function getPayment_API() {
   try {
      const response = await axiosInstance.get(
         `/payment/create/`
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


