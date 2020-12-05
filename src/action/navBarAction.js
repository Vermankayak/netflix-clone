function updateNavBar(operation, index) {
      return({
        type:"updateNavBar",
        payload:{
          operation,
          index
        }
      })
}
export default updateNavBar