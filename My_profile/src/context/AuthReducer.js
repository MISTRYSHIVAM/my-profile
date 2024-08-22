const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                fetchingUserdata: true,
                error: false
            }

        case "LOGIN_PASS":
            return {
                user: action.payload,
                fetchingUserdata: false,
                error: false
            }

        case "LOGIN_FAIL":
            return {
                user: null,
                fetchingUserdata: false,
                error: action.payload
            }

        case "LOGOUT":
            return {
                user: null,
                fetchingUserdata: false,
                error: false
            }
        default:
            return state
    }
}

export default AuthReducer