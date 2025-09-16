import axios from "axios";

const templateToPdfApi = axios.create({
  baseURL: "https://localhost:7275/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default templateToPdfApi;
