import axios from "axios";

const instance = axios.create({
  baseURL: "web-production-cef1.up.railway.app",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  },
});

export default instance;
