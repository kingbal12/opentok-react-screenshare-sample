import { history } from "../../../history"
import axios from "axios"



export const setTerm = (national_id, term1, term2, six, eight) => {
  return dispatch => {
      dispatch({
        type: "SET_TERMS",
        payload: {national_id, term1, term2, six, eight}
      })
      history.push("/pages/register2")
    }
    
  }


export const postTerms = (
  user_id, 
  national_id, 
  term_1, 
  term_2, 
  term_3, 
  term_4,
  term_5,
  term_6,
  term_7,
  term_8,
  term_9,
  term_10,
  term_11,
  term_12,
  term_13
  ) => { return dispatch => 
    {axios
      .post("https://health.iot4health.co.kr:9300/terms", {
        user_id : user_id ,
        national_id : national_id ,
        term_11 : term_1,
        term_12 : term_2,
        term_21 : term_3,
        term_22 : term_4,
        term_31 : term_5,
        term_41 : term_6,
        term_42 : term_7,
        term_51 : term_8,
        term_52 : term_9,
        term_61 : term_10,
        term_71 : term_11,
        term_81 : term_12,
        term_91 : term_13
      })
      .then(response => {
        console.log(response);
        if(response.data.status === "200") {
          history.push("/pages/register3");
        } else {
          // alert(response.data.message);
         
        }

      })
      dispatch({
        type: "POST_TERMS",
        payload: {}
      })
  }
}





// 회원가입 pages/register2 
export const register2 = (userid, name, phone, password, btdate, gender, email) => {

  return dispatch => {
    let registeruser = userid
    let registername = name
    axios
      .post("https://health.iot4health.co.kr:9300/signup", {
        user_id: userid,
        user_pwd: password,
        f_name: name, 
        mobile_num: phone,
        birth_dt: btdate,
        gender: gender,
        email: email
      })

      .then(response => {
        console.log(response);
        if(response.data.status === "200") {
          history.push("/pages/register3");
        } else {
          alert(response.data.message);
         
        }

      })
      dispatch({
        type: "REGISTER_USER",
        payload: {registeruser, registername, phone}
      })
  }
}

export const authemail = (userid, email) => {
  return dispatch => {
    axios
      .post("https://health.iot4health.co.kr:9300/signup-email", {
        user_id: userid,
        email: email
      })


      .then(response => {
        console.log(response);
        if(response.data.status === "200") {
          alert(response.data.message);
          
        } else {
          alert(response.data.message);
        }

      })
      
  }
}

// 모달창을 띄우기 위해 Register2.js로 이동
// export const verifyemail = (email,idnumber) => {
//   return dispatch => {
   
//     axios
//       .post("https://health.iot4health.co.kr:9300/signup-verify", {
//         user_id: email,
//         auth_code: idnumber
//       })


//       .then(response => {
//         let verifyemailstatus;

//         console.log(response.data.status);
//         if(response.data.status === "200") {
//           verifyemailstatus = response.data.status

//           // togglemailstatus();

//           dispatch({
//             type: "VERIFY_EMAIL",
//             payload: {verifyemailstatus}
//           })
          
          
//         } else {
//           dispatch({
//             type: "VERIFY_EMAIL",
//             payload: {verifyemailstatus}
//           })
          
//           alert(response.data.message);
          
//         }

//       })
      
//   }
// }


// 회원가입 pages/register3
export const register3 = (userid, hospitalname, businessnumber, zipcode, address1, address2, phonenumber, accountname, bankname, accountnumber) => {
  return dispatch => {
    axios
      .post("https://health.iot4health.co.kr:9300/v1/doctor/account/hospital-info", {
        user_id : userid, 
        hospital_name : hospitalname,
        business_num : businessnumber,
        zip_code : zipcode,
        address_1 : address1,
        address_2 : address2,
        phone_num : phonenumber,
        account_name : accountname,
        bank_name : bankname,
        account_num : accountnumber
      })
      .then(response => {
        console.log(response);
        if(response.data.status === "200") {
          history.push("/pages/register4");
        } else {
          alert(response.data.message);
        }

      })
  }
}

export const postPhonenumber = (phonenumber) => {
  return dispatch => {
    axios
      .post("https://health.iot4health.co.kr:9300/v1/doctor/account/hospital-info", {
        phone_num: phonenumber
      })
      .then(response => {
        console.log(response);
        if(response.data.status === "200") {
          alert(response.data.message);
        } else{
          alert(response.data.message);
        }

      })
  }
}

export const phoneAuth = (authnumber) => {
  return dispatch => {
    axios
      .post("https://health.iot4health.co.kr:9300/v1/doctor/account/hospital-infosd", {
        auth_num: authnumber
      })
      .then(response => {
        console.log(response);
        if(response.data.status === "200") {
          alert(response.data.message);
        } else{
          alert(response.data.message);
        }

      })
  }
}



export const puthsinfo = (userid, hospitalname, businessnumber, zipcode, address1, address2, phonenumber, accountname, bankname, accountnumber) => {
  return dispatch => {
    axios
      .put("https://health.iot4health.co.kr:9300/v1/doctor/account/hospital-info", {
        user_id : userid, 
        hospital_name : hospitalname,
        business_num : businessnumber,
        zip_code : zipcode,
        address_1 : address1,
        address_2 : address2,
        phone_num : phonenumber,
        account_name : accountname,
        bank_name : bankname,
        account_num : accountnumber
      })
      .then(response => {
        console.log(response);
        if(response.data.status === "200") {
          alert("병원정보가 정상적으로 변경되었습니다.")
        } else {
          alert(response.data.message);
        }

      })
  }
}


