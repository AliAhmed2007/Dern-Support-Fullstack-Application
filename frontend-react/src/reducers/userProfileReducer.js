function userProfileReducer(state, { type, payload = null }) {
    switch (type) {
        case 'SET_USER_PROFILE':
            return createUserProfile(state, payload)
        case 'UPDATE_USER_PROFILE':
            return updateUserProfile(state, payload)
        case 'MERGE_USER_PROFILE':
            return mergeUserProfile(state, payload)
        case 'CLEAR_USER_PROFILE':
            return clearUserProfile()

        case 'ADD_PREFERENCES':
            return addPreferences(state, payload);
        case 'REMOVE_PREFERENCES':
            return removePreferences(state, payload);
        case 'CLEAR_PREFERENCES':
            return clearPreferences(state);

        default:
            return state;
    }
}

function createUserProfile(state, userData) {
    localStorage.setItem('userType', userData.user_type)
    return {
        ...state,
        userData: {
            id: userData.id || '',
            firstName: userData.first_name || '',
            lastName: userData.last_name || '',
            email: userData.email || '',
            addressLine: userData.address_line || '',
            city: userData.city || '',
            state: userData.state || '',
            phoneNumber: userData.phone_number || '',
            userType: userData.user_type || 'individual',
            businessName: userData.business_name || '',
            avatar: userData.avatar || ''
        }
    }
}

// following functions need شغل
function updateUserProfile(state, updatedUser) {
    return {
        ...state,
        userData: {
            id: updatedUser.id || state.userData.id,
            firstName: updatedUser.first_name || state.userData.firstName,
            lastName: updatedUser.last_name || state.userData.lastName,
            email: updatedUser.email || state.userData.email,
            addressLine: updatedUser.address_line || state.userData.addressLine,
            city: updatedUser.city || state.userData.city,
            state: updatedUser.state || state.userData.state,
            phoneNumber: updatedUser.phone_number || state.userData.phoneNumber,
            userType: updatedUser.user_type || state.userData.userType,
            businessName: updatedUser.business_name || state.userData.businessName,
            avatar: updatedUser.avatar || state.userData.avatar
        }
    }
}
function clearUserProfile() {
    return {
        userData: {},
        preferences: {}
    }
}

function mergeUserProfile(state, updatedFields) {
    return {
        ...state,
        userData: {
            ...state.userData,
            ...updatedFields
        }
    }
}

function addPreferences(state, payload) {
    // Expect payload to be an object: { preferenceKey, preferenceValue }
    const { preferenceKey, preferenceValue } = payload;
    return {
        ...state,
        preferences: {
            ...state.preferences,
            [preferenceKey]: preferenceValue
        }
    };
}

function removePreferences(state, payload) {
    // Expect payload to be an object: { preferenceKey }
    const { preferenceKey } = payload;
    const newPreferences = { ...state.preferences };
    delete newPreferences[preferenceKey];
    return {
        ...state,
        preferences: newPreferences
    };
}


function clearPreferences(state) {
    return {
        ...state,
        preferences: {}
    }
}

export default userProfileReducer
