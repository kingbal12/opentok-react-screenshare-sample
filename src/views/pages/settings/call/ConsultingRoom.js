import React from "react"
import {Form, FormGroup, Button,
  InputGroup, InputGroupAddon,Input,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Table,
  Label,
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
  getPastConulstList,
  resetVitalData,
  postMDNoteData
} from "../../../../redux/actions/data-list/"
import { Check } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import "../../../../assets/scss/pages/authentication.scss"
import {connect} from "react-redux"
import userImg from "../../../../assets/img/portrait/small/avatar-s-11.jpg"
import SliderBasic from "./SliderBasic"
import { ContextLayout } from "../../../../utility/context/Layout"
import { Fragment } from "react"
import { OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } from 'opentok-react';
import {Helmet} from "react-helmet";
import { Menu } from "react-feather"
import axios from "axios"
import "../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import "../../../../assets/scss/plugins/extensions/recharts.scss"

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

class ConsultingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      streams: [],
      cc: "",
      diagnosis: "",
      txrx: "",
      recommendation: "",
      mdnotemodal: false
    
    }
    
  }


  componentDidMount() {
    console.log(this.props.pinfo)
    axios
      .get("http://203.251.135.81:9300/v1/doctor/treatment/patient-pharmacy", {
        params: {
          patient_id: this.props.pinfo.PATIENT_ID
        }
      })
      .then(response => {


        if(response.data.status==="200") {
          console.log(response.data.data)
          // myinfo = response.data.data
          // console.log("나의 정보: ",myinfo)
          // if(myinfo.GENDER==='1' || myinfo.GENDER==='3') {
          //   this.setState({gender: "M"})
          // } else if(myinfo.GENDER==='2' || myinfo.GENDER==='4'){
          //   this.setState({gender: "F"})
          // } else{
          //   this.setState({gender: "성별정보가 저장되어있지 않습니다."})
          // }
          // this.setState({
          //   name: myinfo.F_NAME,
          //   medicalpart: myinfo.MEDICAL_PART,
          //   medicalable: myinfo.MEDICAL_ABLE,
          //   medicaldesc: myinfo.MEDICAL_DESC,
          //   medicalnum: myinfo.MEDICAL_NUM,
          //   userdesc: myinfo.USER_DESC
          // })
        } else {
          alert("고객정보를 불러오지 못하였습니다.")
        }
      })
  }

  goPastConsultList(pid) {
    this.props.getPastConulstList(pid)
  }

  goVitalData = e => {
    e.preventDefault()
    this.props.resetVitalData()
    history.push("/vitaldata")
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
 

  // call = e => {
  //   e.preventDefault()
  //   this.sessionHelper = createSession({
    
  //   api_key: "47274054",
  //   session_id: "2_MX40NzI3NDA1NH5-MTYyNjA2NzI0ODM1Mn56aTZQdnVxVnNaNS82a2Q3YWZndmplc3V-UH4",
  //   tokens: "T1==cGFydG5lcl9pZD00NzI3NDA1NCZzaWc9M2E4ZDA3ODFiMjk4ZTg5M2M4NGY3ZjU2YWIwNDQ2ZmJlZTIzM2JjMDpzZXNzaW9uX2lkPTJfTVg0ME56STNOREExTkg1LU1UWXlOakEyTnpJME9ETTFNbjU2YVRaUWRuVnhWbk5hTlM4MmEyUTNZV1puZG1wbGMzVi1VSDQmY3JlYXRlX3RpbWU9MTYyNjA2NzI0NiZub25jZT0xMTI5ODg0NDUwJnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2MjYxNTM2NDY=",
  //   onStreamsUpdated: streams => { this.setState({ streams }); }
  //   });
  // }
 
  render() {
    return (
      <Fragment>
        {/* 주소찾기 Modal창 */}
       
        {/* 환자정보, 버튼 모음 Row */}
        <Row className="d-flex justify-content-between mb-0">
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
              color="primary"
              outline
              type="button">
              남은시간
            </Button>
            <Button
              className="mr-1"
              color="primary"
              outline
              type="button">
              화면공유
            </Button>
            <Button
              className="mr-1"
              color="primary"
              outline
              type="button">
              화면녹화
            </Button>
            <Button
              color="primary"
              outline
              type="button">
              설정
            </Button>
          </Col>
        </Row>

        {/* 화상통화, 생체데이터, 등등 */}
        <Row>
          <Col lg="6" md="12"> 
            <Card className="mb-0" style={{height:"650px", border:"solid #7367ef 1px", backgroundColor:"#efefff"}}>
              <Row className="justify-content-md-center h-400">
              {/* <OTSession apiKey="47274054" sessionId="2_MX40NzI3NDA1NH5-MTYyNjA2NzI0ODM1Mn56aTZQdnVxVnNaNS82a2Q3YWZndmplc3V-UH4" token= "T1==cGFydG5lcl9pZD00NzI3NDA1NCZzaWc9M2E4ZDA3ODFiMjk4ZTg5M2M4NGY3ZjU2YWIwNDQ2ZmJlZTIzM2JjMDpzZXNzaW9uX2lkPTJfTVg0ME56STNOREExTkg1LU1UWXlOakEyTnpJME9ETTFNbjU2YVRaUWRuVnhWbk5hTlM4MmEyUTNZV1puZG1wbGMzVi1VSDQmY3JlYXRlX3RpbWU9MTYyNjA2NzI0NiZub25jZT0xMTI5ODg0NDUwJnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2MjYxNTM2NDY=">
                <OTPublisher />
                <OTStreams>
                  <OTSubscriber />
                </OTStreams>
              </OTSession> */}
                {/* <div className="dz-thumb ">
                  <div className="dz-thumb-inner">
                    <img 
                      src={userImg}
                      className="dz-img" 
                      // alt={file.name} 
                      />
                  </div>
                </div> */}
              </Row>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Modal
              isOpen={this.state.mdnotemodal}
              toggle={this.mdNoteModal}
              className="modal-dialog-centered modal-lg"
            >
              <ModalHeader toggle={this.mdNoteModal}>
                MD Note
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
            <div className="d-flex justify-content-between">
              <div className="mr-1" style={{width:"50%"}}>
                <Card className="mb-1" style={{height:"125px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <b>Personal Information</b>
                  </CardTitle>
                  <CardBody className="d-flex pl-0 pt-0">
                    <div className="col-4">
                      <h6><span className="text-bold-600">이름</span></h6>
                      <h6><span className="text-bold-600">성별</span></h6>
                      <h6><span className="text-bold-600">생년월일</span></h6>
                      <h6><span className="text-bold-600">연락처</span></h6>
                    </div>
                    <div className="col-8">
                      <h6>{this.props.pinfo.F_NAME}</h6>
                      <h6>{this.props.pinfo.GENDER==="1"||this.props.pinfo.GENDER==="3"?"M":"F"}</h6>
                      <h6>{this.props.pinfo.BIRTH_DT}</h6>
                      <h6>{this.props.pinfo.MOBILE_NUM}</h6>
                    </div>
                  </CardBody>
                </Card>
                <Card className="mb-1" style={{height:"225px"}}>
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
                      <h6>{this.props.pinfo.DISEASE_DESC}</h6>
                      <h6>{this.props.pinfo.FAMILY_DESC}</h6>
                      <h6>{this.props.pinfo.USE_MED}</h6>
                      <h6>{this.props.pinfo.ALLERGY_YN==="Y"?"있음":"없음"}&nbsp;{this.props.pinfo.ALLERGY_DESC}</h6>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div style={{width:"50%"}}>
                <Card className="mb-1" style={{height:"125px"}}>
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

                </Card>
                <Card className="mb-1" style={{height:"120px"}}>
                  <CardTitle className="px-1 d-flex justify-content-between" style={{paddingTop:"5px"}}>
                    <b>Past Consulting List</b><Menu onClick={() => this.goPastConsultList(this.props.pinfo.PATIENT_ID)} style={{cursor:"pointer"}}/>
                  </CardTitle>
                  <CardBody className="d-flex pl-0 pt-0">
                    <div className="col-4 text-center pt-0">
                      <h6><span className="text-bold-600">진료과/진료의</span></h6>

                        {
                          this.props.cslist.map(row =>
                            (<CunsultName key={row.APPOINT_TIME} row={row}/>)
                          )
                        }

                    </div>
                    <div className="col-4 text-center">
                      <h6><span className="text-bold-600">진단명</span></h6>

                        {
                          this.props.cslist.map(row =>
                            (<NoteCC key={row.APPOINT_TIME} row={row}/>)
                          )
                        }

                    </div>
                    <div className="col-4 text-center">
                      <h6><span className="text-bold-600">진료일자</span></h6>

                        {
                          this.props.cslist.map(row =>
                            (<AppointTime key={row.APPOINT_TIME} row={row}/>)
                          )
                        }

                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
            
            <Card className="mb-1" style={{height:"224px"}}>
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
                onClick={this.call}
              >
                test call
              </Button>
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
              >
                Prescription
              </Button>
              <Button
                className="mr-1"
                color="primary"
                outline
                type="button"
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

export default connect(
  mapStateToProps, {
    getPastConulstList, 
    resetVitalData,
    postMDNoteData}) (ConsultingRoom)
