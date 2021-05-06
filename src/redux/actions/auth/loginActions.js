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

// const initAuth0 = new auth0.WebAuth(configAuth)

export const submitLoginWithFireBase = (email, password, remember) => {
  return dispatch => {
    let userEmail = null,
      loggedIn = false
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        firebaseAuth.onAuthStateChanged(user => {
          result.user.updateProfile({
            displayName: "Admin"
          })
          let name = result.user.displayName
          if (user) {
            userEmail = user.email
            loggedIn = true
            dispatch({
              type: "LOGIN_WITH_EMAIL",
              payload: {
                email: userEmail,
                name,
                isSignedIn: loggedIn,
                loggedInWith: "firebase"
              }
            })
          }
          if (user && remember) {
            firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.SESSION)
              .then(() => {
                dispatch({
                  type: "LOGIN_WITH_EMAIL",
                  payload: {
                    email: userEmail,
                    name,
                    isSignedIn: loggedIn,
                    remember: true,
                    loggedInWith: "firebase"
                  }
                })
              })
          }
          history.push("/")
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const loginWithFB = () => {
  return dispatch => {
    let provider = new firebase.auth.FacebookAuthProvider()
    provider.setCustomParameters({
      display: "popup"
    })
    firebaseAuth
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        let token = result.credential.accessToken,
          // The signed-in user info.
          user = result.user.email
        dispatch({
          type: "LOGIN_WITH_FB",
          payload: {
            user,
            token,
            loggedInWith: "firebase"
          }
        })
        if (user) history.push("/")
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const loginWithTwitter = () => {
  return dispatch => {
    let provider = new firebase.auth.TwitterAuthProvider()
    firebaseAuth
      .signInWithPopup(provider)
      .then(function(result) {
        let token = result.credential.accessToken,
          user = result.user.email,
          name = result.user.displayName,
          photoUrl = result.user.photoURL
        dispatch({
          type: "LOGIN_WITH_TWITTER",
          payload: {
            user,
            name,
            photoUrl,
            token,
            loggedInWith: "firebase"
          }
        })
        history.push("/")
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}

export const loginWithGoogle = () => {
  return dispatch => {
    let provider = new firebase.auth.GoogleAuthProvider()
    firebaseAuth
      .signInWithPopup(provider)
      .then(function(result) {
        let token = result.credential.accessToken,
          user = result.user.email,
          name = result.user.displayName,
          photoUrl = result.user.photoURL
        dispatch({
          type: "LOGIN_WITH_GOOGLE",
          payload: {
            email: user,
            name: name,
            photoUrl,
            token,
            loggedInWith: "firebase"
          }
        })
        history.push("/")
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}

export const loginWithGithub = () => {
  return dispatch => {
    let provider = new firebase.auth.GithubAuthProvider()
    firebaseAuth
      .signInWithPopup(provider)
      .then(function(result) {
        let token = result.credential.accessToken,
          user = result.user.email,
          name = result.additionalUserInfo.username,
          photoUrl = result.user.photoURL

        dispatch({
          type: "LOGIN_WITH_GITHUB",
          payload: {
            user,
            name,
            photoUrl,
            token,
            loggedInWith: "firebase"
          }
        })
        history.push("/")
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}


// 로그인 액션 부분(인성 api)
export const loginWithJWT = user => {
  return dispatch => {
    axios
      .post("https://test-api.hicare.net:7000/api/healthcareworker/login", {
        login_id: user.email,
        password: user.password
      })
      .then(response => {
        var loggedInUser;

        if (response.data.data) {
          loggedInUser = response.data.data
          let fName = loggedInUser.f_name;
					let mName = loggedInUser.m_name;
					let lName = loggedInUser.l_name;
          
          loggedInUser.displayName = (fName ==  null?"":fName)
													+ " " + (mName ==  null?"":mName) 
													+ " " + (lName ==  null?"":lName);
          console.log(loggedInUser);
          dispatch({
            type: "LOGIN_WITH_JWT",
            payload: { loggedInUser, loggedInWith: "jwt" }
          })

          history.push("/analyticsDashboard")
        }
      })
      .catch(err => console.log(err))
  }
}


// 로그인액션부분 i4h api
// export const loginWithJWT = user => {
//   return dispatch => {
//     axios
//       .post("http://192.168.0.7:9200/signin", {
//         user_id: user.email,
//         user_pwd: user.password
//       })
//       .then(response => {
//         var loggedInUser;

//         if (response) {
//           loggedInUser = response.data;
       
//           console.log(loggedInUser);
//           dispatch({
//             type: "LOGIN_WITH_JWT",
//             payload: { loggedInUser, loggedInWith: "jwt" }
//           })

//           history.push("/analyticsDashboard")
//         }
//       })
//       .catch(err => console.log(err))
//   }
// }

export const logoutWithJWT = () => {
  return dispatch => {
    // axios
    //   .post()
    // 로그아웃 api
    dispatch({ type: "LOGOUT_WITH_JWT", payload: {} })
    history.push("/pages/login")
  }
}

export const logoutWithFirebase = user => {
  return dispatch => {
    
    dispatch({ type: "LOGOUT_WITH_FIREBASE", payload: {} })
    history.push("/pages/login")
  }
}

export const changeRole = role => {
  return dispatch => dispatch({ type: "CHANGE_ROLE", userRole: role })
}
