import axios from "axios"
import { data } from "jquery"

// export const fetchEvents = () => {
//   return async dispatch => {
//     await axios
//       .get("/api/apps/calendar/events")
//       .then(response => {
//         dispatch({ type: "FETCH_EVENTS", events: response.data })
//       })
//       .catch(err => console.log(err))
//   }
// }

export const fetchEvents = (user_id) => {
  return async dispatch => {
    await axios
      .get("http://203.251.135.81:9300/v1/doctor/appointment/schedules",{
        params: {
          user_id: user_id,
          start_date: "20210101",
          end_date: "20230701"
        }
      })
      .then(response => {
        console.log(response)
        // 배열안의 데이터 이름을 바꿀 수 있는 방안 연구
        // fake-db의 데이터 항목 참고 
        // react-big-calendar의 dataformat 과 api에서 오는 dataformat이 다르지만
        // fake=db에 있는 데이터 항목대로 substring을 통해 가공해서 보낸다면 해결될것 같음
        
        dispatch({ type: "FETCH_EVENTS", events: response.data.data })
      })
      .catch(err => console.log(err))
  }
}

export const handleSidebar = bool => {
  return dispatch => dispatch({ type: "HANDLE_SIDEBAR", status: bool })
}

export const addEvent = event => {
  return dispatch => {
    dispatch({ type: "ADD_EVENT", event })
  }
}

const formatDate = (start)=>{
  let formatted_date = start.getFullYear() + "-" + ('0' + (start.getMonth() + 1)).slice(-2) + "-" + start.getDate() + " " + ('0' + start.getHours()).slice(-2) + ":" + ('0' + start.getMinutes()).slice(-2)
   return formatted_date;
  }

export const schedules = (userid, holiday, rperiod, events) => {
  return dispatch => {
    let dateToObj = events.map(event => {
      event.start = formatDate(event.start)
      event.end = formatDate(event.end)
      return event
    })
    console.log(events)
    axios
      .post("http://203.251.135.81:9300/v1/doctor/appointment/schedules",{
          user_id: userid,
          holiday_yn: holiday,
          count: rperiod,
          events: dateToObj
      })
      .then(response => {
        console.log(response)
        // holidayyn의
      })
      .catch(err => console.log(err))
  }
}
export const updateEvent = event => {
  return dispatch => {
    dispatch({ type: "UPDATE_EVENT", event })
  }
}

export const updateDrag = event => {
  return dispatch => {
    dispatch({ type: "UPDATE_DRAG", event })
  }
}

export const updateResize = event => {
  return dispatch => {
    dispatch({ type: "EVENT_RESIZE", event })
  }
}

export const handleSelectedEvent = event => {
  return dispatch => dispatch({ type: "HANDLE_SELECTED_EVENT", event })
}
