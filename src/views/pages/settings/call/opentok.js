import React from "react";
import {
  FormGroup,
  Button,
  InputGroup,
  Input,
  CustomInput,
  Card,
  CardTitle,
  CardBody,
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  OTSession,
  OTStreams,
  preloadScript,
  OTSubscriber,
  OTPublisher,
} from "opentok-react";
import "../../../../assets/scss/plugins/extensions/opentok.scss";
import video from "../../../../assets/img/call/ID25_14_btn_op_video.png";
import mic from "../../../../assets/img/call/ID25_14_btn_op_mic.png";
import video_off from "../../../../assets/img/call/ID25_14_btn_op_video_off.png";
import mic_off from "../../../../assets/img/call/ID25_14_btn_op_mic_off.png";
import call from "../../../../assets/img/call/ID25_14_btn_op_end-call.png";
import Axios from "axios";
import { connect } from "react-redux";
import { history } from "../../../../history";

class ConsultingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      error: null,
      connected: false,
      camerastate: true,
      micstate: true,
      disconnect: false,
      onsubscribe: false,
      connectedtag: true,
      conncheckmodal: false,
      okmodal: false,
    };

    this.connectionCheck = this.connectionCheck.bind(this);
    this.sessionEventHandlers = {
      connectionCreated: (event) => {
        console.log("connection created", event);
      },
      connectionDestroyed: (event) => {
        console.log("connection destroyed", event);
        this.connectionCheck();
      },
      sessionConnected: (event) => {
        console.log("Client connect to a session");
      },
      sessionDisconnected: (event) => {
        console.log("Client disConnect to a session");
      },
      sessionReconnected: (event) => {
        console.log("session reconnected");
      },
    };

    this.publishEvents = {
      publishConnected: () => {
        this.setState({ pconnected: true });
      },
      publishDisconnected: () => {
        this.setState({ pconnected: false });
      },
    };
  }

  connCheckModal = () => {
    this.setState((prevState) => ({
      conncheckmodal: !prevState.conncheckmodal,
    }));
  };

  okModal = () => {
    this.setState((prevState) => ({
      okmodal: !prevState.okmodal,
    }));
  };

  goPatientInfo = () => {
    history.push("/patientinfo");
  };

  connectionCheck = () => {
    Axios.get(
      "https://teledoc.hicare.net:446/v1/doctor/treatment/involve-state",
      {
        params: {
          user_id: this.props.user.login.values.loggedInUser.username,
          appoint_num: this.props.appo.APPOINT_NUM,
        },
      }
    )
      .then((response) => {
        if (
          response.data.data.STATE_PAT === "" ||
          response.data.data.STATE_PAT === "1"
        ) {
          this.connCheckModal();
        } else {
          this.okModal();
        }
      })
      .catch((err) => console.log(err));
  };

  cameraState = () => {
    this.setState((prevState) => ({
      camerastate: !prevState.camerastate,
    }));
  };

  micState = () => {
    this.setState((prevState) => ({
      micstate: !prevState.micstate,
    }));
  };

  onError = (err) => {
    this.setState({ error: `Failed to connect: ${err.message}` });
  };

  check = () => {
    console.log(this.state);
  };

  disconnectSession = () => {
    this.setState({ connectedtag: false });
  };

  childFunction = () => {
    this.props.parentFunction(this.state.onsubscribe);
  };

  onSubscribe = () => {
    this.setState({
      onsubscribe: "Y",
    });
    this.childFunction();
  };

  subscribeCheck = () => {
    this.setState((prevState) => ({
      sconnected: !prevState.sconnected,
    }));
  };

  childText = "childText";

  onError2 = (err) => {
    this.setState({ error: `Failed to publish: ${err.message}` });
    alert(
      "인터넷 상태로 인해 화면공유에 오류가 발생하였습니다\n화면공유를 다시 시도해 주십시오"
    );
    window.location.reload();
  };

  onError = (err) => {
    this.setState({ error: `Failed to publish: ${err.message}` });
    alert(
      "기기설정에 문제가 발생하였습니다.\n기기설정을 다시 시도해 주시거나 카메라,마이크를 사용하시던 프로그램을 종료해주십시오"
    );
    window.location.reload();
  };

  render() {
    return (
      <OTSession
        className="col-12 m-0 p-0"
        apiKey={this.props.apikey}
        sessionId={this.props.session}
        token={this.props.token}
        onError={this.onError}
        eventHandlers={this.sessionEventHandlers}
      >
        {this.state.error ? <div id="error">{this.state.error}</div> : null}
        {/* {this.connectedtag=== true? */}
        <OTPublisher
          properties={{
            showControls: false,
            publishAudio: this.state.micstate,
            publishVideo: this.state.camerastate,
            // videoSource: this.props.togglescreenshare === true ? 'screen' : '1de715565c9317a8505cd4ef34943cd87f98165c164b3968f738e0740caf5ea3'

            // deviceid로 작동
            // videoSource: this.props.togglescreenshare === true ? 'screen' : undefined
            videoSource:
              this.props.cameraset === "" ? undefined : this.props.cameraset,
            audioSource:
              this.props.micset === "" ? undefined : this.props.micset,
          }}
          onError={this.onError}
        />
        {/* : null} */}

        {this.props.toglescreenshare !== false ? (
          <OTPublisher
            properties={{
              showControls: false,
              publishAudio: this.state.micstate,
              publishVideo: this.state.camerastate,
              // videoSource: this.props.togglescreenshare === true ? 'screen' : '1de715565c9317a8505cd4ef34943cd87f98165c164b3968f738e0740caf5ea3'

              // deviceid로 작동
              // videoSource: this.props.togglescreenshare === true ? 'screen' : undefined
              videoSource: "screen",
            }}
            onError={this.onError2}
          />
        ) : null}
        {/* {this.connectedtag=== true? */}
        <OTStreams>
          <OTSubscriber
            className="otsubscriber"
            properties={{
              showControls: false,
              // subscribeToAudio: this.state.audio,
              // subscribeToVideo: this.state.video
            }}
            onSubscribe={this.onSubscribe}
            onError={this.onError}
          />
        </OTStreams>
        {/* : null} */}
        <div className="buttons">
          <img
            src={this.state.micstate === true ? mic : mic_off}
            onClick={this.micState}
            style={{ cursor: "pointer", width: "40px" }}
          />
          <img
            src={this.state.camerastate === true ? video : video_off}
            onClick={this.cameraState}
            style={{ cursor: "pointer", width: "40px" }}
            className="mr-2"
          />
          <img
            src={call}
            onClick={this.disconnectSession}
            style={{ cursor: "pointer", width: "40px" }}
          />
          {/* <button onClick={this.check}>확인용</button> */}
        </div>
        <Modal isOpen={this.state.conncheckmodal} toggle={this.connCheckModal}>
          <ModalHeader toggle={this.connCheckModal}>
            <b>비정상 진료 종료</b>
          </ModalHeader>
          <ModalBody>
            화상통화가 비정상 종료 되었습니다.
            <br />재 입장 할 때까지 대기 하시겠습니까?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.connCheckModal}>
              대기하기
            </Button>
            <Button color="primary" outline onClick={this.goPatientInfo}>
              전화끊기
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.okmodal} toggle={this.okModal}>
          <ModalHeader toggle={this.okModal}>
            <b>정상 진료 종료</b>
          </ModalHeader>
          <ModalBody>화상통화가 종료되었습니다.</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.okModal}>
              확인
            </Button>
          </ModalFooter>
        </Modal>
      </OTSession>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    dataList: state.dataList,
    appo: state.dataList.appointment,
    pinfo: state.dataList.patient,
    cslist: state.dataList.csdata,
    bpdata: state.dataList.BP,
    pulstdata: state.dataList.PULSE,
    tempdata: state.dataList.TEMP,
    bsdata: state.dataList.BS,
    wedata: state.dataList.WE,
    spo2data: state.dataList.SPO2,
  };
};

export default preloadScript(connect(mapStateToProps)(ConsultingRoom));
