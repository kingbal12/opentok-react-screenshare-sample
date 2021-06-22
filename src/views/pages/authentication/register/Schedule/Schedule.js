import React from "react"
import AddEventSidebar from "./AddEventSidebar"
import AddEventButton from "./AddEventButton"
import { Card, CardBody, Button, ButtonGroup, Modal, FormGroup, Input, Label,
  ModalHeader,
  ModalBody,
  ModalFooter, } from "reactstrap"
import { Calendar, momentLocalizer } from "react-big-calendar"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import moment from "moment"
import { connect } from "react-redux"
import {
  fetchEvents,
  handleSidebar,
  addEvent,
  handleSelectedEvent,
  updateEvent,
  updateDrag,
  updateResize,
  schedules
} from "../../../../../redux/actions/calendar/index"
import { ChevronLeft, ChevronRight } from "react-feather"

import "react-big-calendar/lib/addons/dragAndDrop/styles.scss"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "../../../../../assets/scss/plugins/calendars/react-big-calendar.scss"
import { history } from "../../../../../history"
import Radio from "../../../../../components/@vuexy/radio/RadioVuexy"
import { ThemeConsumer } from "styled-components"
import { FormattedDate } from "react-intl"
const DragAndDropCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment)
const eventColors = {
  business: "bg-success",
  work: "bg-warning",
  personal: "bg-danger",
  others: "bg-primary"
}

// 여기서 쓰인 포맷 변환을 api로 보내기 전에 시행해야함
const formatDate = (start)=>{
let formatted_date = start.getFullYear() + "-" + (start.getMonth() + 1) + "-" + start.getDate() + " " + start.getHours() + ":" + start.getMinutes()
 return formatted_date;
}

  
// 중요!!! Date 포맷을 변경하는것을 빠르게 연구하여 적용할것!
// const Date = new Date('2021-06-01 09:00')
class Toolbar extends React.Component {
  render() {
    return (
      <div className="calendar-header mb-2 d-flex justify-content-between flex-wrap">
        <div className="month-label d-flex flex-column text-center text-md-right mt-1 mt-md-0">
          <div className="calendar-navigation">
            <Button.Ripple
              className="btn-icon rounded-circle"
              size="sm"
              color="primary"
              onClick={() => this.props.onNavigate("PREV")}
            >
              <ChevronLeft size={15} />
            </Button.Ripple>
            <Button.Ripple
              className="btn-icon rounded-circle ml-1"
              size="sm"
              color="primary"
              onClick={() => this.props.onNavigate("NEXT")}
            >
              <ChevronRight size={15} />
            </Button.Ripple>
            <div className="month d-inline-block mx-75 text-bold-500 font-medium-2 align-middle">
              {this.props.label}
            </div>
           
          </div>
        </div>
      </div>
    )
  }
}

class CalendarApp extends React.Component {


