import axios from "axios"
import { api } from "../../api/api"
// import { api } from "../../api/api"

const register = async (formData) => {

    const response = await axios.post(`${api}/auth` , formData)
    localStorage.setItem('user' , JSON.stringify(response.data))
    return response.data

}

const logout = async () => {

    localStorage.removeItem("user")

}

const authService = {register , logout}

export default authService