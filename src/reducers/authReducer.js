let initState = {}
function authReducer(state=initState, action) {
  if (action.type === "REG_ACTION") {
    return action.payload
  }else if(action.type==="LOGOUT"){
    return initState
  }
  else{
    return state
  }
}
export default authReducer