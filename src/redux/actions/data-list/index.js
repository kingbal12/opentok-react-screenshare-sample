import axios from "axios";
import { history } from "../../../history";
import moment from "moment";
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

const utcFormatDate = (scheduleda) => {
  let utcscheduleda = moment
    .utc(scheduleda.toISOString())
    .format("YYYY-MM-DD HH:mm");
  console.log("utc:", utcscheduleda);
  return utcscheduleda;
};

const utcFormatDateApp = (scheduleda) => {
  let utcscheduleda = moment.utc(scheduleda.toISOString()).format("YYYY-MM-DD");
  console.log("utc:", utcscheduleda);
  return utcscheduleda;
};

const localFormDate = (scheduleda) => {
  console.log("utc", scheduleda);
  let localscheduledate = moment.utc(scheduleda).toDate();
  localscheduledate = moment(localscheduledate).format();
  console.log("locale:", localscheduledate);
  return localscheduledate;
};

const localVitalFormDate = (scheduleda) => {
  console.log("utc", scheduleda);
  let localscheduledate = moment.utc(scheduleda).toDate();
  localscheduledate = moment(localscheduledate).format("YYYY-MM-DD HH:mm");
  console.log("locale:", localscheduledate);
  return localscheduledate;
};

export const gettokbox = (userid, appointnum) => {
  return (dispatch) => {
    axios
      .get("https://teledoc.hicare.net:446/v1/doctor/treatment/video-call", {
        params: {
          user_id: userid,
          appoint_num: appointnum,
        },
      })

      .then((response) => {
        console.log(response);

        if (
          response.data.status === "200" &&
          response.data.data.TOK_KEY !== ""
        ) {
          dispatch({
            type: "GET_TOKBOX",
            data: response.data.data,
          });
          history.push("/pages/consultingroom");
        } else {
          alert("진료실은 진료시간 5분전부터 입장 가능합니다.");
        }
      })
      .catch((err) => console.log(err));
  };
};
export const getPaymentTotalData = (userid, startdate, enddate) => {
  return async (dispatch) => {
    await axios
      .get("https://teledoc.hicare.net:446/v1/doctor/treatment/payments", {
        params: {
          user_id: userid,
          start_date: startdate,
          end_date: enddate,
          page_amount: 500000,
          page_num: 1,
        },
      })
      .then((response) => {
        let len = response.data.data.PAY_LIST.length;
        let totalPay = new Array();
        let sumtotal = 0;
        for (let i = 0; i < len; i++) {
          let jsonObj = new Object();
          jsonObj.PAY_TOTAL = response.data.data.PAY_LIST[i].PAY_TOTAL;
          jsonObj = JSON.stringify(jsonObj);
          totalPay.push(JSON.parse(jsonObj));
          if (len > 0) {
            sumtotal = totalPay[i].PAY_TOTAL + sumtotal;
          }
        }

        dispatch({
          type: "GET_PAYMENT_TOTAL_DATA",
          totalPay: sumtotal,
          totalpaydata: response.data.data.PAY_LIST,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getPaymentData = (
  userid,
  startdate,
  enddate,
  pageamount,
  pagenum
) => {
  return async (dispatch) => {
    await axios
      .get("https://teledoc.hicare.net:446/v1/doctor/treatment/payments", {
        params: {
          user_id: userid,
          start_date: startdate,
          end_date: enddate,
          page_amount: pageamount,
          page_num: pagenum,
        },
      })
      .then((response) => {
        let totalPage = Math.ceil(response.data.data.COUNT / 5);

        dispatch({
          type: "GET_PAYMENT_DATA",
          data: response.data.data.PAY_LIST,
          totalPages: totalPage,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getAppData = (userid, pageamount, pagenum) => {
  let npagemount = Number(pageamount);
  let npagenum = Number(pagenum);
  return async (dispatch) => {
    await axios
      .get("https://teledoc.hicare.net:446/v1/doctor/appointment/dashboard", {
        params: {
          user_id: userid,
          start_date: utcFormatDateApp(new Date()),
          page_amount: npagemount,
          page_num: npagenum,
        },
      })
      .then((response) => {
        let totalPage = Math.ceil(response.data.data.COUNT_DAY / 5);
        console.log(totalPage, "예약페이지:", response);
        let length = response.data.data.APPOINT_LIST.length;
        let appointlist = new Array();
        for (let i = 0; i < length; i++) {
          let jsonObj = new Object();
          jsonObj.APPOINT_KIND =
            response.data.data.APPOINT_LIST[i].APPOINT_KIND;
          jsonObj.APPOINT_NUM = response.data.data.APPOINT_LIST[i].APPOINT_NUM;
          jsonObj.APPOINT_TIME = localFormDate(
            response.data.data.APPOINT_LIST[i].APPOINT_TIME
          );
          jsonObj.BIRTH_DT = response.data.data.APPOINT_LIST[i].BIRTH_DT;
          jsonObj.FIRST_YN = response.data.data.APPOINT_LIST[i].FIRST_YN;
          jsonObj.F_NAME = response.data.data.APPOINT_LIST[i].F_NAME;
          jsonObj.NOTE_DX = response.data.data.APPOINT_LIST[i].NOTE_DX;
          jsonObj.PATIENT_ID = response.data.data.APPOINT_LIST[i].PATIENT_ID;
          jsonObj.SYMPTOM = response.data.data.APPOINT_LIST[i].SYMPTOM;
          jsonObj.VITAL_STATE = response.data.data.APPOINT_LIST[i].VITAL_STATE;
          jsonObj.GENDER = response.data.data.APPOINT_LIST[i].GENDER;
          jsonObj.AGE = response.data.data.APPOINT_LIST[i].AGE;
          jsonObj = JSON.stringify(jsonObj);
          //String 형태로 파싱한 객체를 다시 json으로 변환
          appointlist.push(JSON.parse(jsonObj));
        }

        dispatch({
          type: "GET_APPOINT_DATA",
          data: appointlist,
          totalPages: totalPage,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getData = (userid, pageamount, pagenum) => {
  let npagemount = Number(pageamount);
  let npagenum = Number(pagenum);
  return async (dispatch) => {
    await axios
      .get("https://teledoc.hicare.net:446/v1/doctor/patient/patients", {
        params: {
          user_id: userid,
          page_amount: npagemount,
          page_num: npagenum,
        },
      })
      .then((response) => {
        let totalPage = Math.ceil(response.data.data.COUNT / npagemount);
        console.log(totalPage, response);

        let length = response.data.data.PATIENT_LIST.length;
        console.log("length :" + length);
        let patientlist = new Array();
        for (let i = 0; i < length; i++) {
          let jsonObj = new Object();
          jsonObj.PATIENT_ID = response.data.data.PATIENT_LIST[i].PATIENT_ID;
          jsonObj.F_NAME = response.data.data.PATIENT_LIST[i].F_NAME;
          jsonObj.GENDER = response.data.data.PATIENT_LIST[i].GENDER;
          jsonObj.AGE = response.data.data.PATIENT_LIST[i].AGE;
          jsonObj.BIRTH_DT = response.data.data.PATIENT_LIST[i].BIRTH_DT;
          jsonObj.NOTE_DX = response.data.data.PATIENT_LIST[i].NOTE_DX;
          jsonObj.FIRST_YN = response.data.data.PATIENT_LIST[i].FIRST_YN;
          jsonObj.BP = response.data.data.PATIENT_LIST[i]["1_STATE"];
          jsonObj.PULSE = response.data.data.PATIENT_LIST[i]["2_STATE"];
          jsonObj.TEMPERATURE = response.data.data.PATIENT_LIST[i]["3_STATE"];
          jsonObj.BS = response.data.data.PATIENT_LIST[i]["4_STATE"];
          jsonObj.SPO2 = response.data.data.PATIENT_LIST[i]["5_STATE"];
          jsonObj.BW = response.data.data.PATIENT_LIST[i]["6_STATE"];

          jsonObj = JSON.stringify(jsonObj);
          //String 형태로 파싱한 객체를 다시 json으로 변환
          patientlist.push(JSON.parse(jsonObj));
        }

        dispatch({
          type: "GET_DATA",
          data: patientlist,
          totalPages: totalPage,
          // params
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getNameData = (userid, pageamount, pagenum, fname) => {
  return async (dispatch) => {
    await axios
      .get("https://teledoc.hicare.net:446/v1/doctor/patient/patients", {
        params: {
          user_id: userid,
          page_amount: pageamount,
          page_num: pagenum,
          f_name: fname,
        },
      })
      .then((response) => {
        let length = response.data.data.PATIENT_LIST.length;
        let totalPage = Math.ceil(length / 5);
        console.log(totalPage, response);

        console.log("length :" + length);
        let patientlist = new Array();
        for (let i = 0; i < length; i++) {
          let jsonObj = new Object();
          jsonObj.PATIENT_ID = response.data.data.PATIENT_LIST[i].PATIENT_ID;
          jsonObj.F_NAME = response.data.data.PATIENT_LIST[i].F_NAME;
          jsonObj.GENDER = response.data.data.PATIENT_LIST[i].GENDER;
          jsonObj.AGE = response.data.data.PATIENT_LIST[i].AGE;
          jsonObj.BIRTH_DT = response.data.data.PATIENT_LIST[i].BIRTH_DT;
          jsonObj.NOTE_DX = response.data.data.PATIENT_LIST[i].NOTE_DX;
          jsonObj.FIRST_YN = response.data.data.PATIENT_LIST[i].FIRST_YN;
          jsonObj.BP = response.data.data.PATIENT_LIST[i]["1_STATE"];
          jsonObj.PULSE = response.data.data.PATIENT_LIST[i]["2_STATE"];
          jsonObj.TEMPERATURE = response.data.data.PATIENT_LIST[i]["3_STATE"];
          jsonObj.BS = response.data.data.PATIENT_LIST[i]["4_STATE"];
          jsonObj.SPO2 = response.data.data.PATIENT_LIST[i]["5_STATE"];
          jsonObj.BW = response.data.data.PATIENT_LIST[i]["6_STATE"];

          jsonObj = JSON.stringify(jsonObj);
          //String 형태로 파싱한 객체를 다시 json으로 변환
          patientlist.push(JSON.parse(jsonObj));
        }

        dispatch({
          type: "GET_NAME_DATA",
          data: patientlist,
          totalPages: totalPage,
          searchName: fname,
          // params
        });
      })
      .catch((err) => console.log(err));
  };
};

export const resetSearchName = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_NAME_DATA",
      searchName: "안녕하세요",
    });
  };
};

export const resetPastConsult = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_PAST_DATA",
      list: [],
    });
  };
};

export const getPatientInfo = (userid, patientid, appointnum) => {
  return async (dispatch) => {
    await axios
      .get("https://teledoc.hicare.net:446/v1/doctor/patient/patient-info", {
        params: {
          user_id: userid,
          patient_id: patientid,
          appoint_num: appointnum,
        },
      })
      .then((response) => {
        console.log("환자정보: ", response);
        if (response.data.status === "200") {
          history.push("/patientinfo");
          console.log("환자데이터: ", response.data.data);
          console.log(response.data.data.APPOINT_INFO);
          let rtime = "";
          let appoint = response.data.data.APPOINT_INFO;
          let consultlist = response.data.data.CONSULT_LIST;
          let personalinfo = response.data.data.PERSONAL_INFO;
          personalinfo.BP = response.data.data.PERSONAL_INFO["1_STATE"];
          personalinfo.PULSE = response.data.data.PERSONAL_INFO["2_STATE"];
          personalinfo.TEMPERATURE =
            response.data.data.PERSONAL_INFO["3_STATE"];
          personalinfo.BS = response.data.data.PERSONAL_INFO["4_STATE"];
          personalinfo.SPO2 = response.data.data.PERSONAL_INFO["5_STATE"];
          personalinfo.BW = response.data.data.PERSONAL_INFO["6_STATE"];
          if (appoint !== null) {
            rtime = localFormDate(response.data.data.APPOINT_INFO.APPOINT_TIME);
          }
          if (appoint !== null) {
            appoint.APPOINT_TIME = moment(
              localFormDate(appoint.APPOINT_TIME)
            ).format("hh:mm A");
          }

          personalinfo.BIRTH_DT = moment(personalinfo.BIRTH_DT).format(
            "MMMM DD, YYYY"
          );

          dispatch({
            type: "GET_PATIENT_INFO",
            list: consultlist,
            info: personalinfo,
            appointment: appoint,
            rtime: rtime,
          });
        } else {
          alert("환자 정보를 불러오지 못하였습니다.");
        }
      })
      .catch((err) => console.log(err));
  };
};

export const getVitalData = (patientid) => {
  return async (dispatch) => {
    await axios
      .get("https://teledoc.hicare.net:446/v1/doctor/patient/patient-vital", {
        params: {
          patient_id: patientid,
          start_date: moment().utc().add(-6, "days").format("YYYYMMDD"),
          end_date: moment().utc().format("YYYYMMDD"),
        },
      })
      .then((response) => {
        if (response.data.status === "200") {
          // let pulselength = response.data.data.PRESSURE_LIST.length
          let bp = new Array();
          let pulse = new Array();
          let temp = new Array();
          let bs = new Array();
          let we = new Array();
          let spo2 = new Array();
          let gforLimit = 6;
          let forLimit = 6;
          let sforLimit = 6;
          let tforLimit = 6;
          let wforLimit = 6;
          if (response.data.data.GLUCOSE_LIST.length < gforLimit)
            gforLimit = response.data.data.GLUCOSE_LIST.length;
          if (response.data.data.PRESSURE_LIST.length < forLimit)
            forLimit = response.data.data.PRESSURE_LIST.length;
          if (response.data.data.SPO2_LIST.length < sforLimit)
            sforLimit = response.data.data.SPO2_LIST.length;
          if (response.data.data.TEMP_LIST.length < tforLimit)
            tforLimit = response.data.data.TEMP_LIST.length;
          if (response.data.data.WEIGHT_LIST.length < wforLimit)
            wforLimit = response.data.data.WEIGHT_LIST.length;

          for (let i = 0; i < gforLimit; i++) {
            let bsobj = new Object();

            bsobj = response.data.data.GLUCOSE_LIST[i];
            bsobj.CREATE_TIME = localVitalFormDate(
              response.data.data.GLUCOSE_LIST[i].CREATE_TIME
            );

            bsobj = JSON.stringify(bsobj);
            //String 형태로 파싱한 객체를 다시 json으로 변환
            if (bsobj !== undefined) {
              bs.push(JSON.parse(bsobj));
            }
          }

          for (let i = 0; i < forLimit; i++) {
            let bpobj = new Object();
            let jsonObj = new Object();

            bpobj = response.data.data.PRESSURE_LIST[i];
            bpobj.CREATE_TIME = localVitalFormDate(
              response.data.data.PRESSURE_LIST[i].CREATE_TIME
            );
            jsonObj.CREATE_TIME =
              response.data.data.PRESSURE_LIST[i].CREATE_TIME;

            jsonObj.PULSE_VAL = response.data.data.PRESSURE_LIST[i].PULSE_VAL;

            bpobj = JSON.stringify(bpobj);
            jsonObj = JSON.stringify(jsonObj);

            //String 형태로 파싱한 객체를 다시 json으로 변환
            if (bpobj !== undefined) {
              bp.push(JSON.parse(bpobj));
            }
            if (jsonObj !== undefined) {
              pulse.push(JSON.parse(jsonObj));
            }
          }

          for (let i = 0; i < sforLimit; i++) {
            let spo2obj = new Object();

            spo2obj = response.data.data.SPO2_LIST[i];
            spo2obj.CREATE_TIME = localVitalFormDate(
              response.data.data.SPO2_LIST[i].CREATE_TIME
            );

            spo2obj = JSON.stringify(spo2obj);

            //String 형태로 파싱한 객체를 다시 json으로 변환
            if (spo2obj !== undefined) {
              spo2.push(JSON.parse(spo2obj));
            }
          }

          for (let i = 0; i < tforLimit; i++) {
            let tempobj = new Object();

            tempobj = response.data.data.TEMP_LIST[i];
            tempobj.CREATE_TIME = localVitalFormDate(
              response.data.data.TEMP_LIST[i].CREATE_TIME
            );

            tempobj = JSON.stringify(tempobj);
            //String 형태로 파싱한 객체를 다시 json으로 변환
            if (tempobj !== undefined) {
              temp.push(JSON.parse(tempobj));
            }
          }

          for (let i = 0; i < wforLimit; i++) {
            let weobj = new Object();

            weobj = response.data.data.WEIGHT_LIST[i];
            weobj.CREATE_TIME = localVitalFormDate(
              response.data.data.WEIGHT_LIST[i].CREATE_TIME
            );

            weobj = JSON.stringify(weobj);

            if (weobj !== undefined) {
              we.push(JSON.parse(weobj));
            }
          }

          dispatch({
            type: "GET_VITAL_DATA",
            BP: bp,
            PULSE: pulse,
            TEMP: temp,
            BS: bs,
            WE: we,
            SPO2: spo2,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const resetVitalData = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_VITAL_DATA",
      BP: [],
      PULSE: [],
      TEMP: [],
      BS: [],
      WE: [],
      SPO2: [],
    });
  };
};

export const resetappodata = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_APPO_DATA",
      appointment: "",
      rtime: "",
    });
  };
};

export const getVitalDataAll = (patientid, startdate) => {
  return async (dispatch) => {
    await axios
      .get("https://teledoc.hicare.net:446/v1/doctor/patient/patient-vital", {
        params: {
          patient_id: patientid,
          start_date: startdate,
          end_date: moment().utc().format("YYYYMMDD"),
        },
      })
      .then((response) => {
        if (response.data.status === "200") {
          console.log("단위데이터", response.data.data);
          let bp = new Array();
          let pulse = new Array();
          let temp = new Array();
          let bs = new Array();
          let we = new Array();
          let spo2 = new Array();
          let gforLimit = 100;
          let forLimit = 100;
          let sforLimit = 100;
          let tforLimit = 100;
          let wforLimit = 100;
          if (response.data.data.GLUCOSE_LIST.length < gforLimit)
            gforLimit = response.data.data.GLUCOSE_LIST.length;
          if (response.data.data.PRESSURE_LIST.length < forLimit)
            forLimit = response.data.data.PRESSURE_LIST.length;
          if (response.data.data.SPO2_LIST.length < sforLimit)
            sforLimit = response.data.data.SPO2_LIST.length;
          if (response.data.data.TEMP_LIST.length < tforLimit)
            tforLimit = response.data.data.TEMP_LIST.length;
          if (response.data.data.WEIGHT_LIST.length < wforLimit)
            wforLimit = response.data.data.WEIGHT_LIST.length;

          for (let i = 0; i < gforLimit; i++) {
            let bsobj = new Object();

            bsobj = response.data.data.GLUCOSE_LIST[i];
            bsobj.CREATE_TIME = localVitalFormDate(
              response.data.data.GLUCOSE_LIST[i].CREATE_TIME
            );

            bsobj = JSON.stringify(bsobj);
            //String 형태로 파싱한 객체를 다시 json으로 변환
            if (bsobj !== undefined) {
              bs.push(JSON.parse(bsobj));
            }
          }

          for (let i = 0; i < forLimit; i++) {
            let bpobj = new Object();
            let jsonObj = new Object();

            bpobj = response.data.data.PRESSURE_LIST[i];
            bpobj.CREATE_TIME = localVitalFormDate(
              response.data.data.PRESSURE_LIST[i].CREATE_TIME
            );
            jsonObj.CREATE_TIME =
              response.data.data.PRESSURE_LIST[i].CREATE_TIME;

            jsonObj.PULSE_VAL = response.data.data.PRESSURE_LIST[i].PULSE_VAL;

            bpobj = JSON.stringify(bpobj);
            jsonObj = JSON.stringify(jsonObj);

            //String 형태로 파싱한 객체를 다시 json으로 변환
            if (bpobj !== undefined) {
              bp.push(JSON.parse(bpobj));
            }
            if (jsonObj !== undefined) {
              pulse.push(JSON.parse(jsonObj));
            }
          }

          for (let i = 0; i < sforLimit; i++) {
            let spo2obj = new Object();

            spo2obj = response.data.data.SPO2_LIST[i];
            spo2obj.CREATE_TIME = localVitalFormDate(
              response.data.data.SPO2_LIST[i].CREATE_TIME
            );

            spo2obj = JSON.stringify(spo2obj);

            //String 형태로 파싱한 객체를 다시 json으로 변환
            if (spo2obj !== undefined) {
              spo2.push(JSON.parse(spo2obj));
            }
          }

          for (let i = 0; i < tforLimit; i++) {
            let tempobj = new Object();

            tempobj = response.data.data.TEMP_LIST[i];
            tempobj.CREATE_TIME = localVitalFormDate(
              response.data.data.TEMP_LIST[i].CREATE_TIME
            );

            tempobj = JSON.stringify(tempobj);
            //String 형태로 파싱한 객체를 다시 json으로 변환
            if (tempobj !== undefined) {
              temp.push(JSON.parse(tempobj));
            }
          }

          for (let i = 0; i < wforLimit; i++) {
            let weobj = new Object();

            weobj = response.data.data.WEIGHT_LIST[i];
            weobj.CREATE_TIME = localVitalFormDate(
              response.data.data.WEIGHT_LIST[i].CREATE_TIME
            );

            weobj = JSON.stringify(weobj);

            if (weobj !== undefined) {
              we.push(JSON.parse(weobj));
            }
          }

          dispatch({
            type: "GET_VITAL_DATA_ALL",
            BP: bp,
            PULSE: pulse,
            TEMP: temp,
            BS: bs,
            WE: we,
            SPO2: spo2,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const serachVitalData = (patientid, startdate, enddate) => {
  return async (dispatch) => {
    await axios
      .get("https://teledoc.hicare.net:446/v1/doctor/patient/patient-vital", {
        params: {
          patient_id: patientid,
          start_date: moment(startdate[0]).utc().format("YYYYMMDD"),
          end_date: moment(enddate[0]).utc().format("YYYYMMDD"),
        },
      })

      .then((response) => {
        if (response.data.status === "200") {
          console.log("단위데이터", response);
          let bp = new Array();
          let pulse = new Array();
          let temp = new Array();
          let bs = new Array();
          let we = new Array();
          let spo2 = new Array();
          let gforLimit = 100;
          let forLimit = 100;
          let sforLimit = 100;
          let tforLimit = 100;
          let wforLimit = 100;
          if (response.data.data.GLUCOSE_LIST.length < gforLimit)
            gforLimit = response.data.data.GLUCOSE_LIST.length;
          if (response.data.data.PRESSURE_LIST.length < forLimit)
            forLimit = response.data.data.PRESSURE_LIST.length;
          if (response.data.data.SPO2_LIST.length < sforLimit)
            sforLimit = response.data.data.SPO2_LIST.length;
          if (response.data.data.TEMP_LIST.length < tforLimit)
            tforLimit = response.data.data.TEMP_LIST.length;
          if (response.data.data.WEIGHT_LIST.length < wforLimit)
            wforLimit = response.data.data.WEIGHT_LIST.length;

          for (let i = 0; i < gforLimit; i++) {
            let bsobj = new Object();

            bsobj = response.data.data.GLUCOSE_LIST[i];
            bsobj.CREATE_TIME = localVitalFormDate(
              response.data.data.GLUCOSE_LIST[i].CREATE_TIME
            );

            bsobj = JSON.stringify(bsobj);
            //String 형태로 파싱한 객체를 다시 json으로 변환
            if (bsobj !== undefined) {
              bs.push(JSON.parse(bsobj));
            }
          }

          for (let i = 0; i < forLimit; i++) {
            let bpobj = new Object();
            let jsonObj = new Object();

            bpobj = response.data.data.PRESSURE_LIST[i];
            bpobj.CREATE_TIME = localVitalFormDate(
              response.data.data.PRESSURE_LIST[i].CREATE_TIME
            );
            jsonObj.CREATE_TIME =
              response.data.data.PRESSURE_LIST[i].CREATE_TIME;

            jsonObj.PULSE_VAL = response.data.data.PRESSURE_LIST[i].PULSE_VAL;

            bpobj = JSON.stringify(bpobj);
            jsonObj = JSON.stringify(jsonObj);

            //String 형태로 파싱한 객체를 다시 json으로 변환
            if (bpobj !== undefined) {
              bp.push(JSON.parse(bpobj));
            }
            if (jsonObj !== undefined) {
              pulse.push(JSON.parse(jsonObj));
            }
          }

          for (let i = 0; i < sforLimit; i++) {
            let spo2obj = new Object();

            spo2obj = response.data.data.SPO2_LIST[i];
            spo2obj.CREATE_TIME = localVitalFormDate(
              response.data.data.SPO2_LIST[i].CREATE_TIME
            );

            spo2obj = JSON.stringify(spo2obj);

            //String 형태로 파싱한 객체를 다시 json으로 변환
            if (spo2obj !== undefined) {
              spo2.push(JSON.parse(spo2obj));
            }
          }

          for (let i = 0; i < tforLimit; i++) {
            let tempobj = new Object();

            tempobj = response.data.data.TEMP_LIST[i];
            tempobj.CREATE_TIME = localVitalFormDate(
              response.data.data.TEMP_LIST[i].CREATE_TIME
            );

            tempobj = JSON.stringify(tempobj);
            //String 형태로 파싱한 객체를 다시 json으로 변환
            if (tempobj !== undefined) {
              temp.push(JSON.parse(tempobj));
            }
          }

          for (let i = 0; i < wforLimit; i++) {
            let weobj = new Object();

            weobj = response.data.data.WEIGHT_LIST[i];
            weobj.CREATE_TIME = localVitalFormDate(
              response.data.data.WEIGHT_LIST[i].CREATE_TIME
            );

            weobj = JSON.stringify(weobj);

            if (weobj !== undefined) {
              we.push(JSON.parse(weobj));
            }
          }

          dispatch({
            type: "SEARCH_VITAL_DATA",
            BP: bp,
            PULSE: pulse,
            TEMP: temp,
            BS: bs,
            WE: we,
            SPO2: spo2,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const getInitialData = () => {
  return async (dispatch) => {
    await axios.get("/api/datalist/initial-data").then((response) => {
      dispatch({ type: "GET_ALL_DATA", data: response.data });
    });
  };
};

export const filterData = (value) => {
  return (dispatch) => dispatch({ type: "FILTER_DATA", value });
};

export const deleteData = (obj) => {
  return (dispatch) => {
    axios
      .post("/api/datalist/delete-data", {
        obj,
      })
      .then((response) => {
        dispatch({ type: "DELETE_DATA", obj });
      });
  };
};

export const updateData = (obj) => {
  return (dispatch, getState) => {
    axios
      .post("/api/datalist/update-data", {
        obj,
      })
      .then((response) => {
        dispatch({ type: "UPDATE_DATA", obj });
      });
  };
};

export const addData = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dataList.params;
    axios
      .post("/api/datalist/add-data", {
        obj,
      })
      .then((response) => {
        dispatch({ type: "ADD_DATA", obj });
        dispatch(getData(params));
      });
  };
};

export const goPCL = (patientid) => {
  return (dispatch) => {
    dispatch({
      type: "SAVE_PATIENTID",
      data: patientid,
    });
    history.push("/past-consult-list");
  };
};

export const mPCL = (patientid) => {
  return (dispatch) => {
    dispatch({
      type: "SAVE_PATIENTID",
      data: patientid,
    });
  };
};

export const getPastConulstList = (patientid, pageamount, pagenum) => {
  return async (dispatch) => {
    await axios
      .get("https://teledoc.hicare.net:446/v1/doctor/patient/consults", {
        params: {
          patient_id: patientid,
          page_amount: pageamount,
          page_num: pagenum,
        },
      })
      .then((response) => {
        let totalPage = Math.ceil(response.data.data.COUNT / 5);
        console.log("TOTAL : ", totalPage);

        if (response.data.status === "200") {
          console.log("과거진료리스트: ", response);

          dispatch({
            type: "GET_PAST_CONSULT_LIST",
            data: response.data.data.COUSULT_LIST,
            totalpage: totalPage,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const getFaq = (pageamount, pagenum) => {
  return async (dispatch) => {
    await axios
      .get("https://teledoc.hicare.net:446/v1/doctor/setting/faqs", {
        params: {
          search_text: "",
          page_amount: pageamount,
          page_num: pagenum,
        },
      })
      .then((response) => {
        console.log("faq:", response);
        let totalPage = Math.ceil(response.data.data.COUNT / 5);
        if (response.data.status === "200") {
          dispatch({
            type: "GET_FAQ",
            data: response.data.data.FAQ_LIST,
            totalPages: totalPage,
          });
        } else {
          alert("FAQ를 불러오지 못하였습니다.");
        }
      })
      .catch((err) => console.log(err));
  };
};

export const getNameFaqData = (pageamount, pagenum, fname) => {
  return async (dispatch) => {
    await axios
      .get("https://teledoc.hicare.net:446/v1/doctor/setting/faqs", {
        params: {
          search_text: fname,
          page_amount: pageamount,
          page_num: pagenum,
        },
      })
      .then((response) => {
        console.log("faq:", response);
        let totalPage = Math.ceil(response.data.data.COUNT / 5);
        if (response.data.status === "200") {
          dispatch({
            type: "GET_FAQ_NAME",
            data: response.data.data.FAQ_LIST,
            totalPages: totalPage,
          });
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => console.log(err));
  };
};

export const getNotice = (pageamount, pagenum) => {
  return async (dispatch) => {
    await axios
      .get("https://teledoc.hicare.net:446/v1/doctor/setting/notices", {
        params: {
          page_amount: pageamount,
          page_num: pagenum,
        },
      })
      .then((response) => {
        console.log("notice:", response);
        let totalPage = Math.ceil(response.data.data.COUNT / 5);
        if (response.data.status === "200") {
          dispatch({
            type: "GET_NOTICE",
            data: response.data.data.NOTICE_LIST,
            totalpage: totalPage,
          });
        } else {
          alert("FAQ를 불러오지 못하였습니다.");
        }
      })
      .catch((err) => console.log(err));
  };
};

export const getVitalSettingData = (userid, patientid) => {
  return async (dispatch) => {
    await axios
      .get("https://teledoc.hicare.net:446/v1/doctor/vital/base-patient", {
        params: {
          user_id: userid,
          patient_id: patientid,
        },
      })
      .then((response) => {
        if (response.data.status === "200" && response.data.data !== null) {
          dispatch({
            type: "GET_VITALDATA_SETTING",
            data: response.data.data,
          });

          history.push("/vitaldatasetting");
        } else {
          alert("생체정보를 불러오지 못하였습니다.");
        }
      })

      .catch((err) => console.log(err));
  };
};

export const postMDNoteData = (userid, apponum, cc, dx, rx, notevital) => {
  return (dispatch) => {
    axios
      .post("https://teledoc.hicare.net:446/v1/doctor/treatment/md-note", {
        user_id: userid,
        appoint_num: apponum,
        note_cc: cc,
        note_dx: dx,
        note_rx: rx,
        note_vital: notevital,
      })
      .then((response) => {
        if (response.data.status === "200") {
          alert("진료노트 저장이 완료되었습니다.");
        } else {
          alert("진료노트 저장에 문제가 발생했습니다.\n다시 시도해 주십시오");
        }
      })
      .catch((err) =>
        alert(
          err +
            "\n네트워크 문제로 진료노트 저장에 문제가 발생했습니다.\n다시 시도해 주십시오 "
        )
      );
  };
};

export const postPrescriptionData = (userid, apponum, filename, file) => {
  let frm = new FormData();
  frm.append("user_id", userid);
  frm.append("file_name", file);
  frm.append("appoint_num", apponum);
  console.log(frm);
  return (dispatch) => {
    axios
      .post(
        "https://teledoc.hicare.net:446/v1/doctor/treatment/prescription",
        frm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      // .post("http://192.168.0.45:9300/v1/doctor/treatment/prescription", data)
      .then((response) => {
        console.log(response);
        if (response.data.status === "200") {
          alert("처방전 업로드가 완료되엇습니다.");
        } else {
          alert("처방전 업로드에 문제가 발생했습니다.\n다시 시도해 주십시오");
        }
      })
      .catch((err) =>
        alert(
          err +
            "\n네트워크 문제로 처방전 업로드에 문제가 발생했습니다.\n다시 시도해 주십시오 "
        )
      );
  };
};

export const postPayData = (userid, apponum, paypatient, paytotal) => {
  return (dispatch) => {
    axios
      .post("https://teledoc.hicare.net:446/v1/doctor/treatment/payment", {
        user_id: userid,
        appoint_num: apponum,
        pay_patient: paypatient,
        pay_total: paytotal,
      })
      .then((response) => {
        if (response.data.status === "200") {
          alert("결제정보가 저장되었습니다.");
        } else {
          alert("결제정보 저장에 문제가 발생했습니다.\n다시 시도해 주십시오");
        }
      })
      .catch((err) =>
        alert(
          err +
            "\n네트워크 문제로 결제정보 저장에 문제가 발생했습니다.\n다시 시도해 주십시오 "
        )
      );
  };
};

export const putStateComplete = (userid, apnum) => {
  return (dispatch) => {
    axios.put(
      "https://teledoc.hicare.net:446/v1/doctor/treatment/state-complete",
      {
        user_id: userid,
        appoint_num: apnum,
      }
    );
  };
};

export const getPharmacy = (patientid) => {
  return async (dispatch) => {
    await axios
      .get("https://teledoc.hicare.net:446/v1/doctor/treatment/pharmacy", {
        params: {
          patient_id: patientid,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        if (
          response.data.status === "200" &&
          response.data.data.P_NAME !== ""
        ) {
          dispatch({
            type: "GET_PHARMACY",
            data: response.data.data,
          });
        } else {
          alert(response.data.message);
        }
      })

      .catch((err) => console.log(err));
  };
};

export const pushCloseSignal = (userid, appointnum, state) => {
  return (dispatch) => {
    axios
      .put("https://teledoc.hicare.net:446/v1/doctor/treatment/involve-state", {
        user_id: userid,
        appoint_num: appointnum,
        state_doc: state,
      })
      .then((response) => {
        console.log("화상진료상태", response);
      })
      .catch((err) => console.log(err));
  };
};
