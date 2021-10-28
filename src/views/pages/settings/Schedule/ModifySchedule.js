import React from "react";
import "../../../../assets/scss/plugins/mdfschedule/react-big-calendar.css";
import "../../../../assets/scss/plugins/mdfschedule/react-big-calendar.scss";
import AddEventSidebar from "./AddEventSidebar";
import {
  Card,
  CardBody,
  Button,
  ButtonGroup,
  Modal,
  FormGroup,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import { connect } from "react-redux";
import {
  fetchEvents,
  handleSidebar,
  addEvent,
  handleSelectedEvent,
  updateEvent,
  updateDrag,
  updateResize,
  startschedules,
  clearSchedule,
  mdfpostSchedules,
  nextfetchEvents,
  deleteSchedule,
} from "../../../../redux/actions/calendar/index";
import { ChevronLeft, ChevronRight } from "react-feather";
import Radio from "../../../../components/@vuexy/radio/RadioVuexy";
import { FormattedMessage } from "react-intl";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
const eventColors = {
  business: "bg-success",
  work: "bg-warning",
  personal: "bg-danger",
  others: "bg-primary",
};

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
    };
  }

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
            <div className="ml=2 month d-inline-block mx-75 text-bold-500 font-medium-2 align-middle">
              {this.props.label}
            </div>
            <Button.Ripple
              className="btn-icon rounded-circle ml-1"
              size="sm"
              color="primary"
              onClick={() => this.props.onNavigate("NEXT")}
            >
              <ChevronRight size={15} />
            </Button.Ripple>
          </div>
        </div>
        <div>스케쥴을 클릭하면 개별삭제가 삭제 가능합니다.</div>
      </div>
    );
  }
}

class CalendarApp extends React.Component {
  clearschedule = (e) => {
    e.preventDefault();
    this.props.clearSchedule();
  };

  schedulemodal = () => {
    this.setState((prevState) => ({
      schedulemodal: !prevState.schedulemodal,
    }));
  };

