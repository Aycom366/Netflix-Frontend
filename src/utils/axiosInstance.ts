import axios from "axios";

const instance = axios.create({
  baseURL: "https://ay-netflix.herokuapp.com",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  },
});

export default instance;
