import { axiosAuthInstance } from "./axios"

export async function signIn_API(payload) {
   try {
      const response = await axiosAuthInstance.post(
         `/account/login/`, payload
      )

      return [null, response.data]
   } catch (error) {
      return [error, null]
   }
}

export async function register_API(payload) {
   try {
      const response = await axiosAuthInstance.post(
         `/account/registration/`, payload
      )

      return [null, response.data]
   } catch (error) {
      return [error, null]
   }
}
