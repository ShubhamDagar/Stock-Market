export const logIn = (user) => {
    return {
        type: "USER_LOGGEDIN",
        payLoad: {
            logUser : user
        }
    }
}
export const logOut = () => {
    return {
        type: "USER_LOGGEDOUT"
    }
}