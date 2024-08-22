import { createContext, useReducer } from 'react'
import AuthReducer from './AuthReducer';

const INISIAL_STATE = {
    user : null,
    fetchingUserdata : false,
    error : false
}

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [state , dispatch] = useReducer(AuthReducer,INISIAL_STATE);

    return (
        <AuthContext.Provider value={{user : state.user , fetchingUserdata : state.fetchingUserdata , error : state.error , dispatch}} >
            {children}
        </AuthContext.Provider>
    )
}