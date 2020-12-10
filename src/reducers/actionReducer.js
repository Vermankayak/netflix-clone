let initState = {bg_color:["bg-success","bg-primary", "bg-primary", "bg-primary"], plan:0}
function actionReducer(state = initState, action) {
if (action.type === "ACTION") {
if (action.payload.obj) {
  console.log(action.payload.obj)
  return action.payload.obj
}else{
  return initState
}
}
return state
}
export default actionReducer