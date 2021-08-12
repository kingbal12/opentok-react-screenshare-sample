import React from "react"
import {FormGroup, Button,
  InputGroup,Input,
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
  ModalFooter
} from "reactstrap"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import {
  mPCL,
  resetVitalData,
  postMDNoteData,
  postPrescriptionData,
  postPayData,
  putStateComplete
} from "../../../../redux/actions/data-list/"
import DateCountdown from 'react-date-countdown-timer';
import {
  saveCookieConsult
} from "../../../../redux/actions/cookies/"
import { Check } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import "../../../../assets/scss/pages/authentication.scss"
import {connect} from "react-redux"
import { Fragment } from "react"
import {Helmet} from "react-helmet";
import axios from "axios"
import "../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import "../../../../assets/scss/plugins/extensions/recharts.scss"
import Opentok from "./opentok"
import previmg from "../../../../assets/img/dashboard/ID13_11_file.png"
import moment from "moment"
import Select from "react-select"
import dot from "../../../../assets/img/dashboard/ID13_11_icon.png"
import VitalDataM from "../../../ui-elements/patient-list/PatientInfo/VitalDataM"
import PastConsultList from "../../../ui-elements/patient-list/PatientInfo/DataListConfigM"
import queryString from "query-string"
import Countdown from 'react-countdown';

class Cslist extends React.Component { 
  render() { 
    return(
      <tr>
        <th className="text-center"><h6>{this.props.row.PART_NAME} / {this.props.row.F_NAME}</h6></th>
        <th className="text-center"><h6>{this.props.row.NOTE_DX}</h6></th>
        <th className="text-center"><h6>{moment(this.props.row.APPOINT_TIME).format("YYYY-MM-DD hh:mm A")}</h6></th>  
      </tr> 
 
    ); 
  } 
}



class ConsultingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      streams: [],
      cc: props.concookie.cc,
      diagnosis: props.concookie.diagnosis,
      txrx: props.concookie.txrx,
      recommendation: props.concookie.recommendation,
      pcode: props.pharmacy.P_CODE,
      pname: props.pharmacy.P_NAME,
      paddress: props.pharmacy.P_ADDRESS,
      telnum: props.pharmacy.TEL_NUM,
      faxnum: props.pharmacy.FAX_NUM,
      filename: "",
      file : "",
      paytotal: props.concookie.paytotal,
      paypatient: props.concookie.paypatient,
      mdnotemodal: false,
      presmodal: false,
      paymodal: false,
      pharmacy: false,
      App: false,
      viewfilemodal: false,
      settingmodal: false,
      screenshare: false,
      vitaldatamodal: false,
      pclmodal: false,
      camera:[],
      mic:[],
      speaker:[],
      cameraset:{},
      micset:{},
      speakerset:{},
      onsubscribe: "N"
      
    }

  }

  cookieConsult = () =>{
    
    this.props.saveCookieConsult(
      this.state.cc,
      this.state.diagnosis,
      this.state.txrx,
      this.state.recommendation,
      this.state.paytotal,
      this.state.paypatient
    )
    alert("진료노트, 결제정보가 임시저장 되었습니다")
  }




  componentDidMount() {
    (async () => {   
      await navigator.mediaDevices.getUserMedia({audio: true, video:true});   
      let devices = await navigator.mediaDevices.enumerateDevices().catch();
      console.log(devices)
      let camera = await devices.filter(devices => devices.kind ==="videoinput")
      let mic = await devices.filter(devices =>devices.kind ==="audioinput")
      let speaker = await devices.filter(devices =>devices.kind ==="audiooutput")

      let modifiedcamera = new Array();
        for (let i=0; i<camera.length; i++) {
          let item = {deviceId: camera[i].deviceId, groupId: camera[i].groupId, kind: camera[i].kind, value: camera[i].label, label: camera[i].label }
          modifiedcamera.push(item);
        }

      let modifiedmic = new Array();
        for (let i=0; i<mic.length; i++) {
          let item = {deviceId: mic[i].deviceId, groupId: mic[i].groupId, kind: mic[i].kind, value: mic[i].label, label: mic[i].label }
          modifiedmic.push(item);
        }

      let modifiedspeaker = new Array();
        for (let i=0; i<speaker.length; i++) {
          let item = {deviceId: speaker[i].deviceId, groupId: speaker[i].groupId, kind: speaker[i].kind, value: speaker[i].label, label: speaker[i].label }
          modifiedspeaker.push(item);
        }


      await this.setState({camera:modifiedcamera})
      await this.setState({mic:modifiedmic})
      await this.setState({speaker:modifiedspeaker})
      
    })();
  }

  // startarchiveVideo() {
  //   axios
  //     .post("https://api.opentok.com/v2/project/47274054/archive", 
  //     {
  //       sessionId : "1_MX40NzI3NDA1NH5-MTYyNzg2OTY5ODIzNn5kR2VXN2kwUnRHbkZGVUJQYUxIL3E5c2N-UH4",
  //       hasAudio : true,
  //       hasVideo : true,
  //       layout : {
  //         type: "bestFit"
  //       },
  //       // name : "test",
  //       outputMode : "composed",
  //       resolution : "640x480"
  //   },
  //   {
  //     headers: { 
  //       'Authorization':'T1==cGFydG5lcl9pZD00NzI3NDA1NCZzaWc9ZGQzNjgxNGMwZmY4NGI3YTkwMDZhZjg2ZGJjZGNiMTYxYzc0ODRiNjpzZXNzaW9uX2lkPTFfTVg0ME56STNOREExTkg1LU1UWXlOemcyT1RZNU9ESXpObjVrUjJWWE4ya3dVblJIYmtaR1ZVSlFZVXhJTDNFNWMyTi1VSDQmY3JlYXRlX3RpbWU9MTYyNzg2OTY5OCZub25jZT0zOTY2NzEzNzAmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTYyNzk1NjA5OA==',
  //       'Content-Type': 'application/json' 
  //     }
  //   }
  //     )
  //     .then(response => {
  //       console.log(response);
  //     })
  // }

  startarchiveVideo() {
    axios
      .post('http://localhost:3000' + '/archive/start', {'sessionId': '1_MX40NzI3NDA1NH5-MTYyNzUyMTEzNDA5NH5MYTRBV05oWTlsaXhVNWU1RjhWbTM4QjZ-UH4'}, null, 'json')
      .then(response => {
        console.log(response);
      })
  }


  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds === 0) { 
      clearInterval(this.timer);
    }
  }

  viewFileModal = () => {
    this.setState(prevState => ({
      viewfilemodal: !prevState.viewfilemodal
    }))
  }



  goVitalData = e => {
    e.preventDefault()
    this.vitaldataModal()
  }

  vitaldataModal = () => {
    this.setState(prevState => ({
      vitaldatamodal: !prevState.vitaldatamodal
    }))
  }

  mdNoteModal = () => {
    this.setState(prevState => ({
      mdnotemodal: !prevState.mdnotemodal
    }))
  }

  settingModal = () => {
    this.setState(prevState => ({
      settingmodal: !prevState.settingmodal
    }))
  }

  setScreenShare = () => {
    this.setState(prevState => ({
      screenshare: !prevState.screenshare
    }))
  }

  goHome = e => {
    e.preventDefault()
    this.props.saveCookieConsult(
      this.state.cc,
      this.state.diagnosis,
      this.state.txrx,
      this.state.recommendation,
      this.state.paytotal,
      this.state.paypatient
    )
    history.push("/analyticsDashboard")
  }

  postMdNote = () => {
    this.props.postMDNoteData(
      this.props.user.login.values.loggedInUser.username,
      this.props.appo.APPOINT_NUM,
      this.state.cc,
      this.state.diagnosis,
      this.state.txrx,
      this.state.recommendation
      )

    this.props.putStateComplete(
      this.props.user.login.values.loggedInUser.username,
      this.props.appo.APPOINT_NUM
    )

    this.setState(prevState => ({
      mdnotemodal: !prevState.mdnotemodal
    }))
  }

  presModal = () => {
    this.setState(prevState => ({
      presmodal: !prevState.presmodal
    }))
  }

  handleFileOnChange = e => {
    
    e.preventDefault();
    
    let reader = new FileReader();
    let file = e.target.files[0];
    let filename = e.target.files[0].name
    reader.onloadend = () => {
      this.setState({
        file : file,
        previewURL : reader.result,
        filename: filename
      })
    }
    reader.readAsDataURL(file);
    e.target.value = null;
  }

  postPrescription = () => {
    if(this.props.appo===null){
      alert("예약정보가 없기때문에 처방전 저장이 불가능합니다.")
    } else{
      this.props.postPrescriptionData(
      this.props.user.login.values.loggedInUser.username,
      this.props.appo.APPOINT_NUM,
      this.state.filename,
      this.state.file
      )
      this.props.putStateComplete(
        this.props.user.login.values.loggedInUser.username,
        this.props.appo.APPOINT_NUM
      )
    }
    this.setState(prevState => ({
      presmodal: !prevState.presmodal
    }))
  }

  goPastConsultList(pid) {
    this.props.mPCL(pid)
    this.pclModal()
  }

  pclModal = () => {
    this.setState(prevState => ({
      pclmodal: !prevState.pclmodal
    }))
  }

  setpharmacy = () => {
    this.setState(prevState => ({
      pharmacy: !prevState.pharmacy
    }))
  }

  setApp = () => {
    this.setState(prevState => ({
      App: !prevState.App
    }))
  }

  payModal = () => {
    this.setState(prevState => ({
      paymodal: !prevState.paymodal
    }))
  }

  Check = e => {
    e.preventDefault()
    console.log(this.state.screenshare)
  }

  postPayment = () => {
    if(this.props.appo===undefined){
      alert("예약정보가 없기때문에 결제금액 입력이 불가합니다.")
    } else{
      this.props.postPayData(
      this.props.user.login.values.loggedInUser.username,
      this.props.appo.APPOINT_NUM,
      this.state.paypatient,
      this.state.paypatient
      )
      this.props.putStateComplete(
        this.props.user.login.values.loggedInUser.username,
        this.props.appo.APPOINT_NUM
      )
    }
    this.setState(prevState => ({
      paymodal: !prevState.paymodal
    }))
  }

  setSpeaker = e => {
    e.preventDefault()
    const audioEl = new Audio()
    audioEl.setSinkId(this.state.speakerset.deviceId).then(function() {
      console.log('Set deviceId('+audioEl.sinkId+') in the selected audio element');
   }).catch(error => console.log(error));
    console.log('Audio is being played on ' + audioEl.sinkId);
  }
 

  parentFunction = (data) => {
    this.setState({onsubscribe: data})
} 

  Completionist = () => <span>진료시간이 완료되었습니다.</span>
 
  render() {
    let file_preview = null;

    {this.props.appo===null||this.props.appo.FILE_NAME===""?
      file_preview = 
        <img
          src={previmg}
          className="dz-img"
          alt=""
        />
      :file_preview = 
        <img
          width="50px"
          height="50px" 
          src={"https://health.iot4health.co.kr:9300"+this.props.appo.FILE_PATH
          +this.props.appo.FILE_NAME}
          className="dz-img"
          alt=""
          style={{cursor:"pointer"}} 
          onClick={this.viewFileModal}
        />
    }
    return (
      <Fragment>
        
        {/* 환자정보, 버튼 모음 Row */}
        <Row className="d-flex justify-content-between mb-1">
        <Helmet>
          <script src="https://static.opentok.com/v2/js/opentok.min.js" type="text/javascript" />
        </Helmet>
          <Col lg="6" md="12">
            {this.props.appo===null?null:
              <Table responsive>
                <thead>
                  <tr className="table-primary" style={{verticalAlign:"middle"}}>
                    <th><h6>{this.props.appo.APPOINT_TIME}</h6></th>
                    <th><h6>{this.props.pinfo.F_NAME}</h6></th>
                    <th><h6>{this.props.pinfo.GENDER==="1"||this.props.pinfo.GENDER==="3"?"M":"F"}</h6></th>
                    <th><h6>{this.props.pinfo.AGE}</h6></th>
                    <th><h6>{this.props.pinfo.BIRTH_DT}</h6></th>
                    <th><h6>{this.props.pinfo.NOTE_DX}</h6></th>
                    <th><h6>{this.props.pinfo.FIRST_YN==="N"?"재진":"초진"}</h6></th>
                  </tr>
                </thead>
              </Table>
            } 
          </Col>
          <Col lg="6" md="12" className="text-right">
            <Button
              className="mr-1"
              color="black"
              outline
              type="button">
                {/* 타이머 */}
              {this.props.appo===null?"진료 시작 전입니다.":
                <Countdown date={moment(this.props.rtime) + 900000} >
                  <this.Completionist />
                </Countdown>
                // <DateCountdown 
                //   dateFrom= {this.props.rtime}
                //   dateTo= {moment(this.props.rtime).add("15","m")}
                //   // callback={()=>alert('Hello')} 
                //   locales_plural={['년','월','일','시','분','초']} />
              }
            </Button>
            <Button
              className="mr-1"
              // disabled={this.state.onsubscribe==="N"?true:false}
              color="black"
              outline
              onClick={this.setScreenShare}
              type="button">
              화면공유
            </Button>
            <Button
              className="mr-1"
              color="black"
              outline
              onClick={this.startarchiveVideo}
              type="button">
              화면녹화
            </Button>
            <Button
              color="black"
              outline
              type="button"
              // onClick={()=> history.push("/pages/callsetting")}
              onClick={this.settingModal}
            >
              설정
            </Button>
          </Col>
        </Row>

        {/* 화상통화, 생체데이터, 등등 */}
        <Row>
          <Col lg="5" xl="5" sm="12" md="12"> 
            <Card className="mb-0" style={{height:"680px", border:"solid #7367ef 1px", backgroundColor:"#efefff"}}>
              <Row className="col-12 p-0">
                <Col lg="12" md="12">
                {this.props.dataList.tokbox.TOK_KEY===""?null:
                <Opentok className="col-12"
                  parentFunction={this.parentFunction}
                  apikey={this.props.dataList.tokbox.TOK_KEY}
                  // apikey="47274054"
                  toglescreenshare={this.state.screenshare}
                  session={this.props.dataList.tokbox.TOK_SESSION}
                  // session= "1_MX40NzI3NDA1NH5-MTYyNzg2OTY5ODIzNn5kR2VXN2kwUnRHbkZGVUJQYUxIL3E5c2N-UH4"
                  token={this.props.dataList.tokbox.TOK_TOKEN}
                  // token="T1==cGFydG5lcl9pZD00NzI3NDA1NCZzaWc9ZGQzNjgxNGMwZmY4NGI3YTkwMDZhZjg2ZGJjZGNiMTYxYzc0ODRiNjpzZXNzaW9uX2lkPTFfTVg0ME56STNOREExTkg1LU1UWXlOemcyT1RZNU9ESXpObjVrUjJWWE4ya3dVblJIYmtaR1ZVSlFZVXhJTDNFNWMyTi1VSDQmY3JlYXRlX3RpbWU9MTYyNzg2OTY5OCZub25jZT0zOTY2NzEzNzAmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTYyNzk1NjA5OA=="
                />
                }
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg="7" md="12">
          <Modal
            style={{position:"absolute", right:"4%", top:"10%"}}
            backdrop={false}
            isOpen={this.state.vitaldatamodal}
            toggle={this.vitaldataModal}
            className="modal-lg"
          >
            <ModalHeader toggle={this.vitaldataModal}>
              <b>Vital Data</b>
            </ModalHeader>
            <ModalBody>
              
                <VitalDataM />
              
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.vitaldataModal}>
                닫기
              </Button>
            </ModalFooter>
          </Modal>
          <Modal
            isOpen={this.state.viewfilemodal}
            toggle={this.viewFileModal}
            className="modal-dialog-centered modal-lg"
          >
            <ModalHeader toggle={this.viewFileModal}>
              
            </ModalHeader>
            <ModalBody>
              <Row className="justify-content-center">
                {this.props.appo===null||this.props.appo.FILE_NAME===""?null:
                <img
                  maxwidth="500px"
                  height="500px"
                  src={"https://health.iot4health.co.kr:9300"+this.props.appo.FILE_PATH
                  +this.props.appo.FILE_NAME}
                  className="dz-img"
                  alt=""
                  style={{cursor:"pointer"}} 
                  onClick={this.viewFileModal}
                />
                }
              </Row>
            </ModalBody>
            <ModalFooter className="justify-content-center">
              <Button color="primary" onClick={this.viewFileModal}>
                확인
              </Button>{" "}
            </ModalFooter>
          </Modal>

          <Modal
            style={{position:"absolute", right:"4%", top:"10%", width:"45%"}}
            backdrop={false}
            isOpen={this.state.pclmodal}
            toggle={this.pclModal}
            className="modal-lg"
          >
            <ModalHeader toggle={this.pclModal}>
              <b>Past Consulting List</b>
            </ModalHeader>
            <ModalBody>
              
                <PastConsultList parsedFilter={queryString.parse(this.props.location.search)} />
              
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.pclModal}>
                닫기
              </Button>
            </ModalFooter>
          </Modal>

          <Modal
              style={{position:"absolute", right:"4%", top:"25%", width:"45%"}}
              backdrop={false}
              isOpen={this.state.settingmodal}
              toggle={this.settingModal}
              className="modal-lg"
            >
              <ModalHeader toggle={this.settingModal}>
                <b>영상진료 설정</b>
              </ModalHeader>
              <ModalBody>
                <Row className="mt-1">
                  <Col lg="3" md="12" className="align-self-center">
                    <h5 className="text-bold-600">카메라 설정</h5>
                  </Col>
                  <Col lg="6" md="12">
                    <Select 
                      className="React"
                      classNamePrefix="select"
                      // defaultValue={this.state.camera[0]}
                      name="color"
                      options={this.state.camera}
                      onChange={e => this.setState({ cameraset: e})}
                    />
                  </Col>
                  <Col lg="3" md="12">
                    <Button.Ripple outline color="primary" size="md" onClick={this.setCamera}>
                      적용
                    </Button.Ripple>
                  </Col>
                </Row>    
                <Row className="mt-1">
                  <Col lg="3" md="12" className="align-self-center">
                    <h5 className="text-bold-600">마이크 설정</h5>
                  </Col>
                  <Col lg="6" md="12">
                    <Select 
                      className="React"
                      classNamePrefix="select"
                      // defaultValue={this.state.mic[0]}
                      name="color"
                      options={this.state.mic}
                      onChange={e => this.setState({ micset: e})}
                    />
                  </Col>
                  <Col lg="3" md="12">
                    <Button.Ripple outline color="primary" size="md">
                      적용
                    </Button.Ripple>
                  </Col>
                </Row>
                <Row className="mt-1">
                  <Col lg="3" md="12" className="align-self-center">
                    <h5 className="text-bold-600">스피커 설정</h5>
                  </Col>
                  <Col lg="6" md="12">
                    <Select 
                      className="React"
                      classNamePrefix="select"
                      // defaultValue={this.state.speaker[0]}
                      name="color"
                      options={this.state.speaker}
                      onChange={e => this.setState({ speakerset: e})}
                    />
                  </Col>
                  <Col lg="3" md="12">
                    <Button.Ripple outline color="primary" size="md" onClick={this.setSpeaker}>
                      적용
                    </Button.Ripple>
                  </Col>
                </Row>  
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.settingModal}>
                  저장 후 닫기
                </Button>
              </ModalFooter>
            </Modal>
            <Modal
              style={{position:"absolute", right:"4%", top:"25%", width:"45%"}}
              backdrop={false}
              isOpen={this.state.mdnotemodal}
              toggle={this.mdNoteModal}
              className="modal-lg"
            >
              <ModalHeader toggle={this.mdNoteModal}>
                <b>MD Note</b>
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col lg="3" md="12" className="align-self-center pt-0">
                    <h6 className="text-bold-600">C.C</h6>
                  </Col>
                  <Col lg="9" md="12" >
                    <FormGroup className="align-self-center pt-1">
                      <Input
                        type="text"
                        placeholder="C.C"
                        value={this.state.cc}
                        onChange={e => this.setState({ cc: e.target.value })}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="3" md="12" className="align-self-center pt-0">
                    <h6 className="text-bold-600">Diagnosis</h6>
                  </Col>
                  <Col lg="9" md="12" >
                    <FormGroup className="align-self-center pt-1">
                      <Input
                        type="text"
                        placeholder="Diagnosis"
                        value={this.state.diagnosis}
                        onChange={e => this.setState({ diagnosis: e.target.value })}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="3" md="12" className="align-self-center pt-0">
                    <h6 className="text-bold-600">Tx &amp; Rx</h6>
                  </Col>
                  <Col lg="9" md="12" >
                    <FormGroup className="align-self-center pt-1">
                      <Input
                        type="text"
                        placeholder="Tx &amp; Rx"
                        value={this.state.txrx}
                        onChange={e => this.setState({ txrx: e.target.value })}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="3" md="12" className="pt-1">
                    <h6 className="text-bold-600">Vital Data Recommendation</h6>
                  </Col>
                  <Col lg="9" md="12" >
                    <FormGroup className="align-self-center pt-1">
                      <InputGroup>
                        <Input
                          type="textarea"
                          placeholder="Vital Data recommendation"
                          rows="3"
                          value={this.state.recommendation}
                          onChange={e => this.setState({ recommendation: e.target.value })}
                        />   
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.postMdNote}>
                  저장
                </Button>
              </ModalFooter>
            </Modal>

            <Modal
              style={{position:"absolute", right:"4%", top:"25%", width:"45%"}}
              backdrop={false}
              isOpen={this.state.presmodal}
              toggle={this.presModal}
              className="modal-lg"
            >
              <ModalHeader toggle={this.presModal}>
                <b>Prescription</b>
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col lg="3" md="12" className="align-self-center pt-0">
                    <h5 className="text-bold-600">환자명</h5>
                  </Col>
                  <Col lg="9" md="12" >
                    <h5>{this.props.pinfo.F_NAME}</h5>
                  </Col>
                </Row>
                <Row className="mt-1">
                  <Col lg="3" md="12" className="align-self-center pt-0">
                    <h5 className="text-bold-600">약국명</h5>
                  </Col>
                  <Col lg="9" md="12" >
                      <h5>{this.state.pname===undefined?"없음":this.state.pname}</h5>
                  </Col>
                </Row>
                <Row className="mt-1">
                  <Col lg="3" md="12" className="align-self-center pt-0">
                    <h5 className="text-bold-600">약국 주소</h5>
                  </Col>
                  <Col lg="9" md="12" >
                      <h5>{this.state.paddress===undefined?"없음":this.state.paddress}</h5>
                  </Col>
                </Row>
                <Row className="mt-1">
                  <Col lg="3" md="12" className="align-self-center pt-0">
                    <h5 className="text-bold-600">Fax</h5>
                  </Col>
                  <Col lg="9" md="12" >
                      <h5>{this.state.faxnum===undefined?"없음":this.state.faxnum}</h5>
                  </Col>
                </Row>
                <Row className="mt-1">
                  <Col lg="3" md="12" className="align-self-center pt-0">
                    <h5 className="text-bold-600">처방전 보내기</h5>
                  </Col>
                  <Col lg="9" md="12" className="d-flex align-self-center">
                    <Checkbox
                      color="primary"
                      icon={<Check className="vx-icon" size={16} />}
                      label="약국"
                      defaultChecked={false}
                      onChange={this.setpharmacy}
                    />
                      <Checkbox
                      className="ml-2"
                      color="primary"
                      icon={<Check className="vx-icon" size={16} />}
                      label="원격진료실 &amp; App"
                      defaultChecked={false}
                      onChange={this.setApp}
                    />
                  </Col>
                </Row>
                <Row className="mt-1">
                  <Col lg="3" md="12" className="align-self-center">
                    <h5 className="text-bold-600">처방전 업로드</h5>
                  </Col>
                  
                  <Col lg="9" md="12" className="pt-1 align-self-center">
                    <FormGroup>
                      <CustomInput 
                        type="file" 
                        // accept="image/gif,image/jpeg,image/png" 
                        id="exampleCustomFileBrowser" 
                        name="customFile" 
                        label=""
                        onChange={this.handleFileOnChange}/> 
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.postPrescription}>
                  전송
                </Button>
              </ModalFooter>
            </Modal>
            <Modal
              style={{position:"absolute", right:"4%", top:"10%", width:"60%"}}
              backdrop={false}
              isOpen={this.state.paymodal}
              toggle={this.payModal}
              className="modal-dialog-centered modal-lg"
            >
            <ModalHeader toggle={this.payModal}>
              <b>Payment</b>
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col lg="7" md="12" className="align-self-center pt-0">
                  <Row>
                    <Col lg="5" md="12" className="align-self-center pt-0">
                      <h5 className="text-bold-600">급여총액</h5>
                    </Col>
                    <Col lg="5" md="11" className="align-self-center pt-0">
                      <FormGroup className="align-self-center pt-1">
                        <Input
                          type="text"
                          
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col  lg="1" md="1" className="align-self-center">
                      <h5>원</h5>
                    </Col>
                  </Row>
                </Col>
                <Col lg="5" md="12" >
                  <Row>
                    <Col lg="4" md="12" className="align-self-center pt-0">
                      <h5 className="text-bold-600">비급여</h5>
                    </Col>
                    <Col lg="6" md="11" className="align-self-center pt-0">
                      <FormGroup className="align-self-center pt-1">
                        <Input
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="2" md="1" className="align-self-center">
                      <h5>원</h5>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col lg="7" md="12" className="align-self-center pt-0">
                  <Row>
                    <Col lg="5" md="12" className="align-self-center pt-0">
                      <h5 className="text-bold-600">청구액 (공단부담금)</h5>
                    </Col>
                    <Col lg="5" md="11" className="align-self-center pt-0">
                      <FormGroup className="align-self-center pt-1">
                        <Input
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col  lg="1" md="1" className="align-self-center">
                      <h5>원</h5>
                    </Col>
                  </Row>
                </Col>
                <Col lg="5" md="12" >
                  <Row>
                    <Col lg="4" md="12" className="align-self-center pt-0">
                      <h5 className="text-bold-600">감액</h5>
                    </Col>
                    <Col lg="6" md="11" className="align-self-center pt-0">
                      <FormGroup className="align-self-center pt-1">
                        <Input
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="2" md="1" className="align-self-center">
                      <h5>원</h5>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col lg="7" md="12" className="align-self-center pt-0">
                  <Row>
                    <Col lg="5" md="12" className="align-self-center pt-0">
                      <h5 className="text-bold-600">환자 본인부담금</h5>
                    </Col>
                    <Col lg="5" md="11" className="align-self-center pt-0">
                      <FormGroup className="align-self-center pt-1">
                        <Input
                          type="text"
                          value={this.state.paypatient}
                          onChange={e => this.setState({ paypatient: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                    <Col  lg="1" md="1" className="align-self-center">
                      <h5>원</h5>
                    </Col>
                  </Row>
                </Col>
                <Col lg="5" md="12" >
                  <Row>
                    <Col lg="4" md="12" className="align-self-center pt-0">
                      <h5 className="text-bold-600">최종 청구액</h5>
                    </Col>
                    <Col lg="6" md="11" className="align-self-center pt-0">
                      <FormGroup className="align-self-center pt-1">
                        <Input
                          type="text"
                          value={this.state.paypatient}
                          onChange={e => this.setState({ paytotal: e.target.value })}
                          // disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="2" md="1" className="align-self-center">
                      <h5>원</h5>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter className="text-right">
              <Button color="primary" onClick={this.postPayment}>
                전송
              </Button>
            </ModalFooter>
          </Modal>
            <div className="d-flex justify-content-between">
              <div className="mr-1" style={{width:"40%"}}>
                <Card className="mb-1" style={{height:"140px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <b>Personal Information</b>
                  </CardTitle>
                  <CardBody className="d-flex pl-0 pt-0">
                    <div className="col-5">
                      <h6><span className="text-bold-600">이름</span></h6>
                      <h6><span className="text-bold-600">성별</span></h6>
                      <h6><span className="text-bold-600">생년월일</span></h6>
                      <h6><span className="text-bold-600">연락처</span></h6>
                    </div>
                    <div className="col-7">
                      <h6>{this.props.pinfo.F_NAME}</h6>
                      <h6>{this.props.pinfo.GENDER==="1"||this.props.pinfo.GENDER==="3"?"M":"F"}</h6>
                      <h6>{this.props.pinfo.BIRTH_DT}</h6>
                      <h6>{this.props.pinfo.MOBILE_NUM}</h6>
                    </div>
                  </CardBody>
                </Card>
                <Card className="mb-1" style={{height:"240px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <b>Physical Data</b>
                  </CardTitle>
                  <CardBody className="d-flex pl-0 pt-0">
                    <div className="col-4">
                      <h6><span className="text-bold-600">신장/체중</span></h6>
                      <h6><span className="text-bold-600">흡연여부</span></h6>
                      <h6><span className="text-bold-600">음주여부</span></h6>
                      <h6><span className="text-bold-600">본인병력</span></h6>
                      <h6><span className="text-bold-600">가족병력</span></h6>
                      <h6><span className="text-bold-600">복용중인 약</span></h6>
                      <h6><span className="text-bold-600">알러지 유무</span></h6>
                    </div>
                    <div className="col-8">
                      <h6>{this.props.pinfo.HEIGHT_VAL}cm&nbsp;/&nbsp;{this.props.pinfo.WEIGHT_VAL}kg</h6>
                      <h6>{this.props.pinfo.SMOKE_YN==="Y"?"흡연":"비흡연"}</h6>
                      <h6>{this.props.pinfo.DRINK_YN==="Y"?"음주":"금주"}</h6>
                      <h6>{this.props.pinfo.DISEASE_DESC===""? "없음":this.props.pinfo.DISEASE_DESC}</h6>
                      <h6>{this.props.pinfo.FAMILY_DESC===""? "없음":this.props.pinfo.FAMILY_DESC}</h6>
                      <h6>{this.props.pinfo.USE_MED===""? "없음":this.props.pinfo.USE_MED}</h6>
                      <h6>{this.props.pinfo.ALLERGY_YN==="Y"?"있음":"없음"}&nbsp;{this.props.pinfo.ALLERGY_DESC===""?"없음":this.props.pinfo.ALLERGY_DESC}</h6>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div style={{width:"60%"}}>
                <Card className="mb-1" style={{height:"60px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <b>Present Condition</b>
                  </CardTitle>
                  <div className="col-12">
                    <h6>{this.props.appo===null?"":this.props.appo.SYMPTOM}</h6>
                  </div>
                </Card>
                <Card className="mb-1" style={{height:"90px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <b>Files</b>
                  </CardTitle>
                  <CardBody className="mt-0 pt-0">
                    {file_preview}
                  </CardBody>
                </Card>
                <Card className="mb-1" style={{height:"215px"}}>
                  <CardTitle className="px-1 d-flex justify-content-between" style={{paddingTop:"5px"}}>
                    <b>Past Consulting List</b>
                    {/* <Menu onClick={() => this.goPastConsultList(this.props.pinfo.PATIENT_ID)} style={{cursor:"pointer"}}/> */}
                    <img src={dot} onClick={() => this.goPastConsultList(this.props.pinfo.PATIENT_ID)} style={{cursor:"pointer"}}/>
                  </CardTitle>
                  <CardBody className="pl-0 pt-0">
                    <table className="col-12 pt-0 mt-0">
                      <tr>
                        <th className="text-center"><h5 className="text-bold-600">진료과 / 진료의</h5></th>
                        <th className="text-center"><h5 className="text-bold-600">진단명</h5></th>
                        <th className="text-center"><h5 className="text-bold-600">진료일자</h5></th>  
                      </tr>
                      {
                        this.props.cslist.map(row =>
                        ( <Cslist key={row.APPOINT_TIME} row={row}/> )
                        )
                      }
                    </table>
                  </CardBody>
                </Card>
              </div>
            </div>
            
            <Card className="mb-1" style={{height:"224px"}}>
              <CardTitle className="px-1 d-flex justify-content-between" style={{paddingTop:"5px"}}>
                <b>Vital Data</b> 
                {/* <Menu onClick={this.goVitalData} style={{cursor:"pointer"}}/> */}
                <img src={dot} onClick={this.goVitalData} style={{cursor:"pointer"}}/>
              </CardTitle>
              <CardBody className="d-flex pl-0">
                <div className="d-flex col-12 pl-0">
                  {this.props.bpdata.length===0?null:
                    <div className="col-2 pl-0">
                      <ResponsiveContainer>
                        <LineChart
                          className="col-2"
                          width={500}
                          height={300}
                          data={this.props.bpdata}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis tick={{fontSize: 10}} dataKey="CREATE_TIME" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            name="수축기"
                            type="monotone"
                            dataKey="SYS_VAL"
                            stroke="#EA5455"
                          />
                          <Line
                            name="이완기"
                            type="monotone"
                            dataKey="DIA_VAL"
                            stroke="#7367F0"
                            activeDot={{ r: 8 }}
                          /> 
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  }

                  {this.props.pulstdata.length===0?null:
                    <div className="col-2 pl-0">
                      <ResponsiveContainer>
                        <LineChart
                          className="col-2"
                          width={500}
                          height={300}
                          data={this.props.pulstdata}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis tick={{fontSize: 10}} dataKey="CREATE_TIME"/>
                          <YAxis />
                          <Tooltip />
                          <Legend/>
                          <Line
                            name="맥박"
                            type="monotone"
                            dataKey="PULSE_VAL"
                            stroke="#EA5455"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  }

                  {this.props.tempdata.length===0?null:
                    <div className="col-2 pl-0">
                      <ResponsiveContainer>
                        <LineChart
                          className="col-2"
                          width={500}
                          height={300}
                          data={this.props.tempdata}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis tick={{fontSize: 10}} dataKey="CREATE_TIME"/>
                          <YAxis />
                          <Tooltip />
                          <Legend/>
                          <Line
                            name="체온"
                            type="monotone"
                            dataKey="TEMP_VAL"
                            stroke="#EA5455"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  }

                  {this.props.bsdata.length===0?null:
                    <div className="col-2 pl-0">
                      <ResponsiveContainer>
                        <LineChart
                          className="col-2"
                          width={500}
                          height={300}
                          data={this.props.bsdata}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis tick={{fontSize: 10}} dataKey="CREATE_TIME"/>
                          <YAxis />
                          <Tooltip />
                          <Legend/>
                          <Line
                            name="혈당"
                            type="monotone"
                            dataKey="GLUCOSE_VAL"
                            stroke="#EA5455"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  }

                  {this.props.wedata.length===0?null:
                    <div className="col-2 pl-0">
                      <ResponsiveContainer>
                        <LineChart
                          className="col-2"
                          width={500}
                          height={300}
                          data={this.props.wedata}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis tick={{fontSize: 10}} dataKey="CREATE_TIME"/>
                          <YAxis />
                          <Tooltip />
                          <Legend/>
                          <Line
                            name="몸무게"
                            type="monotone"
                            dataKey="WEIGHT_VAL"
                            stroke="#EA5455"
                            activeDot={{ r: 8 }}
                          />
                          <Line
                            name="BMI"
                            type="monotone"
                            dataKey="BMI_VAL"
                            stroke="#7367F0"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  }

                  {this.props.spo2data.length===0?null:
                    <div className="col-2 pl-0">
                      <ResponsiveContainer>
                        <LineChart
                          className="col-2"
                          width={500}
                          height={300}
                          data={this.props.spo2data}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis tick={{fontSize: 10}} dataKey="CREATE_TIME"/>
                          <YAxis />
                          <Tooltip />
                          <Legend/>
                          <Line
                            name="SPO2"
                            type="monotone"
                            dataKey="SPO2_VAL"
                            stroke="#EA5455"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  }
                </div>
              </CardBody>
            </Card>
            <div className="pt-0 mt-0 text-right" style={{width:"100%"}}>
              {/* <Button
                className="mr-1"
                color="primary"
                outline
                type="button"
                onClick={this.Check}
              >
                확인용 버튼
              </Button> */}
              <Button
                className="mr-1"
                color="primary"
                outline
                type="button"
                onClick={this.mdNoteModal}
              >
                MD Note
              </Button>
              <Button
                className="mr-1"
                color="primary"
                outline
                type="button"
                onClick={this.presModal}
              >
                Prescription
              </Button>
              <Button
                className="mr-1"
                color="primary"
                outline
                type="button"
                onClick={this.payModal}
              >
                Payment
              </Button>
              <Button
                className="mr-1"
                color="primary"
                outline
                type="button"
                onClick={this.cookieConsult}
              >
                Save
              </Button>
              <Button
                color="primary"
                outline
                type="button"
                onClick={this.goHome}
              >
                End
              </Button>
            </div>
          </Col>
        </Row>
       
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    dataList: state.dataList,
    appo: state.dataList.appointment,
    pinfo: state.dataList.patient,
    cslist: state.dataList.csdata,
    bpdata: state.dataList.BP,
    pulstdata: state.dataList.PULSE,
    tempdata: state.dataList.TEMP,
    bsdata : state.dataList.BS,
    wedata : state.dataList.WE,
    spo2data : state.dataList.SPO2,
    concookie : state.cookies.consult,
    rtime: state.dataList.rtime,
    pharmacy: state.dataList.pharmacy
  }
}

export default connect(
  mapStateToProps, {
    mPCL, 
    resetVitalData,
    postMDNoteData,
    postPrescriptionData,
    postPayData,
    putStateComplete,
    saveCookieConsult}) (ConsultingRoom)
