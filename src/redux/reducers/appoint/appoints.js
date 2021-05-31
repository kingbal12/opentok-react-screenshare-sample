let initialState = {
  COUNT_DAY: 0,
  COUNT_MON: 0,
  APPOINT_LIST: []
}

const appoints = (state = initialState, action) => {
  switch (action.type) {
    case "GET_APPOINTS":
      let appointlist= [...state.APPOINT_LIST]
      appointlist = action.appointlist
 
      return { ...state, appointlist}

    default:
      return { ...state }
  }
}
export default appoints
