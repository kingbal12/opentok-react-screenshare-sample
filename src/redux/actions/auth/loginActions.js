
import { history } from "../../../history"

import axios from "axios"
import { persistor } from "../../storeConfig/store"

// 로그인액션부분 i4h api
export const loginWithJWT = user => {
  return dispatch => {
    axios
      .get("http://203.251.135.81:9300/signin", {
        params: {
          user_id: user.email,
          user_pwd: user.password,
          device_token: user.tokendata,
          device_kind: user.devicekind
        }
      })
      
      .then(response => {
        
        let loggedInUser;

        if (response.data.status==="200") {
          loggedInUser = response.data.data;
          dispatch({
            type: "LOGIN_WITH_JWT",
            payload: { loggedInUser, loggedInWith: "jwt" }
          })
          history.push("/analyticsDashboard")
          console.log("로그인시 들어오는 데이터",response)
        }
        else {
          alert(response.data.message)
        }
      })
      .catch(err => console.log(err))
  }
}



export const logoutWithJWT = () => {
  return dispatch => {
    // axios
    //   .post()
    // 로그아웃 api
    
    dispatch({ type: "LOGOUT_WITH_JWT", payload: {} })
    persistor.purge();
    localStorage.clear();
    history.push("/pages/login")
   
  }
}





// const initAuth0 = new auth0.WebAuth(configAuth)











// 로그인 액션 부분(인성 api)
// export const loginWithJWT = user => {
//   return dispatch => {
//     axios
//       .post("https://test-api.hicare.net:7000/api/healthcareworker/login", {
//         login_id: user.email,
//         password: user.password
//       })
//       .then(response => {
//         var loggedInUser;

//         if (response.data.data) {
//           loggedInUser = response.data.data
//           let fName = loggedInUser.f_name;
// 					let mName = loggedInUser.m_name;
// 					let lName = loggedInUser.l_name;
          
//           loggedInUser.displayName = (fName ==  null?"":fName)
// 													+ " " + (mName ==  null?"":mName) 
// 													+ " " + (lName ==  null?"":lName);
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






export const changeRole = role => {
  return dispatch => dispatch({ type: "CHANGE_ROLE", userRole: role })
}
