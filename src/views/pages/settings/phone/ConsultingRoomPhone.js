import React from "react"
import {
  FormGroup,
  InputGroup,
  Input,
  CustomInput,
  Button,
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
  goPCL,
  resetVitalData,
  postMDNoteData,
  postPrescriptionData,
  postPayData
} from "../../../../redux/actions/data-list"
import { Check } from "react-feather"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { history } from "../../../../history"
import "../../../../assets/scss/pages/authentication.scss"
import {connect} from "react-redux"
import { Fragment } from "react"
import previmg from "../../../../assets/img/dashboard/ID13_11_file.png"
import { Menu } from "react-feather"
import "../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import "../../../../assets/scss/plugins/extensions/recharts.scss"
import moment from "moment"





class CunsultName extends React.Component { 
  render() { 
    return( 
    <h5>
      {this.props.row.PART_NAME}/{this.props.row.F_NAME}
    </h5>
    ); 
  } 
}

class NoteCC extends React.Component { 
  render() { 
    return( 
    <h5>
      {this.props.row.NOTE_CC}
    </h5>
    ); 
  } 
}

class AppointTime extends React.Component { 
  render() { 
    return( 
    <h5>
      {this.props.row.APPOINT_TIME.substring(0,10)}
    </h5>
    ); 
  } 
}


class PatientInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cc: "",
      diagnosis: "",
      txrx: "",
      recommendation: "",
      pcode: "",
      pname: "",
      paddress: "",
      telnum: "", 
      faxnum: "",
      filename: "",
      file : "",
      paypatient:"",
      paytotal:"",
      mdnotemodal: false,
      presmodal: false,
      paymodal: false,
      pharmacy: false,
      App: false,
      viewfilemodal: false
      
    }
    this.state = { time: {},   seconds: 900 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });

  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
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
    if (seconds == 0) { 
      clearInterval(this.timer);
    }
  }

  viewFileModal = () => {
    this.setState(prevState => ({
      viewfilemodal: !prevState.viewfilemodal
    }))
  }


  goPastConsultList(pid) {
    this.props.goPCL(pid)
  }

  goVitalData = e => {
    e.preventDefault()
    this.props.resetVitalData()
    history.push("/vitaldata")
  }

  startconsult = e => {
    e.preventDefault()
    alert("전화진료를 시작합니다.")
  }

  mdNoteModal = () => {
    this.setState(prevState => ({
      mdnotemodal: !prevState.mdnotemodal
    }))
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
    if(this.props.appo===undefined){
      alert("예약정보가 없기때문에 처방전 저장이 불가능합니다.")
    } else{
      this.props.postPrescriptionData(
      this.props.user.login.values.loggedInUser.username,
      this.props.appo.APPOINT_NUM,
      this.state.file,
      this.state.filename
      )
    }
    this.setState(prevState => ({
      presmodal: !prevState.presmodal
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

  postPayment = () => {
    if(this.props.appo===undefined){
      alert("예약정보가 없기때문에 결제금액 입력이 불가합니다.")
    } else{
      this.props.postPayData(
      this.props.user.login.values.loggedInUser.username,
      this.props.appo.APPOINT_NUM,
      this.state.paypatient,
      this.state.paytotal
      )
    }
    this.setState(prevState => ({
      paymodal: !prevState.paymodal
    }))
  }
 
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
          width="70px"
          height="70px" 
          src={"http://203.251.135.81:9300"+this.props.appo.FILE_PATH
          +this.props.appo.FILE_NAME}
          className="dz-img"
          alt=""
          style={{cursor:"pointer"}} 
          onClick={this.viewFileModal}
        />
    }
       

    return (
      <Fragment>
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
                src={"http://203.251.135.81:9300"+this.props.appo.FILE_PATH
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
          isOpen={this.state.mdnotemodal}
          toggle={this.mdNoteModal}
          className="modal-dialog-centered modal-lg"
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
          isOpen={this.state.presmodal}
          toggle={this.presModal}
          className="modal-dialog-centered modal-lg"
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
                  <h5>{this.state.pname}</h5>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col lg="3" md="12" className="align-self-center pt-0">
                <h5 className="text-bold-600">약국 주소</h5>
              </Col>
              <Col lg="9" md="12" >
                  <h5>{this.state.paddress}</h5>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col lg="3" md="12" className="align-self-center pt-0">
                <h5 className="text-bold-600">Fax</h5>
              </Col>
              <Col lg="9" md="12" >
                  <h5>{this.state.faxnum}</h5>
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
                        value={this.state.cc}
                        onChange={e => this.setState({ cc: e.target.value })}
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
                        value={this.state.cc}
                        onChange={e => this.setState({ cc: e.target.value })}
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
                        value={this.state.cc}
                        onChange={e => this.setState({ cc: e.target.value })}
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
                        value={this.state.cc}
                        onChange={e => this.setState({ cc: e.target.value })}
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
                        value={this.state.paytotal}
                        onChange={e => this.setState({ paytotal: e.target.value })}
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
        <Row className="d-flex justify-content-between mb-0">
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
          <Col lg="6" md="12" className="d-flex text-right">
          
            <Col className="mx-5 text-left" style={{border:"1px solid #B8B8C2", borderRadius: "5px"}}>
            {this.props.appo===undefined||this.props.appo.APPOINT_KIND==="2"
              ?null:moment.duration(this.props.appo.APPOINT_TIME.diff(moment())).minutes()<16 && moment.duration(this.props.appo.APPOINT_TIME.diff(moment())).minutes()>0?
                <h4 className="text-primary" style={{marginTop:"0.5rem"}}>
                  진료 시작까지&nbsp; 
                    {moment.duration(this.props.appo.APPOINT_TIME.diff(moment())).minutes()}
                  분 남았습니다.
                </h4>
              : null}
            </Col>
            
            <Button
              className="mr-1"
              color="black"
              outline
              type="button"
              onClick={this.startTimer}>
              진료시작
            </Button>

            <Button
              color="black"
              outline
              type="button">
              {this.state.time.m} : {this.state.time.s}
            </Button>
          </Col>
        </Row>
        <Row className="mt-1">
          <Col className="col-4"> 
            <Card className="mb-1" style={{height:"300px", border:"solid silver 1px"}}>
              <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                <b>Personal Information</b>
              </CardTitle>
              <CardBody className="d-flex pl-0">
                <div className="col-4">
                  <h5><span className="text-bold-600">이름</span></h5>
                  <h5><span className="text-bold-600">성별</span></h5>
                  <h5><span className="text-bold-600">생년월일</span></h5>
                  <h5><span className="text-bold-600">연락처</span></h5>
                </div>
                <div className="col-8">
                  <h5>{this.props.pinfo.F_NAME}</h5>
                  <h5>{this.props.pinfo.GENDER==="1"||this.props.pinfo.GENDER==="3"?"M":"F"}</h5>
                  <h5>{this.props.pinfo.BIRTH_DT}</h5>
                  <h5>{this.props.pinfo.MOBILE_NUM}</h5>
                </div>
              </CardBody>
            </Card>
            <Card className="mb-1" style={{height:"350px", border:"solid silver 1px"}}>
              <CardTitle className="px-1 d-flex justify-content-between" style={{paddingTop:"5px"}}>
                <b>Past Consulting List</b><Menu onClick={() => this.goPastConsultList(this.props.pinfo.PATIENT_ID)} style={{cursor:"pointer"}}/>
              </CardTitle>
              <CardBody className="d-flex pl-0">
                <div className="col-4 text-center">
                  <h5><span className="text-bold-600">진료과 / 진료의</span></h5>

                    {
                      this.props.cslist.map(row =>
                        (<CunsultName key={row.APPOINT_TIME} row={row}/>)
                      )
                    }

                </div>
                <div className="col-4 text-center">
                  <h5><span className="text-bold-600">진단명</span></h5>

                    {
                      this.props.cslist.map(row =>
                        (<NoteCC key={row.APPOINT_TIME} row={row}/>)
                      )
                    }

                </div>
                <div className="col-4 text-center">
                  <h5><span className="text-bold-600">진료일자</span></h5>

                    {
                      this.props.cslist.map(row =>
                        (<AppointTime key={row.APPOINT_TIME} row={row}/>)
                      )
                    }

                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="col-8">
            <div className="d-flex justify-content-between">
              <div className="mr-1" style={{width:"50%"}}>
                <Card className="mb-1"  style={{height:"300px", border:"solid silver 1px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <b>Physical Data</b>
                  </CardTitle>
                  <CardBody className="d-flex pl-0">
                    <div className="col-4">
                      <h5><span className="text-bold-600">신장/체중</span></h5>
                      <h5><span className="text-bold-600">흡연여부</span></h5>
                      <h5><span className="text-bold-600">음주여부</span></h5>
                      <h5><span className="text-bold-600">본인병력</span></h5>
                      <h5><span className="text-bold-600">가족병력</span></h5>
                      <h5><span className="text-bold-600">복용중인 약</span></h5>
                      <h5><span className="text-bold-600">알러지 유무</span></h5>
                    </div>
                    <div className="col-8">
                      <h5>{this.props.pinfo.HEIGHT_VAL}cm&nbsp;/&nbsp;{this.props.pinfo.WEIGHT_VAL}kg</h5>
                      <h5>{this.props.pinfo.SMOKE_YN==="Y"?"흡연":"비흡연"}</h5>
                      <h5>{this.props.pinfo.DRINK_YN==="Y"?"음주":"금주"}</h5>
                      <h5>{this.props.pinfo.DISEASE_DESC}</h5>
                      <h5>{this.props.pinfo.FAMILY_DESC}</h5>
                      <h5>{this.props.pinfo.USE_MED}</h5>
                      <h5>{this.props.pinfo.ALLERGY_YN==="Y"?"있음":"없음"}&nbsp;{this.props.pinfo.ALLERGY_DESC}</h5>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div style={{width:"50%"}}>
                <Card className="mb-1" style={{height:"144px", border:"solid silver 1px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <b>Present Condition</b>
                  </CardTitle>
                  <CardBody className="d-flex pl-0">
                    <div className="col-12">
                      <h5>{this.props.appo===null?"":this.props.appo.SYMPTOM}</h5>
                      
                    </div>
                  </CardBody>

                </Card>
                <Card className="mb-1" style={{height:"144px", border:"solid silver 1px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <b>Files</b>
                  </CardTitle>
                  <CardBody>
                    {file_preview}
                  </CardBody>
                </Card>
              </div>
            </div>
            
            <Card className="mb-1" style={{height:"350px", border:"solid silver 1px"}}>
              <CardTitle className="px-1 d-flex justify-content-between" style={{paddingTop:"5px"}}>
                <b>Vital Data</b> <Menu onClick={this.goVitalData} style={{cursor:"pointer"}}/>
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
              >
                Save
              </Button>
              <Button
                color="primary"
                outline
                type="button"
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
    spo2data : state.dataList.SPO2

  }
}

export default connect(mapStateToProps, {goPCL, resetVitalData,  postMDNoteData, postPayData,
  postPrescriptionData}) (PatientInfo)