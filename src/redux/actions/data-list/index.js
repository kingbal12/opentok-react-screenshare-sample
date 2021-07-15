import axios from "axios"
import { history } from "../../../history"
import moment from "moment"
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
  let npagemount = Number(pageamount);
  let npagenum = Number(pagenum);
  return async dispatch => {
    await axios
      .get("http://203.251.135.81:9300/v1/doctor/patient/patients", {
        params: {
          user_id: userid,
          page_amount: npagemount,
          page_num: npagenum
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
      let length = response.data.data.PATIENT_LIST.length
      let totalPage = Math.ceil(length / 5)
      console.log(totalPage, response)

      
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
        type: "GET_NAME_DATA",
        data: patientlist,
        totalPages: totalPage,
        // params
      })
    })
    .catch(err => console.log(err))
  }
}



export const getPatientInfo = (userid,patientid) => {
  return async dispatch => {
    await axios
      .get("http://203.251.135.81:9300/v1/doctor/patient/patient-info", {
        params: {
          user_id: userid,
          patient_id: patientid
        }
  })
    .then(response => {
      console.log("환자정보: ",response)
      if(response.data.status==="200") {
        history.push("/patientinfo")
        console.log("환자데이터: ", response.data.data)
        let appoint = response.data.data.APPOINT_INFO
        let consultlist = response.data.data.CONSULT_LIST
        let personalinfo = response.data.data.PERSONAL_INFO;
        personalinfo.BP = response.data.data.PERSONAL_INFO["1_STATE"]
        personalinfo.PULSE = response.data.data.PERSONAL_INFO["2_STATE"]
        personalinfo.TEMPERATURE = response.data.data.PERSONAL_INFO["3_STATE"]
        personalinfo.BS = response.data.data.PERSONAL_INFO["4_STATE"]
        personalinfo.SPO2 = response.data.data.PERSONAL_INFO["5_STATE"]
        personalinfo.BW = response.data.data.PERSONAL_INFO["6_STATE"]
        if(appoint !== null){appoint.APPOINT_TIME = moment(appoint.APPOINT_TIME).format("hh:mm A")}
        personalinfo.BIRTH_DT = moment(personalinfo.BIRTH_DT).format("MMMM DD, YYYY")

        dispatch({
          type: "GET_PATIENT_INFO",
          list: consultlist,
          info: personalinfo,
          appointment: appoint
        })
      } else {
        alert("환자 정보를 불러오지 못하였습니다.")
      }
    })
    .catch(err => console.log(err))
  }
}




export const getVitalData = (patientid) => {
  return async dispatch => {
    await axios
      .get("http://203.251.135.81:9300/v1/doctor/patient/patient-vital", {
        params: {
          patient_id: patientid,
          start_date: moment().add(-6,'days').format("YYYYMMDD"),
          end_date: moment().format("YYYYMMDD")
        }
  })
    .then(response => {
      
      if(response.data.status==="200") {

        let pulselength = response.data.data.PRESSURE_LIST.length
        let bp = response.data.data.PRESSURE_LIST
        let pulse = new Array()
        for (let i=0; i<pulselength; i++) {
          let jsonObj		= new Object();         
          jsonObj.CREATE_TIME	= response.data.data.PRESSURE_LIST[i].CREATE_TIME
          jsonObj.PULSE_VAL	= response.data.data.PRESSURE_LIST[i].PULSE_VAL

          jsonObj = JSON.stringify(jsonObj);
          //String 형태로 파싱한 객체를 다시 json으로 변환
          pulse.push(JSON.parse(jsonObj));
        }

        let temp = response.data.data.TEMP_LIST
        let bs = response.data.data.GLUCOSE_LIST
        let we = response.data.data.WEIGHT_LIST
        let spo2 = response.data.data.SPO2_LIST

        dispatch({
          type: "GET_VITAL_DATA",
          BP: bp,
          PULSE: pulse,
          TEMP: temp,
          BS: bs,
          WE: we,
          SPO2: spo2
        })
      }
    })
    .catch(err => console.log(err))
  }
}

export const resetVitalData = () => {
  return dispatch => {
    dispatch({
      type: "RESET_VITAL_DATA",
      BP: [],
      PULSE: [],
      TEMP: [],
      BS: [],
      WE: [],
      SPO2: [],
    })
  }
}


