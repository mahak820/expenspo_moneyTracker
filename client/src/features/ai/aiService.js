// src/features/ai/aiService.js
import axios from "axios";
import { api } from "../../api/api";

const generateReport = async (token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${api}/ai/report`, options);
//   console.log(response.data)
  return response.data; // this is AI's response
};

const generatePlan = async (formData , token) => {
    // console.log(formData)
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(formData)

  const response = await axios.post(`${api}/ai/saving` , formData ,   options);
  // console.log(response.data)
  return response.data; // this is AI's response
};

const generateChat = async (userQuery , token) => {
    // console.log(userQuery)
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(formData)

  const response = await axios.post(`${api}/ai/chat` , {userQuery} ,   options);
  // console.log(response.data)
  return response.data; // this is AI's response
};

const aiService = {
  generateReport, generatePlan , generateChat
};

export default aiService;
