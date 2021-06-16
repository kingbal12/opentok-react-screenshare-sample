import * as firebase from "firebase/app"
import { history } from "../../../history"
import "firebase/auth"
import "firebase/database"
import axios from "axios"
import { config } from "../../../authServices/firebase/firebaseConfig"


// Init firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

let firebaseAuth = firebase.auth()

export const signupWithFirebase = (email, password, name) => {
  return dispatch => {
    let userEmail = null,
      loggedIn = false
    // userName = null

    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        firebaseAuth.onAuthStateChanged(user => {
          result.user.updateProfile({
            displayName: name
          })
          if (user) {
            userEmail = user.email
            // let userName = user.displayName
            loggedIn = true
            dispatch({
              type: "SIGNUP_WITH_EMAIL",
              payload: {
                email: userEmail,
                name,
                isSignedIn: loggedIn
              }
            })
            dispatch({
              type: "LOGIN_WITH_EMAIL",
              payload: {
                email: userEmail,
                name
              }
            })
          }
        })
        history.push("/")
      })
      .catch(error => {
        console.log(error.message)
      })
  }
}

// 회원가입 pages/register2 
export const register2 = (name, phone, email, password) => {

  
  return dispatch => {
    let registeruser = email
    axios
      .post("http://203.251.135.81:9300/signup", {
        name: name, 
        phone: phone,
        user_id: email,
        user_pwd: password,
        group_seq: "2"
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
        payload: {registeruser}
      })
  }
}

export const authemail = (email) => {
  console.log(email,"email2")
  return dispatch => {
   
    axios
      .post("http://203.251.135.81:9300/signup-email", {
        user_id: email,
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
//       .post("http://203.251.135.81:9300/signup-verify", {
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
      .post("http://203.251.135.81:9300/v1/doctor/account/hospital-info", {
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
      .put("http://203.251.135.81:9300/v1/doctor/account/user-info", data

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

export const changepassword = (userid, password, newpassword) => {
  return dispatch => {
    axios
      .put("http://203.251.135.81:9300/v1/doctor/account/password", {
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
