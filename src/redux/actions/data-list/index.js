import axios from "axios"

// export const getData = params => {
//   return async dispatch => {
//     await axios.get("/api/datalist/data", params).then(response => {
//       dispatch({
//         type: "GET_DATA",
//         data: response.data.data,
//         totalPages: response.data.totalPages,
//         params
//       })
//     })
//   }
// }

export const getData = (userid, pageamount, pagenum) => {
  return async dispatch => {
    await axios
      .get("http://203.251.135.81:9300/v1/doctor/patient/patients", {
        params: {
          user_id: userid,
          page_amount: pageamount,
          page_num: pagenum
        }
  })
    .then(response => {
      dispatch({
        type: "GET_DATA",
        data: response.data.data.PATIENT_LIST,
        totalPages: response.data.totalPages,
        // params
      })
    })
    .catch(err => console.log(err))
  }
}


export const getInitialData = () => {
  return async dispatch => {
    await axios.get("/api/datalist/initial-data").then(response => {
      dispatch({ type: "GET_ALL_DATA", data: response.data })
    })
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: "FILTER_DATA", value })
}

export const deleteData = obj => {
  return dispatch => {
    axios
      .post("/api/datalist/delete-data", {
        obj
      })
      .then(response => {
        dispatch({ type: "DELETE_DATA", obj })
      })
  }
}

export const updateData = obj => {
  return (dispatch, getState) => {
    axios
      .post("/api/datalist/update-data", {
        obj
      })
      .then(response => {
        dispatch({ type: "UPDATE_DATA", obj })
      })
  }
}

export const addData = obj => {
  return (dispatch, getState) => {
    let params = getState().dataList.params
    axios
      .post("/api/datalist/add-data", {
        obj
      })
      .then(response => {
        dispatch({ type: "ADD_DATA", obj })
        dispatch(getData(params))
      })
  }
}