  alertModal = () => {
    this.setState((prevState) => ({
      alertmodal: !prevState.alertmodal,
    }));
  };
  alert = () => {
    if (this.state.weekempty === "Y" && this.state.nextweekempty === "N") {
      this.alertModal();
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.app.events.length !== state.events ||
      props.app.sidebar !== state.sidebar ||
      props.app.selectedEvent !== state.eventInfo
    ) {
      let dateToObj = props.app.events.map((event) => {
        // 여기서 날짜 포맷이 다시 바뀌는중
        event.start = new Date(event.start);
        event.end = new Date(event.end);

        return event;
      });
      return {
        events: dateToObj,
        sidebar: props.app.sidebar,
        eventInfo: props.app.selectedEvent,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      userid: props.user.login.values.loggedInUser.username,
      events: [],
      // nextevents: props.app.nextevents, 구지 스테이터스에 저장을 할 필요가 없다
      views: {
        month: true,
        week: true,
        day: true,
      },
      id: 1,
      auto: "true",
      rperiod: "1",
      holiday: "Y",
      modal: false,
      weekstart: "",
      weekend: "",
      nextweekstart: "",
      nextweekend: "",
      alertmodal: false,
      schedulemodal: false,
      weekempty: "",
      nextweekempty: "",
    };
  }

  async componentDidMount() {
    await this.onNavigate(new Date(), "week");

    this.loadschedule();
    this.loadnextschedule();

    this.setState(
      {
        weekempty: this.props.app.weekempty,
        nextweekempty: this.props.app.nextweekempty,
      },
      () => this.alert()
    );
  }

  handleRepeatPeriod = (rperiod) => {
    this.setState({
      rperiod,
    });
  };

  handleEventColors = (event) => {
    return { className: eventColors[event.label] };
  };

  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = this.state;
    const idx = events.indexOf(event);
    let allDay = event.allDay;
    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }
    const updatedEvent = { ...event, start, end, allDay };
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    this.setState({
      events: nextEvents,
    });
    this.props.updateDrag(updatedEvent);
  };

  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state;
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    this.setState({
      events: nextEvents,
    });

    this.props.updateResize({ ...event, start, end });
  };

  handleSelectEvent = (event) => {
    let filteredState = this.state.events.filter((i) => i.id === event.id);
    this.props.handleSidebar(true);
    this.props.handleSelectedEvent(filteredState[0]);
    this.setState({
      eventInfo: filteredState[0],
    });
  };

  handleAddEvent = (id) => {
    this.setState({ id: this.state.id + 1 });
    this.props.handleSidebar(false);
    this.props.addEvent({
      id,
      start: this.state.startDate,
      end: this.state.endDate,
    });
  };

  onNavigate = (date, view, action) => {
    let start, end, nextstart, nextend;
    let scheduledata;
    if (view === "week") {
      start = moment(date).startOf("week")._d;
      end = moment(date).endOf("week")._d;
      nextstart = moment(date).add(7, "d").startOf("week")._d;
      nextend = moment(date).add(7, "d").endOf("week")._d;
      this.setState({ weekstart: start, weekend: end });
      this.setState({ nextweekstart: nextstart, nextweekend: nextend });
      if (action === "PREV" || action === "NEXT") {
        start = moment(date).startOf("week")._d;
        end = moment(date).endOf("week")._d;
        nextstart = moment(date).add(7, "d").startOf("week")._d;
        nextend = moment(date).add(7, "d").endOf("week")._d;
        this.setState({ events: [] }, () => {
          this.setState({ weekstart: start, weekend: end }, () =>
            this.loadschedule()
          );
        });
        this.setState({ nextevents: [] }, () => {
          this.setState(
            { nextweekstart: nextstart, nextweekend: nextend },
            () => this.loadnextschedule()
          );
        });
      }
    } else {
      alert(
        "스케쥴 수정 도중 오류가 발생하였습니다. 관리자에게 문의부탁드립니다."
      );
    }
  };

  check = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  loadschedule = () => {
    this.props.fetchEvents(
      this.state.userid,
      this.state.weekstart,
      this.state.weekend
    );
  };

  loadnextschedule = () => {
    this.props.nextfetchEvents(
      this.state.userid,
      this.state.nextweekstart,
      this.state.nextweekend
    );
  };

  modifychedule = (e) => {
    e.preventDefault();
    if (
      this.props.app.nextevents.length === 0 &&
      this.props.app.weekempty === "Y"
    ) {
      this.schedulemodal();
    } else {
      this.props.startschedules(
        this.state.userid,
        this.state.weekstart,
        this.state.weekend,
        this.state.events
      );
      console.log(this.state);
    }
  };

  postschedule = (e) => {
    e.preventDefault();
    this.props.mdfpostSchedules(
      this.state.userid,
      this.state.holiday,
      this.state.rperiod,
      this.state.events
    );
  };

  // 이벤트 개별 삭제 함수
  onSelectEvent(pEvent) {
    const r = window.confirm("이 스케쥴을 삭제하시겠습니까?");
    if (r === true) {
      this.setState(
        (prevState, props) => {
          const revents = [...prevState.events];
          const idx = revents.indexOf(pEvent);
          revents.splice(idx, 1);
          this.state.events = revents;
        },

        () => this.props.deleteSchedule(this.state.events)
      );
    }
  }

  render() {
    const { events, views, sidebar } = this.state;
    const today = new Date();

    return (
      <div className="app-calendar position-relative">
        <div
          className={`app-content-overlay ${sidebar ? "show" : "hidden"}`}
          onClick={() => {
            this.props.handleSidebar(false);
            this.props.handleSelectedEvent(null);
          }}
        ></div>
        <Card>
          <CardBody>
            <DragAndDropCalendar
              style={{ height: "600px", position: "relative" }}
              // formats={dayFormat}
              min={
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate(),
                  8
                )
              }
              max={
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate(),
                  20
                )
              }
              culture="kr"
              localizer={localizer}
              events={events}
              onEventDrop={this.moveEvent}
              onEventResize={this.resizeEvent}
              startAccessor="start"
              onNavigate={this.onNavigate}
              endAccessor="end"
              resourceAccessor="url"
              defaultView="week"
              views={views}
              dayLayoutAlgorithm="no-overlap"
              // 15분 간격 설정(기존은 30분)
              step={15}
              components={{ toolbar: Toolbar }}
              eventPropGetter={this.handleEventColors}
              popup={false}
              onSelectSlot={({ start, end }) => {
                this.setState({
                  // title: "테스트",
                  // label: null,
                  startDate: new Date(start),
                  endDate: new Date(end),
                  // url: ""
                });
                this.handleAddEvent(this.state.id);
                console.log("---------------------", this.state.startDate);
              }}
              selectable={true}
              // 이벤트 클릭 시 함수 설정
              onSelectEvent={(event) => this.onSelectEvent(event)}
            />
            <div className="pt-1 text-right">
              {/* <Button
                className="mr-2"
                color="primary"
                outline
                type="button"
                size="lg"
                onClick={this.check}
              >
                <FormattedMessage id="Drafts"/>
              </Button> */}
              <Button
                className="mr-2"
                color="primary"
                outline
                type="button"
                size="lg"
                onClick={this.clearschedule}
              >
                <FormattedMessage id="Reset" />
              </Button>
              <Button
                color="primary"
                type="button"
                size="lg"
                onClick={this.modifychedule}
              >
                <FormattedMessage id="Save" />
              </Button>
            </div>

            <Modal
              isOpen={this.state.alertmodal}
              toggle={this.alertModal}
              className="modal-dialog-centered"
            >
              <ModalBody>
                <p>스케줄 반복 기간이 일주일 남았습니다.</p>
                <p>스케줄을 설정하시겠어요?</p>
              </ModalBody>
              <ModalFooter className="text-center">
                <Button color="primary" outline onClick={this.alertModal}>
                  스케쥴 설정 시작하기
                </Button>
              </ModalFooter>
            </Modal>

            <Modal
              isOpen={this.state.schedulemodal}
              toggle={this.schedulemodal}
              className="modal-dialog-centered"
            >
              <ModalHeader toggle={this.schedulemodal}>설정</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <div>1. 자동반복을 설정하시겠습니까?</div>
                  <div id="auto" className="d-inline-block mr-1">
                    <Radio
                      label="네"
                      defaultChecked={this.state.auto === "true" ? true : false}
                      name="auto"
                      value="true"
                      onChange={(e) => this.setState({ auto: e.target.value })}
                    />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="아니오"
                      defaultChecked={
                        this.state.auto === "false" ? true : false
                      }
                      name="auto"
                      value="false"
                      onChange={(e) =>
                        this.setState({ auto: e.target.value, rperiod: "1" })
                      }
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
                      disabled={this.state.auto == "true" ? false : true}
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
                      disabled={this.state.auto == "true" ? false : true}
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
                      disabled={this.state.auto == "true" ? false : true}
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
                    <Radio
                      label="네"
                      defaultChecked={this.state.holiday === "Y" ? true : false}
                      name="holiday"
                      value="Y"
                      onChange={(e) =>
                        this.setState({ holiday: e.target.value })
                      }
                    />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="아니오"
                      defaultChecked={this.state.holiday === "N" ? true : false}
                      name="holiday"
                      value="N"
                      onChange={(e) =>
                        this.setState({ holiday: e.target.value })
                      }
                    />
                  </div>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" outline onClick={this.schedulemodal}>
                  취소
                </Button>
                <Button
                  color="primary"
                  onClick={(this.schedulemodal, this.postschedule)}
                >
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    app: state.calendar,
  };
};

export default connect(mapStateToProps, {
  fetchEvents,
  handleSidebar,
  addEvent,
  handleSelectedEvent,
  updateEvent,
  updateDrag,
  updateResize,
  startschedules,
  clearSchedule,
  mdfpostSchedules,
  nextfetchEvents,
  deleteSchedule,
})(CalendarApp);
