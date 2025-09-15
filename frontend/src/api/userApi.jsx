import axios from "axios";

export const SignUp = (data) => {
  return axios.post("http://127.0.0.1:8000/user/signup", data);
};


export const Login = (data) => {
  return axios.post("http://127.0.0.1:8000/user/login", data);
}