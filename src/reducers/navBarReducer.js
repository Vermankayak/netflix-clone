function navBarReducer(state = "home", action) {
  if (action.type === "updateNavBar") {
    let newState
    newState=[...state]
    if (action.payload.operation === "/") {
      newState = "home"
    }
    else if (action.payload.operation === "signin") {
      newState = "signIn"
    }
    else if (action.payload.operation === "signup") {
      newState = "signUp"
    }
    else{
      newState = "browse"
    }
    return newState
  }else{
    return state
  }
 
}
export default navBarReducer