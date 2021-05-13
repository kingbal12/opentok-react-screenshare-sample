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
      .post("http://192.168.0.7:9300/signup", {
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

// 회원가입 pages/register3
export const register3 = (userid, hospitalname, businessnumber, zipcode, address1, address2, phonenumber, accountname, bankname, accountnumber) => {
  return dispatch => {
    axios
      .post("http://192.168.0.7:9300/v1/doctor/account/hospital-info", {
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
