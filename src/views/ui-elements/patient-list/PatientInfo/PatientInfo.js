import React from "react"
import {
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
  ModalFooter,
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
  resetVitalData,
  goPCL
} from "../../../../redux/actions/data-list/"
import { history } from "../../../../history"
import "../../../../assets/scss/pages/authentication.scss"
import {connect} from "react-redux"
import { Fragment } from "react"
import previmg from "../../../../assets/img/dashboard/ID13_11_file.png"
import { Menu } from "react-feather"
import "../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import "../../../../assets/scss/plugins/extensions/recharts.scss"
import {gettokbox} from "../../../../redux/actions/data-list/"
import ncall from "../../../../assets/img/dashboard/ID13_11_method_call1.png"
import call from "../../../../assets/img/dashboard/ID13_11_method_call2.png"
import nvideo from "../../../../assets/img/dashboard/ID13_11_method_video1.png"
import video from "../../../../assets/img/dashboard/ID13_11_method_video2.png"
import pressure_1 from "../../../../assets/img/dashboard/ID12_08_vital_pressure1.png"
import pressure_2 from "../../../../assets/img/dashboard/ID12_08_vital_pressure2.png"
import pressure_3 from "../../../../assets/img/dashboard/ID12_08_vital_pressure3.png"
import pressure_4 from "../../../../assets/img/dashboard/ID12_08_vital_pressure4.png"
import pressure_5 from "../../../../assets/img/dashboard/ID12_08_vital_pressure5.png"
import pulse_1 from "../../../../assets/img/dashboard/ID12_08_vital_pulse1.png"
import pulse_2 from "../../../../assets/img/dashboard/ID12_08_vital_pulse2.png"
import pulse_3 from "../../../../assets/img/dashboard/ID12_08_vital_pulse3.png"
import pulse_4 from "../../../../assets/img/dashboard/ID12_08_vital_pulse4.png"
import pulse_5 from "../../../../assets/img/dashboard/ID12_08_vital_pulse5.png"
import weight_1 from "../../../../assets/img/dashboard/ID12_08_vital_weight1.png"
import weight_2 from "../../../../assets/img/dashboard/ID12_08_vital_weight2.png"
import weight_3 from "../../../../assets/img/dashboard/ID12_08_vital_weight3.png"
import weight_4 from "../../../../assets/img/dashboard/ID12_08_vital_weight4.png"
import weight_5 from "../../../../assets/img/dashboard/ID12_08_vital_weight5.png"
import glucose_1 from "../../../../assets/img/dashboard/ID12_08_vital_glucose1.png"
import glucose_2 from "../../../../assets/img/dashboard/ID12_08_vital_glucose2.png"
import glucose_3 from "../../../../assets/img/dashboard/ID12_08_vital_glucose3.png"
import glucose_4 from "../../../../assets/img/dashboard/ID12_08_vital_glucose4.png"
import glucose_5 from "../../../../assets/img/dashboard/ID12_08_vital_glucose5.png"
import temperature_1 from "../../../../assets/img/dashboard/ID12_08_vital_temperature1.png"
import temperature_2 from "../../../../assets/img/dashboard/ID12_08_vital_temperature2.png"
import temperature_3 from "../../../../assets/img/dashboard/ID12_08_vital_temperature3.png"
import temperature_4 from "../../../../assets/img/dashboard/ID12_08_vital_temperature4.png"
import temperature_5 from "../../../../assets/img/dashboard/ID12_08_vital_temperature5.png"
import spo2_1 from "../../../../assets/img/dashboard/ID12_08_vital_spo2 1.png"
import spo2_2 from "../../../../assets/img/dashboard/ID12_08_vital_spo2 2.png"
import spo2_3 from "../../../../assets/img/dashboard/ID12_08_vital_spo2 3.png"
import spo2_4 from "../../../../assets/img/dashboard/ID12_08_vital_spo2 4.png"
import spo2_5 from "../../../../assets/img/dashboard/ID12_08_vital_spo2 5.png"











class CunsultName extends React.Component { 
  render() { 
    return( 
    <h6>
      {this.props.row.PART_NAME}/{this.props.row.F_NAME}
    </h6>
    ); 
  } 
}

class NoteCC extends React.Component { 
  render() { 
    return( 
    <h6>
      {this.props.row.NOTE_CC}
    </h6>
    ); 
  } 
}

class AppointTime extends React.Component { 
  render() { 
    return( 
    <h6>
      {this.props.row.APPOINT_TIME.substring(0,10)}
    </h6>
    ); 
  } 
}


class PatientInfo extends React.Component {
  
  state = {
    viewfilemodal: false
  }

  viewFileModal = () => {
    this.setState(prevState => ({
      viewfilemodal: !prevState.viewfilemodal
    }))
  }

  componentDidMount() {
    console.log(this.props.user)
    console.log(this.props.dataList)
    console.log("환자 개인정보:", this.props.pinfo)
  }

  goCallSetting = e => {
    e.preventDefault()
    this.props.gettokbox(this.props.user.login.values.loggedInUser.username, this.props.appo.APPOINT_NUM)
    history.push("/pages/consultingroom")
  }

