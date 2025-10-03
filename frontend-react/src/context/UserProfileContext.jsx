import { createContext, useCallback, useEffect, useReducer } from "react"
import userProfileReducer from "../reducers/userProfileReducer"
import useAuth from "../hooks/useAuth"
import fetchUser from "../api/userAccounts/fetchUser"

export const UserProfileContext = createContext(null)

// Initial state with empty/default userData and preferences.
const initialState = {
  userData: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    addressLine: '',
    city: '',
    state: '',
    phoneNumber: '',
    userType: null,
    businessName: '',
    avatar: null
  },
  preferences: {},
  isLoading: false
}

function UserProfileProvider({ children }) {
  const { isAuthenticated, token, id } = useAuth().authUser
  const [userProfile, dispatch] = useReducer(userProfileReducer, initialState)

  userProfile['isLoading'] = false

  userProfile.userData.email && userProfile.userData.userType
    ? userProfile.isLoading = true
    : userProfile.isLoading = false

  const loadUserProfile = useCallback(async () => {
    async function fetchAndSetUserProfile() {
      if (!isAuthenticated) {
        dispatch({ type: "CLEAR_USER_PROFILE" })
      }

      try {
        const user = await fetchUser(id, token)
        dispatch({ type: 'SET_USER_PROFILE', payload: user.data })
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }

    fetchAndSetUserProfile()
  }, [isAuthenticated, id, token])

  // Persist preferences to localStorage whenever they change.
  useEffect(() => {
    if (userProfile?.preferences) {
      localStorage.setItem('preferences', JSON.stringify(userProfile.preferences))
    }
  }, [userProfile?.preferences])

  return (
    <UserProfileContext.Provider value={{ userProfile, userProfileDispatch: dispatch, loadUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  )
}

export default UserProfileProvider
