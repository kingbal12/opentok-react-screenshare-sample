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
      let totalPage = Math.ceil(response.data.data.COUNT / 5)
      console.log(totalPage, response)

      let length = response.data.data.PATIENT_LIST.length
      console.log("length :" + length)
      let patientlist 	= new Array();
      for (let i=0; i<length; i++) {
        let jsonObj		= new Object();         
        jsonObj.PATIENT_ID		= response.data.data.PATIENT_LIST[i].PATIENT_ID
        jsonObj.F_NAME = response.data.data.PATIENT_LIST[i].F_NAME
        jsonObj.GENDER	= response.data.data.PATIENT_LIST[i].GENDER
        jsonObj.AGE = response.data.data.PATIENT_LIST[i].AGE
        jsonObj.BIRTH_DT = response.data.data.PATIENT_LIST[i].BIRTH_DT
        jsonObj.NOTE_DX = response.data.data.PATIENT_LIST[i].NOTE_DX
        jsonObj.FIRST_YN = response.data.data.PATIENT_LIST[i].FIRST_YN
        jsonObj.BP = response.data.data.PATIENT_LIST[i]["1_STATE"]
        jsonObj.PULSE = response.data.data.PATIENT_LIST[i]["2_STATE"]
        jsonObj.TEMPERATURE = response.data.data.PATIENT_LIST[i]["3_STATE"]
        jsonObj.BS = response.data.data.PATIENT_LIST[i]["4_STATE"]
        jsonObj.SPO2 = response.data.data.PATIENT_LIST[i]["5_STATE"]
        jsonObj.BW = response.data.data.PATIENT_LIST[i]["6_STATE"]

        jsonObj = JSON.stringify(jsonObj);
        //String 형태로 파싱한 객체를 다시 json으로 변환
        patientlist.push(JSON.parse(jsonObj));
      }
          
      dispatch({
        type: "GET_DATA",
        data: patientlist,
        totalPages: totalPage,
        // params
      })
    })
    .catch(err => console.log(err))
  }
}

export const getNameData = (userid, pageamount, pagenum, fname) => {
  return async dispatch => {
    await axios
      .get("http://203.251.135.81:9300/v1/doctor/patient/patients", {
        params: {
          user_id: userid,
          page_amount: pageamount,
          page_num: pagenum,
          f_name: fname
        }
  })
    .then(response => {
      let totalPage = Math.ceil(response.data.data.COUNT / 5)
      console.log(totalPage, response)

      let length = response.data.data.PATIENT_LIST.length
      console.log("length :" + length)
      let patientlist 	= new Array();
      for (let i=0; i<length; i++) {
        let jsonObj		= new Object();         
        jsonObj.PATIENT_ID		= response.data.data.PATIENT_LIST[i].PATIENT_ID
        jsonObj.F_NAME = response.data.data.PATIENT_LIST[i].F_NAME
        jsonObj.GENDER	= response.data.data.PATIENT_LIST[i].GENDER
        jsonObj.AGE = response.data.data.PATIENT_LIST[i].AGE
        jsonObj.BIRTH_DT = response.data.data.PATIENT_LIST[i].BIRTH_DT
        jsonObj.NOTE_DX = response.data.data.PATIENT_LIST[i].NOTE_DX
        jsonObj.FIRST_YN = response.data.data.PATIENT_LIST[i].FIRST_YN
        jsonObj.BP = response.data.data.PATIENT_LIST[i]["1_STATE"]
        jsonObj.PULSE = response.data.data.PATIENT_LIST[i]["2_STATE"]
        jsonObj.TEMPERATURE = response.data.data.PATIENT_LIST[i]["3_STATE"]
        jsonObj.BS = response.data.data.PATIENT_LIST[i]["4_STATE"]
        jsonObj.SPO2 = response.data.data.PATIENT_LIST[i]["5_STATE"]
        jsonObj.BW = response.data.data.PATIENT_LIST[i]["6_STATE"]

        jsonObj = JSON.stringify(jsonObj);
        //String 형태로 파싱한 객체를 다시 json으로 변환
        patientlist.push(JSON.parse(jsonObj));
      }
          
      dispatch({
        type: "GET_DATA",
        data: patientlist,
        totalPages: totalPage,
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