  goPhoneConsult= e => {
    e.preventDefault() 
    history.push("/pages/phoneconsulting")
  }

  goPastConsultList(pid) {
    this.props.goPCL(pid)
  }

  goVitalData = e => {
    e.preventDefault()
    this.props.resetVitalData()
    history.push("/vitaldata")
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
        {/* 환자정보, 버튼 모음 Row */}
        {this.props.appo===null?null:
          <Row>
            <Col className="col-12">
              <Table responsive>
                <thead >
                  <tr className="table-primary align-self-center">
                    <th><h6 style={{paddingTop:"0.5rem"}}>{this.props.appo.APPOINT_TIME}</h6></th>
                    <th><h6 style={{paddingTop:"0.5rem"}}>{this.props.pinfo.F_NAME}</h6></th>
                    <th><h6 style={{paddingTop:"0.5rem"}}>{this.props.pinfo.GENDER==="1"||this.props.pinfo.GENDER==="3"?"M":"F"}</h6></th>
                    <th><h6 style={{paddingTop:"0.5rem"}}>{this.props.pinfo.AGE}</h6></th>
                    <th><h6 style={{paddingTop:"0.5rem"}}>{this.props.pinfo.BIRTH_DT}</h6></th>
                    <th><h6 style={{paddingTop:"0.5rem"}}>{this.props.pinfo.NOTE_DX}</h6></th>
                    <th><h6 style={{paddingTop:"0.5rem"}}>{this.props.pinfo.FIRST_YN==="N"?"재진":"초진"}</h6></th>
                    <th className="text-center"> 
                      <h6>
                        {
                          this.props.pinfo.BP==="00"?<img src={pressure_2} width="30px" alt="pressure_2"/>:
                          this.props.pinfo.BP==="01"?<img src={pressure_1} width="30px" alt="pressure_1"/>:
                          this.props.pinfo.BP==="02"?<img src={pressure_5} width="30px" alt="pressure_5"/>:
                          this.props.pinfo.BP==="03"?<img src={pressure_4} width="30px" alt="pressure_4"/>:
                          this.props.pinfo.BP==="04"?<img src={pressure_3} width="30px" alt="pressure_3"/>:
                          null 
                        }
                        {
                          this.props.pinfo.PULSE==="00"?<img src={pulse_2} width="30px"  alt="pulse_2"/>:
                          this.props.pinfo.PULSE==="01"?<img src={pulse_1} width="30px"  alt="pulse_1"/>:
                          this.props.pinfo.PULSE==="02"?<img src={pulse_5} width="30px"  alt="pulse_5"/>:
                          this.props.pinfo.PULSE==="03"?<img src={pulse_4} width="30px"  alt="pulse_4"/>:
                          this.props.pinfo.PULSE==="04"?<img src={pulse_3} width="30px"  alt="pulse_3"/>:
                          null 
                        }
                        {
                          this.props.pinfo.BW==="00"?<img src={weight_2} width="30px" alt="weight_2"/>:
                          this.props.pinfo.BW==="01"?<img src={weight_1} width="30px" alt="weight_1"/>:
                          this.props.pinfo.BW==="02"?<img src={weight_5} width="30px" alt="weight_5"/>:
                          this.props.pinfo.BW==="03"?<img src={weight_4} width="30px" alt="weight_4"/>:
                          this.props.pinfo.BW==="04"?<img src={weight_3} width="30px" alt="weight_3"/>:
                          null
                        }
                        {
                          this.props.pinfo.BS==="00"?<img src={glucose_2} width="30px" alt="glucose_2"/>:
                          this.props.pinfo.BS==="01"?<img src={glucose_1} width="30px" alt="glucose_1"/>:
                          this.props.pinfo.BS==="02"?<img src={glucose_5} width="30px" alt="glucose_5"/>:
                          this.props.pinfo.BS==="03"?<img src={glucose_4} width="30px" alt="glucose_4"/>:
                          this.props.pinfo.BS==="04"?<img src={glucose_3} width="30px" alt="glucose_3"/>:
                          null 
                        }
                        {
                          this.props.pinfo.TEMPERATURE==="00"?<img src={temperature_2} width="30px" alt="temperature_2"/>:
                          this.props.pinfo.TEMPERATURE==="01"?<img src={temperature_1} width="30px" alt="temperature_1"/>:
                          this.props.pinfo.TEMPERATURE==="02"?<img src={temperature_5} width="30px" alt="temperature_5"/>:
                          this.props.pinfo.TEMPERATURE==="03"?<img src={temperature_4} width="30px" alt="temperature_4"/>:
                          this.props.pinfo.TEMPERATURE==="04"?<img src={temperature_3} width="30px" alt="temperature_3"/>:
                          null
                        }
                        {
                          this.props.pinfo.SPO2==="00"?<img src={spo2_2} width="30px" alt="spo2_2"/>:
                          this.props.pinfo.SPO2==="01"?<img src={spo2_1} width="30px" alt="spo2_1"/>:
                          this.props.pinfo.SPO2==="02"?<img src={spo2_5} width="30px" alt="spo2_5"/>:
                          this.props.pinfo.SPO2==="03"?<img src={spo2_4} width="30px" alt="spo2_4"/>:
                          this.props.pinfo.SPO2==="04"?<img src={spo2_3} width="30px" alt="spo2_3"/>:
                          null
                        }
                      </h6>
                    </th>
                    {this.props.appo.APPOINT_KIND==="1"?
                      <th>
                        <img onClick={this.goPhoneConsult}  src={call} alt="call" style={{cursor:"pointer"}}/>
                        <img src={nvideo} alt="nvideo" />
                      </th>
                      :
                      <th className="text-right">
                        <img src={ncall} alt="call" className="mr-1"/>
                        <img onClick={this.goCallSetting} src={video} alt="video" style={{cursor:"pointer"}} />
                      </th>
                    }
                  </tr>
                </thead>
              </Table>
            </Col>   
          </Row>
        }
        <Row className="mt-0">
          <Col className="col-4"> 
            <Card className="mb-1" style={{height:"350px", border:"solid silver 1px"}}>
              <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                <h5><b>Personal Information</b></h5>
              </CardTitle>
              <CardBody className="d-flex pl-0">
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
                  <h6>{this.props.pinfo.MOBILE_NUM.substring(0,3)+"-"+this.props.pinfo.MOBILE_NUM.substring(3,7)+"-"+this.props.pinfo.MOBILE_NUM.substring(7,11)}</h6>
                </div>
              </CardBody>
            </Card>
            <Card className="mb-1" style={{height:"350px", border:"solid silver 1px"}}>
              <CardTitle className="px-1 d-flex justify-content-between" style={{paddingTop:"5px"}}>
                <h5><b>Past Consulting List</b></h5><Menu onClick={() => this.goPastConsultList(this.props.pinfo.PATIENT_ID)} style={{cursor:"pointer"}}/>
              </CardTitle>
              <CardBody className="d-flex pl-0">
                <div className="col-4 text-center">
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
          </Col>
          <Col className="col-8">
            <div className="d-flex justify-content-between">
              <div className="mr-1" style={{width:"50%"}}>
                <Card className="mb-1"  style={{height:"350px", border:"solid silver 1px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <h5><b>Physical Data</b></h5>
                  </CardTitle>
                  <CardBody className="d-flex pl-0">
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
                      <h6>{this.props.pinfo.DRINK_YN==="Y"?"자주":"가끔"}</h6>
                      <h6>{this.props.pinfo.DISEASE_DESC}</h6>
                      <h6>{this.props.pinfo.FAMILY_DESC}</h6>
                      <h6>{this.props.pinfo.USE_MED}</h6>
                      <h6>{this.props.pinfo.ALLERGY_YN==="Y"?"있음":"없음"}&nbsp;{this.props.pinfo.ALLERGY_DESC}</h6>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div style={{width:"50%"}}>
                <Card className="mb-1" style={{height:"169px", border:"solid silver 1px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <h5><b>Present Condition</b></h5>
                  </CardTitle>
                  <CardBody className="d-flex pl-0">
                    <div className="col-12">
                      <h6>{this.props.appo===null?"":this.props.appo.SYMPTOM}</h6>
                    </div>
                  </CardBody>

                </Card>
                <Card className="mb-1" style={{height:"169px", border:"solid silver 1px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <h5><b>Files</b></h5>
                  </CardTitle>
                  <CardBody>
                    {file_preview}
                  </CardBody>
                </Card>
              </div>
            </div>
            
            <Card className="mb-1" style={{height:"350px", border:"solid silver 1px"}}>
              <CardTitle className="px-1 d-flex justify-content-between" style={{paddingTop:"5px"}}>
                <h5><b>Vital Data</b></h5> <Menu onClick={this.goVitalData} style={{cursor:"pointer"}}/>
              </CardTitle>
              <CardBody className="d-flex pl-0">
                <div className="d-flex col-12 pl-0">
                  {this.props.bpdata.length===0?null:
                    <div className="col-2 pl-0">
                      <Row className="justify-content-center"><h6>혈압</h6></Row>
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
                      <Row className="justify-content-center"><h6>맥박</h6></Row>
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

                  {this.props.wedata.length===0?null:
                    <div className="col-2 pl-0">
                      <Row className="justify-content-center"><h6>체중</h6></Row>
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

                  {this.props.bsdata.length===0?null:
                    <div className="col-2 pl-0">
                      <Row className="justify-content-center"><h6>혈당</h6></Row>
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
                  {this.props.tempdata.length===0?null:
                    <div className="col-2 pl-0">
                      <Row className="justify-content-center"><h6>체온</h6></Row>
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

                  {this.props.spo2data.length===0?null:
                    <div className="col-2 pl-0">
                      <Row className="justify-content-center"><h6>산소포화도</h6></Row>
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

export default connect(mapStateToProps, {goPCL, resetVitalData, gettokbox}) (PatientInfo)
