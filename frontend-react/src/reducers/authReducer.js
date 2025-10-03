export default function authReduer(state, { type, payload = null }) {
    switch (type) {
        case 'LOGIN':
            return login(payload)
        case 'LOGOUT':
            return logout()
        case 'REFRESH_TOKEN':
            refreshToken(state, payload)
            break;
        default:
            return state;
    }
}

function login({ access_token, token_type, user_id }) {
    localStorage.setItem('auth', JSON.stringify({ token: access_token, isAuthenticated: true, id: user_id }))
    return {
        isAuthenticated: true,
        token: access_token,
        tokenType: token_type,
        id: user_id
    }
}

function logout() {
    const darkMode = localStorage.getItem('darkMode')
    localStorage.clear()
    localStorage.setItem('darkMode', darkMode)
    return {
        isAuthenticated: false,
        token: null,
        tokenType: '',
        id: null
    }
}

function refreshToken(state, {userToken}) {
    const localStorageAuth = JSON.parse(localStorage.getItem('auth'))
    localStorage.setItem('auth', {token: userToken, ...localStorageAuth})
    return {
        token: userToken,
        ...state
    }
}