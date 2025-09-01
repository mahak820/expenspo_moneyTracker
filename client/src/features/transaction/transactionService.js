import axios from "axios"
import { api } from "../../api/api"

const getallTransactions = async(token) => {

   let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    // console.log(options)

    const response = await  axios.get(`${api}/finance` , options)

    return response.data
    // console.log(response.data)

}

const financeService = {getallTransactions}

export default financeService