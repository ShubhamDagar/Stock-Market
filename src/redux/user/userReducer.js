const initialState = {
    user: JSON.parse(localStorage.getItem("stockUser"))
}
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGGEDIN":
          localStorage.setItem("stockUser", JSON.stringify({ ...action.payLoad.logUser, password: "" }));
      return {
        ...state,
        user: action.payLoad.logUser
      };
    case "USER_LOGGEDOUT":
      localStorage.removeItem("stockUser");
      return {...state, user: undefined};
    default:
      return state;
  }
};

export default userReducer;