  schedulemodal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.app.events.length !== state.events ||
      props.app.sidebar !== state.sidebar ||
      props.app.selectedEvent !== state.eventInfo
    ) {
      let dateToObj = props.app.events.map(event => {
        event.start = new Date(event.start)
        event.end = new Date(event.end)
        return event
      })
      return {
        events: dateToObj,
        sidebar: props.app.sidebar,
        eventInfo: props.app.selectedEvent
      }
    }
    // Return null if the state hasn't changed
    return null
  }
  constructor(props) {
    super(props)
    this.state = {
      userid: props.user.login.values.loggedInUser.username,
      events: [],
      views: {
        month: true,
        week: true,
        day: true
      },
      // id: null,
      // eventInfo: null,
      // startDate: new Date(),
      // endDate: new Date(),
      // title: "",
      // label: null,
      // allDay: true,
      // selectable: true
      auto: "true",
      rperiod: "1",
      holiday: "Y",
      modal: false
      
    }
  }

  async componentDidMount() {
    await this.props.fetchEvents()
  }
  
  handleRepeatPeriod = rperiod => {
    this.setState({
      rperiod
    })
  }
 

  handleEventColors = event => {
    return { className: eventColors[event.label] }
  }

  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = this.state
    const idx = events.indexOf(event)
    let allDay = event.allDay
    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }
    const updatedEvent = { ...event, start, end, allDay }
    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)
    this.setState({
      events: nextEvents
    })
    this.props.updateDrag(updatedEvent)
  }

  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents
    })

    this.props.updateResize({ ...event, start, end })
  }

  handleSelectEvent = event => {
    let filteredState = this.state.events.filter(i => i.id === event.id)
    this.props.handleSidebar(true)
    this.props.handleSelectedEvent(filteredState[0])
    this.setState({
      eventInfo: filteredState[0]
    })
  }

  handleAddEvent = id => {
    // id값을 정하는것과
    // end start date의 state값을 정하는것은 다른 함수로 하는것 같음
    this.props.handleSidebar(false)
    this.props.addEvent(
      {
      id,
      title: this.state.title,
      start: this.state.startDate,
      end: this.state.endDate,
      // label: this.state.label === null ? "others" : this.state.label,
      // allDay: this.state.allDay,
      // selectable: this.state.selectable
    })
    
    // this.setState({
    //   startDate: new Date(),
    //   endDate: new Date(),
    //   title: "",
    //   label: null,
    //   allDay: true,
    //   selectable: true
    // })
  }

  postschedule = e => {
    e.preventDefault()
    this.props.schedules(
      this.state.userid,
      this.state.holiday,
      this.state.rperiod,
      this.state.events)
      
  }

  


  render() {
    const { events, views, sidebar } = this.state
 
    return (
      <div className="app-calendar position-relative">
        <div
          className={`app-content-overlay ${sidebar ? "show" : "hidden"}`}
          onClick={() => {
            this.props.handleSidebar(false)
            this.props.handleSelectedEvent(null)
          }}
        ></div>
        <Card>
          <CardBody>
            <DragAndDropCalendar style={{height:"600px", position:"relative"}}
              // formats={dayFormat}
              culture='kr'
              localizer={localizer}
              events={events}
              onEventDrop={this.moveEvent}
              onEventResize={this.resizeEvent}
              startAccessor="start"
              endAccessor="end"
              resourceAccessor="url"
              defaultView='week'
              views={views}
              // 15분 간격 설정(기존은 30분)
              step={15}
              components={{ toolbar: Toolbar }}
              eventPropGetter={this.handleEventColors}
              popup={false}
              onSelectEvent={event => {
                this.handleSelectEvent(event)
              }}
              onSelectSlot={({ start, end }) => {
                this.setState({
                  title: "테스트",
                  // label: null,

                  // 여기서는 포맷변환을 시켜봤자 다시 원래 포맷으로 변하게 됨
                  // startDate: new Date(start),
                  // endDate: new Date(end)
                  
                  startDate: formatDate(start),
                  endDate: formatDate(end)
                  // url: ""
                  
                })
                this.handleAddEvent(1)
                // id 를 1씩 증가하게끔 
                // this.props.handleSidebar(true)
                // this.props.handleSelectedEvent({
                //   title: "",
                //   label: null,
                //   start: new Date(start),
                //   end: new Date(end),
                //   url: ""
                // })
                console.log(start,"---------------------", this.state.startDate)
                console.log(this.state);
              }}
              
              selectable={true}
            />
            <div className="pt-1 text-right">
              <Button
                color="primary"
                type="button"
                size="lg"
                // onClick={() => {
                //   history.push("/pages/login")
                // }}
                onClick={this.schedulemodal}
                
              >
                저장
              </Button>
            </div>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggleModal}
              className="modal-dialog-centered"
            >
              <ModalHeader toggle={this.toggleModal}>
                설정
              </ModalHeader>
              <ModalBody>
                  <FormGroup>
                    <div>1. 자동반복을 설정하시겠습니까?</div>
                    <div id="auto" className="d-inline-block mr-1">
                      <Radio 
                        label="네" 
                        defaultChecked={this.state.auto==="true"?true:false}  
                        name="auto" 
                        value="true"
                        onChange={e => this.setState({ auto: e.target.value })}
                      />
                    </div>
                    <div className="d-inline-block mr-1">
                      <Radio
                        label="아니오"
                        defaultChecked={this.state.auto==="false"?true:false}
                        name="auto"
                        value="false"
                        onChange={e => this.setState({ auto: e.target.value, rperiod: "1" })}
                      />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    {/* <Label for="repeat-period">2. 반복기간</Label> */}
                    <div>2. 반복기간</div>
                    <ButtonGroup 
                      // id="repeat-period" 
                      // size="sm"
                    >
                      <button
                        disabled={this.state.auto=="true"?false:true}
                        onClick={() => this.handleRepeatPeriod("4")}
                        className={`btn ${
                          this.state.rperiod === "4"
                            ? "btn-primary"
                            : "btn-outline-primary text-primary"
                        }`}
                      >
                        1개월
                      </button>

                      <button
                        disabled={this.state.auto=="true"?false:true}
                        onClick={() => this.handleRepeatPeriod("8")}
                        className={`btn ${
                          this.state.rperiod === "8"
                            ? "btn-primary"
                            : "btn-outline-primary text-primary"
                        }`}
                      >
                        2개월
                      </button>
                      
                      <button
                        disabled={this.state.auto=="true"?false:true}
                        onClick={() => this.handleRepeatPeriod("12")}
                        className={`btn ${
                          this.state.rperiod === "12"
                            ? "btn-primary"
                            : "btn-outline-primary text-primary"
                        }`}
                      >
                        3개월
                      </button>
                    </ButtonGroup>
                  </FormGroup>
                  <FormGroup>
                    <div>3. 공휴일을 제외하시겠습니까?</div>
                    <div id="holiday" className="d-inline-block mr-1">
                      <Radio label="네" 
                        defaultChecked={this.state.holiday==="Y"?true:false}  
                        name="holiday" 
                        value="Y"
                        onChange={e => this.setState({ holiday: e.target.value })}
                      />
                    </div>
                    <div className="d-inline-block mr-1">
                      <Radio
                        label="아니오"
                        defaultChecked={this.state.holiday==="N"?true:false}
                        name="holiday"
                        value="N"
                        onChange={e => this.setState({ holiday: e.target.value })}
                      />
                    </div>
                  </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" outline onClick={this.schedulemodal}>
                  취소
                </Button>
                <Button color="primary" onClick={this.schedulemodal, this.postschedule}>
                  저장
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
        <AddEventSidebar
          sidebar={sidebar}
          handleSidebar={this.props.handleSidebar}
          addEvent={this.props.addEvent}
          events={this.state.events}
          eventInfo={this.state.eventInfo}
          selectedEvent={this.props.handleSelectedEvent}
          updateEvent={this.props.updateEvent}
          resizable
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    app: state.calendar
  }
}

export default connect(mapStateToProps, {
  fetchEvents,
  handleSidebar,
  addEvent,
  handleSelectedEvent,
  updateEvent,
  updateDrag,
  updateResize,
  schedules
})(CalendarApp)