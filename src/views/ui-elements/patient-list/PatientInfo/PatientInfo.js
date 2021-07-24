import React from "react"
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  Row,
  Col,
  Table
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
import { Phone, Video } from "react-feather"
import { history } from "../../../../history"
import "../../../../assets/scss/pages/authentication.scss"
import {connect} from "react-redux"
import { Fragment } from "react"
import previmg from "../../../../assets/img/portrait/small/Sample_User_Icon.png"
import { Menu } from "react-feather"
import "../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import "../../../../assets/scss/plugins/extensions/recharts.scss"
import {gettokbox} from "../../../../redux/actions/data-list/"
import ncall from "../../../../assets/img/dashboard/ID13_11_method_call1.png"
import call from "../../../../assets/img/dashboard/ID13_11_method_call2.png"
import nvideo from "../../../../assets/img/dashboard/ID13_11_method_video1.png"
import video from "../../../../assets/img/dashboard/ID13_11_method_video2.png"





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
  
  state = {
    value: 20
  }
  componentDidMount() {
    console.log(this.props.user)
    console.log(this.props.dataList)
    console.log("환자 개인정보:", this.props.pinfo)
  }

  goCallSetting = e => {
    e.preventDefault() 
    history.push("/pages/callsetting")
    this.props.gettokbox(this.props.user.login.values.loggedInUser.username, this.props.appo.APPOINT_NUM)
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
          width="100px"
          height="100px" 
          src={previmg}
          className="dz-img"
          style={{borderRadius:"100%"}} 
          alt="" 
          />
      :file_preview = 
        <img
          width="100px"
          height="100px" 
          src={"http://203.251.135.81:9300"+this.props.appo.FILE_PATH
          +this.props.appo.FILE_NAME}
          className="dz-img"
          style={{borderRadius:"100%"}} 
          alt="" 
        />
    }
       

    return (
      
      <Fragment>
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
                    <th>
                      <h6 style={{paddingTop:"0.5rem"}}>
                        {this.props.pinfo.BP}
                        {this.props.pinfo.PULSE}
                        {this.props.pinfo.BW}
                        {this.props.pinfo.BS}
                        {this.props.pinfo.TEMPERATURE}
                        {this.props.pinfo.SPO2}
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
                  <h5><span className="text-bold-600">진료과/진료의</span></h5>

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
                <Card className="mb-1"  style={{height:"350px", border:"solid silver 1px"}}>
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
                <Card className="mb-1" style={{height:"169px", border:"solid silver 1px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <b>Present Condition</b>
                  </CardTitle>
                  <CardBody className="d-flex pl-0">
                    <div className="col-12">
                      <h5>{this.props.appo===null?"":this.props.appo.SYMPTOM}</h5>
                    </div>
                  </CardBody>

                </Card>
                <Card className="mb-1" style={{height:"169px", border:"solid silver 1px"}}>
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
