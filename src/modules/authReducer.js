//@ts-check
const initialAuthState = { isLoggedIn: false };

export default (previousState, action) => {
    switch(action.type) {
        case 'LOGIN_UPDATE':
            return { ...previousState, isLoggedIn: action.isLoggedIn, user: action.user }
        default:
            return previousState || initialAuthState;
    }
}
