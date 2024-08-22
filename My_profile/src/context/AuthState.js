export const loginStart = (userCredentials) =>({
    type : "LOGIN_START"
})

export const loginPass = (user) =>({
    type : "LOGIN_PASS",
    payload : user
})

export const loginFail = (error) =>({
    type : "LOGIN_FAIL",
    payload : error
})

export const logout = (user) =>({
    type : "LOGOUT"
})
