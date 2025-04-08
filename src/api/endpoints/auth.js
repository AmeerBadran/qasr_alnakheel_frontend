import axiosInstance from "../axios";

export const logIn = (loginData) => {
  console.log("logIn")
  return axiosInstance.post('/auth/login', loginData, {
    withCredentials: true
  });
}

export const logOut = () => {
  return axiosInstance.post('/auth/logout', {}, {
    withCredentials: true
  });
}

export const signUp = (signUpData) => {
  return axiosInstance.post('/auth/signup', signUpData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export const getUserData = () => {
  return axiosInstance.get('/auth/')
}

export const verifyEmail = (id, email) => {
  email = "abad@gmail.com"
  return axiosInstance.post(`/auth/sendVerificationCode/${id}`, { email })
}
