let initState = {}
function paymentReducer(state = initState, action) {
  if(action.type === "PAYMENT") {
    return action.payload
  }
  return initState
}
export default paymentReducer