import axios from "axios"
import { history } from "../../../history"
// Get Initial Emails
export const getappoints = (userid, startdate, pageamont, pagenum) => {
  return async dispatch => {
    console.log("api실행됨",userid,"리듀서 부분에서 문제가 생김")
    await axios
      .get("https://health.iot4health.co.kr:9300/v1/doctor/appointment/dashboard", {
        params: {
          user_id: userid,
          start_date: "20210101",
          page_amount: 5,
          page_num: 1
        }
      })
      .then(response => {
        let appoints;
        if (response.data.status==="200") {
          appoints=response.data.data
        // console.log(response, "response")
        dispatch({
          type: "GET_APPOINTS",
          payload: {
            appointsdata: appoints
          }
        })
      }
      })
      .catch(err => console.log(err))
  }
}

