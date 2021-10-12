import axios from "axios"
import { data } from "jquery"
import { history } from "../../../history"
import moment from "moment"

const formatDate = (scheduleda)=>{
  let formatted_date = scheduleda.getFullYear() + "-" + ('0' + (scheduleda.getMonth() + 1)).slice(-2) + "-" + ('0' + scheduleda.getDate()).slice(-2) + " " 
                       + ('0' + scheduleda.getHours()).slice(-2) + ":" + ('0' + scheduleda.getMinutes()).slice(-2)
   return formatted_date;
  }

const utcFormatDate = (scheduleda)=>{
  let utcscheduleda = moment.utc(scheduleda.toISOString()).format("YYYY-MM-DD HH:mm")
  console.log("utc:",utcscheduleda)
    return utcscheduleda;
  }

const localFormDate = (scheduleda)=>{
  console.log("utc", scheduleda)
  let localscheduledate = moment.utc(scheduleda).toDate()
  localscheduledate = moment(localscheduledate).format()
  console.log("locale:",localscheduledate)
    return localscheduledate;
  }

export const fisrtFetchEvents = () => {
  return async dispatch => {
    await axios
      .get("/api/apps/calendar/events")
      .then(response => {
        dispatch({ type: "FETCH_EVENTS", events: response.data })
      })
      .catch(err => console.log(err))
  }
}

export const clearSchedule = () => {
  return dispatch => {
    dispatch({ type: "CLEAR_EVENTS", events: [] })
  }
}


export const deleteSchedule = (revents) => {
  return dispatch => {
    dispatch({ type: "DELETE_EVENTS", events: revents })
  }
}


export const calendarfetchEvents = (userid, monthstart, monthend) => {
  return async dispatch => {
    await axios
      .get("https://health.iot4health.co.kr:9300/v1/doctor/appointment/appointments", {
        params: {
          user_id: userid,
          start_date: monthstart,
          end_date: monthend
        }
      })
      .then(response => {
        if(response.data.status==="200"){
          let length = response.data.data.length
          console.log(length)
          console.log(response.data.data)
          let appointmentsdata 	= new Array();
          for (let i=0; i<length; i++) {
            let jsonObj		= new Object();         
            jsonObj.id		= (i+1);
            jsonObj.title = moment(response.data.data[i].APPOINT_TIME).format("hh:mm A") + " " +  response.data.data[i].F_NAME
            jsonObj.start	= response.data.data[i].APPOINT_TIME
            jsonObj.end = response.data.data[i].APPOINT_TIME
            jsonObj.label = "others"
            jsonObj.selectable = false  
            jsonObj = JSON.stringify(jsonObj);
            //String 형태로 파싱한 객체를 다시 json으로 변환
            appointmentsdata.push(JSON.parse(jsonObj));
          }
          console.log(appointmentsdata)
          dispatch({ type: "CALENDAR_FETCH_EVENTS", events: appointmentsdata })
        }
      })
      .catch(err => console.log(err))
  }
}

export const fetchEvents = (user_id, weekstart, weekend) => {
  return async dispatch => {
    await axios
      .get("https://health.iot4health.co.kr:9300/v1/doctor/appointment/schedules",{
        params: {
          user_id: user_id,
          start_date: weekstart,
          end_date: weekend
        }
      })
      .then(response => {
        if(response.data.status==="200"){
        let schelength = response.data.data.length
        let weekempty
        if(schelength===0) {
          weekempty="Y"
        } else {
          weekempty="N"
        }

        let scheduledata 	= new Array();
        for (let i=0; i<schelength; i++) {
          let jsonObj		= new Object();         
          jsonObj.start	= localFormDate(response.data.data[i].start)
          jsonObj.end	= localFormDate(response.data.data[i].end)
          jsonObj.id	= response.data.data[i].id
          jsonObj = JSON.stringify(jsonObj);
          //String 형태로 파싱한 객체를 다시 json으로 변환
          scheduledata.push(JSON.parse(jsonObj));
        }
        console.log(scheduledata)

        dispatch({ type: "FETCH_EVENTS", events: scheduledata, empty:weekempty })
      }
      })
      .catch(err => console.log(err))
  }
}

