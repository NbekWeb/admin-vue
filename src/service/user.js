import { axiosInstance } from "./axios"

export async function getUser_API(offset = 0, limit = 10) {
   try {
      const response = await axiosInstance.get(
         `/source/users/`, {
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

export async function addUser_API(data) {
   try {
      const response = await axiosInstance.post(
         `/source/users/`, data
      )

      return [null, response.data]
   } catch (error) {
      return [error, null]
   }
}
export async function editUser_API(data) {
   try {
      const response = await axiosInstance.put(
         `/source/Users/${data.id}/`, data
      )

      return [null, response.data]
   } catch (error) {
      return [error, null]
   }
}


