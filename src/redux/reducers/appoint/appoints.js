const initialState = {
  COUNT_DAY: 0,
  COUNT_MON: 0,
  APPOINT_LIST: []
}

const appoints = (state = initialState, action) => {
  switch (action.type) {
    case "GET_APPOINTS":
      return { ...state, appoints: action.payload}

    default:
      return { ...state }
  }
}
export default appoints
