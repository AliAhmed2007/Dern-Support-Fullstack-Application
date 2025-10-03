import { createContext, useReducer } from "react"
import authReduer from "../reducers/AuthReducer"

export const AuthContext = createContext(null)

function authInitializer() {
  const authInfo = localStorage.getItem('auth');
  return authInfo
    ? JSON.parse(authInfo)
    : {
      isAuthenticated: false,
      token: null,
      tokenType: '',
      id: null
    }
}

function AuthProvider({ children }) {
  const [authUser, dispatch] = useReducer(authReduer, null, authInitializer)

  return (
    <AuthContext.Provider value={{ authUser, authDispatch: dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider