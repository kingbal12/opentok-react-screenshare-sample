export const saveemail = (email) => {
  return dispatch => {
  
    dispatch({ type: "SAVE_EMAIL", payload: email })
  
   
  }
}

export const delemail = () => {
  return dispatch => {
    dispatch({ type: "DEL_EMAIL", payload: "" })
  }
}

export const saveRegister3 = (
  hospitalname,
  businessnumber,
  zipcode,
  address1,
  address2,
  phonenumber,
  accountname,
  bankname,
  accountnumber 
  ) => {
  return dispatch => {
    dispatch({ 
      type: "SAVE_REGISTER3", 
      payload: {
      hospitalname,
      businessnumber,
      zipcode,
      address1,
      address2,
      phonenumber,
      accountname,
      bankname,
      accountnumber} })
  }
}

export const saveRegister4 = (
  medicalpart,
  medicalable,
  medicaldesc,
  medicalnum,
  userdesc,
  previewURL
  ) => {
  return dispatch => {
    dispatch({ 
      type: "SAVE_REGISTER4", 
      payload: {
      medicalpart,
      medicalable,
      medicaldesc,
      medicalnum,
      userdesc,
      previewURL
    } })
  }
}

export const cookieSchedules = (
  events
  ) => {
  return dispatch => {
    console.log(events)
    dispatch({ 
      type: "SAVE_SCHDULES", 
      payload: {
        events
    } })
  }
}

export const saveMyinfo = (
  medicalpart,
  medicalable,
  medicaldesc,
  userdesc,
  ) => {
  return dispatch => {
    dispatch({ 
      type: "SAVE_MYINFO", 
      payload: {
      medicalpart,
      medicalable,
      medicaldesc,
      userdesc,
    } })
  }
}