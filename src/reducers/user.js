import ActionUser from "../actions/actionUser";

var initialState = {
  isLogin: false,
  id: null,
  firstName: null,
  lastName: null,
  username: null,
  position: null,
  team: null,
  picture: null,
  tiken: null
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ActionUser.STORE_USER_INFO:
      return {
        isLogin: true,
          id: action.id,
          firstName: action.firstName,
          lastName: action.lastName,
          username: action.username,
          position: action.position,
          team: action.team,
          picture: action.picture,
          token: action.token
      };
    case ActionUser.STORE_USER_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case ActionUser.CLEAR_USER:
      return state;
    default:
      return state;
  }
}

export default userReducer;