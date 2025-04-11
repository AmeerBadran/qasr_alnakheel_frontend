import axiosInstance from "../axios";

export const logIn = (loginData) => {
  console.log("logIn")
  return axiosInstance.post('/auth/login', loginData, {
    withCredentials: true
  });
}

export const logOut = () => {
  console.log("object")
  return axiosInstance.post('/auth/logout', {}, {
    withCredentials: true
  });
}

export const signUp = (signUpData) => {
  return axiosInstance.post('/auth/', signUpData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export const sendVerificationCode = (email) => {
  return axiosInstance.post('/auth/sendVerificationCode', { email })
}

export const verifyCode = (data) => {
  return axiosInstance.post('/auth/verifyAccount', data)
}

export const getUserData = () => {
  return axiosInstance.get('/auth/', { withCredentials: true })
}
