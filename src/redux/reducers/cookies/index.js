export const cookiesReducer = (
  state = { userRole: "admin", 
  email: "", 
  register3: {
    hospitalname: "",
    businessnumber:"",
    zipcode:"",
    address1:"",
    address2:"",
    phonenumber:"",
    accountname:"",
    bankname:"",
    accountnumber:""
  },
  register4: {
    medicalpart: "01", 
    medicalable: "", 
    medicaldesc: "", 
    medicalnum: "", 
    userdesc: "",
    previewURL : "",
  },
 
  events:[]
 
 }, action) => {
  switch (action.type) {
    case "SAVE_EMAIL": {
      return { ...state, email: action.payload }
    }
    case "DEL_EMAIL": {
      return { ...state, email: action.payload }
    }
    case "SAVE_REGISTER3": {
      return { ...state, register3: action.payload }
    }
    case "SAVE_REGISTER4": {
      return { ...state, register4: action.payload }
    }
    case "SAVE_SCHDULES": {
      return { ...state, events: action.payload }
    }
    default: {
      return state
    }
  }
}