export const register4 = (userid, filename, file, medicalpart, medicalable, medicaldesc, medicalnum, userdesc) => {
  let data = new FormData();
  data.append('user_id', userid);
  data.append('file_name', file);
  data.append('medical_part', medicalpart);
  data.append('medical_able', medicalable);
  data.append('medical_desc', medicaldesc);
  data.append('medical_num', medicalnum);
  data.append('user_desc', userdesc)
  return dispatch => {
    axios
      .post("https://health.iot4health.co.kr:9300/v1/doctor/account/user-info", data

      )
      .then(response => {
        let register4status;

        if(response.data.status === "200") {
          register4status = response.data.status
          console.log(register4status)

          dispatch({
            type:"REGISTER4_STATUS",
            payload: {register4status}
          })
        } else {
          
          dispatch({
            type:"REGISTER4_STATUS",
            payload: {register4status}
          })
          alert(response.data.message);
        }

      })
  }
}

export const putmyinfo = (phonenum, userid, filename, file, medicalpart, medicalable, medicaldesc, medicalnum, userdesc) => {
  let data = new FormData();
  data.append('mobile_num', phonenum);
  data.append('user_id', userid);
  data.append('file_name', file);
  data.append('medical_part', medicalpart);
  data.append('medical_able', medicalable);
  data.append('medical_desc', medicaldesc);
  data.append('medical_num', medicalnum);
  data.append('user_desc', userdesc);
  
  return dispatch => {
    axios
      .put("https://health.iot4health.co.kr:9300/v1/doctor/account/user-info", data)
      // .put("http://192.168.0.45:9300/v1/doctor/account/user-info", data)

      .then(response => {
        if(response.data.status === "200") {
          window.location.reload()
          alert("개인정보가 정상적으로 변경되었습니다.")
         
        } else {
          alert(response.data.message);
        }

      })
  }
}

export const putmyinfonfile = (mdfphonenum, userid,  filename, file, medicalpart, medicalable, medicaldesc, medicalnum, userdesc) => {
  let data = new FormData();
  data.append('mobile_num', mdfphonenum);
  data.append('user_id', userid);
  data.append('file_name', file);
  data.append('medical_part', medicalpart);
  data.append('medical_able', medicalable);
  data.append('medical_desc', medicaldesc);
  data.append('medical_num', medicalnum);
  data.append('user_desc', userdesc)
  return dispatch => {
    axios
      .put("https://health.iot4health.co.kr:9300/v1/doctor/account/user-info", data)
      // .put("http://192.168.0.45:9300/v1/doctor/account/user-info", data)
      .then(response => {
        if(response.data.status === "200") {
          window.location.reload()
          alert("개인정보가 정상적으로 변경되었습니다.")
         
        } else {
          alert(response.data.message);
        }

      })
  }
}

export const putMyInfoNonFile = (mdfphonenum, userid, medicalpart, medicalable, medicaldesc, medicalnum, userdesc) => {
  let data = new FormData();
  data.append('mobile_num', mdfphonenum);
  data.append('user_id', userid);
  data.append('medical_part', medicalpart);
  data.append('medical_able', medicalable);
  data.append('medical_desc', medicaldesc);
  data.append('medical_num', medicalnum);
  data.append('user_desc', userdesc)
  return dispatch => {
    axios
      .put("https://health.iot4health.co.kr:9300/v1/doctor/account/user-info", data)
      .then(response => {
        if(response.data.status === "200") {
          window.location.reload()
          alert("개인정보가 정상적으로 변경되었습니다.")
         
        } else {
          alert(response.data.message);
        }

      })
  }
}




export const getMyInfo = (userid) => {
  return dispatch => {
    axios
      .get("https://health.iot4health.co.kr:9300/v1/doctor/account/user-info", {
        params: {
          user_id: userid
        }
      })
      .then(response => {
        let myinfo;

        if(response.data.status==="200") {
          myinfo = response.data.data
          console.log("나의 정보: ",myinfo)
          
          dispatch({
            type:"MYINFO_STATUS",
            payload: {myinfo}
          })
        } else {
          alert("고객정보를 불러오지 못하였습니다.")
        }
      })
  }
}


export const changepassword = (userid, password, newpassword) => {
  return dispatch => {
    axios
      .put("https://health.iot4health.co.kr:9300/v1/doctor/account/password", {
          user_id : userid, 
          user_pwd : password,
          new_pwd : newpassword   
        }
      )
      .then(response => {
        console.log(response);
        if(response.data.status === "200") {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }

      })
  }
}

// export const withdrawal = (userid) => {
//   return dispatch => {
//     axios
//       .put("https://health.iot4health.co.kr:9300/v1/doctor/account/user-state", {
//           user_id : userid, 
//           user_state : "9",
//         }
//       )
//       .then(response => {
//         console.log(response);
//         if(response.data.status === "200") {
//           alert(response.data.message);
//         } else {
//           alert(response.data.message);
//         }

//       })
//   }
// }


export const signupWithJWT = (email, password, name) => {
  return dispatch => {
    axios
      .post("/api/authenticate/register/user", {
        email: email,
        password: password,
        name: name
      })
      .then(response => {
        var loggedInUser

        if(response.data){

          loggedInUser = response.data.user

          localStorage.setItem("token", response.data.token)

          dispatch({
            type: "LOGIN_WITH_JWT",
            payload: { loggedInUser, loggedInWith: "jwt" }
          })

          history.push("/")
        }

      })
      .catch(err => console.log(err))

  }
}
