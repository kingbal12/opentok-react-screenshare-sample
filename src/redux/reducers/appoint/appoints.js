

const appoints = (state = {}, action) => {
  switch (action.type) {
    case "GET_APPOINTS":
 
      return { ...state, values:action}

    default:
      return { ...state }
  }
}
export default appoints