export const getVitalDataAll = (patientid, startdate) => {
  return async dispatch => {
    await axios
      .get("http://203.251.135.81:9300/v1/doctor/patient/patient-vital", {
        params: {
          patient_id: patientid,
          start_date: startdate,
          end_date: moment().format("YYYYMMDD")
        }
  })
    .then(response => {
      
      if(response.data.status==="200") {
        console.log("단위데이터",response.data.data)
        let pulselength = response.data.data.PRESSURE_LIST.length
        let bp = response.data.data.PRESSURE_LIST
        let pulse = new Array()
        for (let i=0; i<pulselength; i++) {
          let jsonObj		= new Object();         
          jsonObj.CREATE_TIME	= response.data.data.PRESSURE_LIST[i].CREATE_TIME
          jsonObj.PULSE_VAL	= response.data.data.PRESSURE_LIST[i].PULSE_VAL

          jsonObj = JSON.stringify(jsonObj);
          //String 형태로 파싱한 객체를 다시 json으로 변환
          pulse.push(JSON.parse(jsonObj));
        }

        let temp = response.data.data.TEMP_LIST
        let bs = response.data.data.GLUCOSE_LIST
        let we = response.data.data.WEIGHT_LIST
        let spo2 = response.data.data.SPO2_LIST

        dispatch({
          type: "GET_VITAL_DATA_ALL",
          BP: bp,
          PULSE: pulse,
          TEMP: temp,
          BS: bs,
          WE: we,
          SPO2: spo2
        })
      }
    })
    .catch(err => console.log(err))
  }
}


export const serachVitalData = (patientid, startdate, enddate) => {
  return async dispatch => {
    await axios
      .get("http://203.251.135.81:9300/v1/doctor/patient/patient-vital", {
        params: {
          patient_id: patientid,
          start_date: moment(startdate[0]).format("YYYYMMDD"),
          end_date: moment(enddate[0]).format("YYYYMMDD")
        }
  })

    .then(response => {
      
      if(response.data.status==="200") {
        console.log("단위데이터",response)
        let pulselength = response.data.data.PRESSURE_LIST.length
        let bp = response.data.data.PRESSURE_LIST
        let pulse = new Array()
        for (let i=0; i<pulselength; i++) {
          let jsonObj		= new Object();         
          jsonObj.CREATE_TIME	= response.data.data.PRESSURE_LIST[i].CREATE_TIME
          jsonObj.PULSE_VAL	= response.data.data.PRESSURE_LIST[i].PULSE_VAL

          jsonObj = JSON.stringify(jsonObj);
          //String 형태로 파싱한 객체를 다시 json으로 변환
          pulse.push(JSON.parse(jsonObj));
        }

        let temp = response.data.data.TEMP_LIST
        let bs = response.data.data.GLUCOSE_LIST
        let we = response.data.data.WEIGHT_LIST
        let spo2 = response.data.data.SPO2_LIST

        dispatch({
          type: "SEARCH_VITAL_DATA",
          BP: bp,
          PULSE: pulse,
          TEMP: temp,
          BS: bs,
          WE: we,
          SPO2: spo2
        })
      }
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

export const getPastConulstList = (patientid) => {
  return async dispatch => {
    await axios
      .get("http://203.251.135.81:9300/v1/doctor/patient/consults", {
        params: {
          patient_id: patientid,
          page_amount: 5,
          page_num: 1
        }
  })
    .then(response => {

        let totalPage = Math.ceil(response.data.data.COUNT / 5)
        console.log("TOTAL : ",totalPage)

      
      
      if(response.data.status==="200") {
        console.log("과거진료리스트: ",response)
        

        dispatch({
          type: "GET_PAST_CONSULT_LIST",
          data: response.data.data.COUSULT_LIST,
          totalpage: totalPage
        })

        history.push("/past-consult-list" )
      }
    })
    .catch(err => console.log(err))
  }
}


export const getVitalSettingData = (userid, patientid) => {
  return async dispatch => {
    await axios
      .get("http://203.251.135.81:9300/v1/doctor/vital/base-patient", {
        params: {
          user_id: userid,
          patient_id: patientid
        }
  })
    .then(response => {  
      if(response.data.status==="200") {
        console.log("생체데이터: ",response)
        
        dispatch({
          type: "GET_VITALDATA_SETTING",
          data: response.data.data,
        })

        history.push("/vitaldatasetting" )
      } else {
        alert("생체정보를 불러오지 못하였습니다.")
      }
    })
    
    .catch(err => console.log(err))
  }
}

export const putWeight = (userid, bmival1, bmival2, bmival3) => {
  return dispatch => {
    axios
      .put("http://203.251.135.81:9300/v1/doctor/vital/base-weight", {
        patient_id : userid, 
        bmi_val1 : bmival1,
        bmi_val2 : bmival2,
        bmi_val3 : bmival3
      })
      .then(response => {
        if(response.data.status === "200") {
          alert("체중데이터 세팅이 저장되었습니다.")
        } else {
          alert(response.data.message);
        }

      })
  }
}

