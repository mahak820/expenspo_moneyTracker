import axios from "axios"
import { api } from "../../api/api"

const getAllExpenses = async(token) => {

   let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await  axios.get(`${api}/expense` , options)

    return response.data

}

//Add EXPENSE
const addExpense = async(formData , token) => {

   let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await  axios.post(`${api}/expense` , formData ,options)

    return response.data
    // console.log(response.data)

}


//Update Expense
const updateExpense = async(formData , eid ,  token) => {

            // console.log(formData , iid , token)


   let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await  axios.put(`${api}/expense/${eid}` , formData ,options)

    return response.data
    // console.log(response.data)

}

//Delete income
const deleteExpense = async(eid ,  token) => {

            // console.log(formData , iid , token)


   let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await  axios.delete(`${api}/expense/${eid}` , options)

    return response.data
    // console.log(response.data)

}



const expenseService = {getAllExpenses , addExpense , updateExpense , deleteExpense}

export default expenseService