export const nextfetchEvents = (user_id, weekstart, weekend) => {
  return async dispatch => {
    await axios
      .get("https://health.iot4health.co.kr:9300/v1/doctor/appointment/schedules",{
        params: {
          user_id: user_id,
          start_date: weekstart,
          end_date: weekend
        }
      })
      .then(response => {
        let nextweekempty
        if(response.data.data.length===0) {
          nextweekempty="Y"
        } else {
          nextweekempty="N"
        }

        dispatch({ type: "NEXT_FETCH_EVENTS", events: response.data.data, empty:nextweekempty })
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


export const postSchedules = (userid, holiday, rperiod, events) => {
  return dispatch => {
    let dateToObj = events.map(event => {
      event.start = utcFormatDate(event.start)
      event.end = utcFormatDate(event.end)
      return event
    })
    console.log(events)
    axios
      .post("https://health.iot4health.co.kr:9300/v1/doctor/appointment/schedules",{
          user_id: userid,
          holiday_yn: holiday,
          count: rperiod,
          events: dateToObj
      })
      .then(response => {
        console.log(response)
        if(response.data.status==="200") {
          alert("스케줄 설정이 저장되었습니다.\n로그인페이지로 이동합니다.")
          history.push("/")
        } else if(response.data.status==="400") {
          alert("등록된 스케줄이 없습니다.\n로그인 이후 스케줄을 수정해주시기 바랍니다.\n로그인페이지로 이동합니다.")
          history.push("/")
        } else {
          alert("스케줄 설정에 문제가 발생했습니다.\n관리자에게 문의 바랍니다.")
        }

        // holidayyn의
      })
      .catch(err => console.log(err))
  }
}



export const mdfpostSchedules = (userid, holiday, rperiod, events) => {
  return dispatch => {
    let dateToObj = events.map(event => {
      event.start = utcFormatDate(event.start)
      event.end = utcFormatDate(event.end)
      return event
    })
    console.log(events)
    axios
      .post("https://health.iot4health.co.kr:9300/v1/doctor/appointment/schedules",{
          user_id: userid,
          holiday_yn: holiday,
          count: rperiod,
          events: dateToObj
      })
      .then(response => {
        console.log(response)
        if(response.data.status==="200") {
          alert("수정된 스케줄이 저장되었습니다.")
          window.location.reload()
        } else if(response.data.status==="400") {
          alert("수정된 스케줄 저장에 문제가 발생했습니다. 스케줄이 비어있는 주부터 설정을 시작해주세요")
        } else{
          alert("수정된 스케줄 저장에 문제가 발생했습니다. 관리자에게 문의 바랍니다.")
        }
      })
      .catch(err => console.log(err))
  }
}




export const startschedules = (userid, weekstart, weekend, events) => {
  return dispatch => {
    axios
      .delete("https://health.iot4health.co.kr:9300/v1/doctor/appointment/schedules",{
        data: {
          user_id:userid,
          start_date:utcFormatDate(weekstart),
          end_date:utcFormatDate(weekend),
        }    
      })
      .then(response => {
        console.log(response)
        
      })
      .then(endchedules(userid, weekstart, weekend, events))
      .catch(err => console.log(err))
  }
}

export const endchedules = (userid, weekstart, weekend, events) => {
  return dispatch => {
    let dateToObj = events.map(event => {
      event.start = utcFormatDate(event.start)
      event.end = utcFormatDate(event.end)
      return event
    })
    axios
      .put("https://health.iot4health.co.kr:9300/v1/doctor/appointment/schedules",{
          user_id:userid,
          start_date:weekstart,
          end_date:weekend,
          events: dateToObj 
      })
      .then(response => {
        console.log(response)
        if(response.data.status==="200") {
          alert("스케쥴이 정상적으로 수정되었습니다.")
          window.location.reload()
        }
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
