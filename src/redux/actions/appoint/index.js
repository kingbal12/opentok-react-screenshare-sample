import axios from "axios"
import { history } from "../../../history"
// Get Initial Emails
export const getappoints = (userid,startdate) => {
  return async dispatch => {
    console.log("api실행됨",userid,startdate,"리듀서 부분에서 문제가 생김")
    await axios
      .get("http://203.251.135.81:9300/v1/doctor/appointment/dashboard", {
        params: {
          user_id: userid,
          start_date: startdate
        }
      })
      .then(result => {
        console.log(result)
        dispatch({
          type: "GET_APPOINTS",
          appointsdata: result.data.data 
        })
        
      })
      .catch(err => console.log(err))
  }
}

