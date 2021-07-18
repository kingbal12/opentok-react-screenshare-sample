
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

    dispatch({ type: "LOGOUT_WITH_JWT", payload: {} })
    persistor.purge("auth","dataList")
    localStorage.clear();
    history.push("/pages/login")
   
  }
}


export const changeRole = role => {
  return dispatch => dispatch({ type: "CHANGE_ROLE", userRole: role })
}
