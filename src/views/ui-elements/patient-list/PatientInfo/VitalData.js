import React from "react"
import {Form, FormGroup, Button,
  InputGroup, InputGroupAddon,Input,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  ButtonGroup,
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
// import {
//   getPastConulstList
// } from "../../../../redux/actions/data-list"
import { Search, Settings } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import "../../../../assets/scss/pages/authentication.scss"
import {connect} from "react-redux"
import userImg from "../../../../assets/img/portrait/small/avatar-s-11.jpg"
import { ContextLayout } from "../../../../utility/context/Layout"
import { Fragment } from "react"
import previmg from "../../../../assets/img/portrait/small/Sample_User_Icon.png"
import moment from "moment"
import {
  getVitalDataAll,
  resetVitalData,
  serachVitalData
} from "../../../../redux/actions/data-list/"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/light.css";
import "../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import { formatHTMLMessage } from "intl-messageformat"
import "../../../../assets/scss/plugins/extensions/recharts.scss"

class VitalData extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      bpbutton: false,
      pulsebutton: false,
      webutton: false,
      glbutton: false,
      tempbutton: false,
      spo2button: false,
      periodname: "",
      startdate: "",
      enddate: "",
      startpicker : new Date(),
      endpicker : new Date()   
    }
  }


  componentDidMount() {
    console.log(this.props.user)
    console.log(this.props.dataList)
  }

  handlebp =  () => {
    this.setState(prevState =>({
      bpbutton: !prevState.bpbutton
    }))
  }

  handlepulse =  () => {
    this.setState(prevState =>({
      pulsebutton: !prevState.pulsebutton
    }))
  }
  
  handlewe =  () => {
    this.setState(prevState =>({
      webutton: !prevState.webutton
    }))
  }
  
  handlegl =  () => {
    this.setState(prevState =>({
      glbutton: !prevState.glbutton
    }))
  }
  
  handletemp =  () => {
    this.setState(prevState =>({
      tempbutton: !prevState.tempbutton
    }))
  }
  
  handlespo2 =  () => {
    this.setState(prevState =>({
      spo2button: !prevState.spo2button
    }))
  }

  handleStartPicker = () => {
    this.setState(prevState =>({
      startpickerbtn: !prevState.startpickerbtn
    }))
  }

  handleEndPicker = () => {
    this.setState(prevState =>({
      endpickerbtn: !prevState.endpickerbtn
    }))
  }
  

  handlePeriod = periodname => {
    this.setState({periodname, startpicker: new Date(), endpicker: new Date()}, () => {
      if(this.state.periodname==="today") {
        this.setState({startdate: moment().format("YYYYMMDD")},()=>{this.props.getVitalDataAll(this.props.pinfo.PATIENT_ID,this.state.startdate)})
      } else if(this.state.periodname==="week") {
        this.setState({startdate: moment().add(-6,'days').format("YYYYMMDD")},()=>{this.props.getVitalDataAll(this.props.pinfo.PATIENT_ID,this.state.startdate)})
      } else if(this.state.periodname==="month") {
        this.setState({startdate: moment().add(-29,'days').format("YYYYMMDD")},()=>{this.props.getVitalDataAll(this.props.pinfo.PATIENT_ID,this.state.startdate)})
      } else if(this.state.periodname==="months") {
        this.setState({startdate: moment().add(-89,'days').format("YYYYMMDD")},()=>{this.props.getVitalDataAll(this.props.pinfo.PATIENT_ID,this.state.startdate)})
      }
    })
  }

  serachVitalData = e => {
    e.preventDefault()
    this.props.resetVitalData()
    this.setState({periodname: ""})
    this.props.serachVitalData(this.props.pinfo.PATIENT_ID, this.state.startpicker, this.state.endpicker)
  }

  goVitatDataSetting = e => {
    e.preventDefault() 
    history.push("/vitaldatasetting")
  }

  // check = e => {
  //   e.preventDefault()
  //   console.log(this.state)
  // }
  
  
 
  render() {
    let { 
      startpicker,
      endpicker 
     
    } = this.state
  
    let profile_preview = null;

    profile_preview = 
      <div className="dz-thumb ">
        <div className="dz-thumb-inner">  
          <img
            width="100px"
            height="100px" 
            src={previmg}
            className="dz-img"
            style={{borderRadius:"100%"}} 
            alt="" 
            />
        </div>
      </div>

    return (
      <Fragment>
        {/* 환자정보, 버튼 모음 Row */}
        {this.props.appo===null?null:
          <Row>
            <Col className="col-12">
              <Card className="d-flex flex-wrap  col-12 m-0" style={{backgroundColor: "#efefff", height:"60px"}}>
                <div className="2">{this.props.appo.APPOINT_TIME}</div>
                <div className="1">{this.props.pinfo.F_NAME}</div>
                <div className="1">{this.props.pinfo.GENDER==="1"||this.props.pinfo.GENDER==="3"?"M":"F"}</div>
                <div className="1"></div>
                <div className="2">{this.props.pinfo.BIRTH_DT}</div>
                <div className="1"></div>
                <div className="1"></div>
                <div className=""></div>
                <Settings onClick={this.goVitatDataSetting}></Settings>
              </Card>
            </Col>   
          </Row>
        }
        <Row className="mt-2 flex-wrap">
          <Col className="col-6 d-flex">
            <h4 className="text-bold-600 align-self-center">선택항목</h4>
            <ButtonGroup className="ml-1">
              <Button.Ripple outline={this.state.bpbutton===true?false:true} color="primary" onClick={this.handlebp}>혈압</Button.Ripple>
              <Button.Ripple outline={this.state.pulsebutton===true?false:true} color="primary" onClick={this.handlepulse}>맥박</Button.Ripple>{" "}
              <Button.Ripple outline={this.state.webutton===true?false:true} color="primary" onClick={this.handlewe}>체중</Button.Ripple>{" "}
              <Button.Ripple outline={this.state.glbutton===true?false:true} color="primary" onClick={this.handlegl}>혈당</Button.Ripple>{" "}
              <Button.Ripple outline={this.state.tempbutton===true?false:true} color="primary" onClick={this.handletemp}>체온</Button.Ripple>{" "}
              <Button.Ripple outline={this.state.spo2button===true?false:true} color="primary" onClick={this.handlespo2}>산소포화도</Button.Ripple>{" "}
              {/* <Button.Ripple color="primary" onClick={this.check}>산소포화도</Button.Ripple>{" "} */}
            </ButtonGroup>
          </Col>

          <Col className="col-4 d-flex ml-auto">
            <h4 className="text-bold-600 align-self-center">기간</h4>

            <ButtonGroup className="ml-4" >

              <button
                // disabled={this.state.startpickerbtn===true || this.state.endpickerbtn===true?true:false}
                onClick={() => this.handlePeriod("today")}
                className={`btn ${
                  this.state.periodname === "today"
                    ? "btn-primary"
                    : "btn-outline-primary text-primary"
                }`}
              >
                오늘
              </button>
              <button
                // disabled={this.state.startpickerbtn===true || this.state.endpickerbtn===true?true:false}
                onClick={() => this.handlePeriod("week")}
                className={`btn ${
                  this.state.periodname === "week"
                    ? "btn-primary"
                    : "btn-outline-primary text-primary"
                }`}
              >
                1주
              </button>

              <button
                // disabled={this.state.startpickerbtn===true || this.state.endpickerbtn===true?true:false}
                onClick={() => this.handlePeriod("month")}
                className={`btn ${
                  this.state.periodname === "month"
                    ? "btn-primary"
                    : "btn-outline-primary text-primary"
                }`}
              >
                1개월
              </button>
              
              <button
                // disabled={this.state.startpickerbtn===true || this.state.endpickerbtn===true?true:false}
                onClick={() => this.handlePeriod("months")}
                className={`btn ${
                  this.state.periodname === "months"
                    ? "btn-primary"
                    : "btn-outline-primary text-primary"
                }`}
              >
                3개월
              </button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="col-6">
          </Col>

          <Col className="col-4 d-flex ml-auto align-self-center">
            <h4 className="text-bold-600 align-self-center">직접입력</h4>
            <Flatpickr
              className="form-control col-3 align-self-center ml-1"
              value={startpicker}
              onChange={date => {
                this.setState({ startpicker : date  });
                this.handleStartPicker()
              }}
            />
            <h4 className="text-bold-600 align-self-center">-</h4>
            <Flatpickr
              className="form-control col-3 align-self-center"
              value={endpicker}
              onChange={date => {
                this.setState({ endpicker : date });
                this.handleEndPicker()
              }}
            />
            <Button.Ripple className="ml-1 align-self-center" color="primary" onClick={this.serachVitalData}>
              <Search size={16} />
            </Button.Ripple>
          </Col>
        </Row>

        
        <Row>
          {this.props.bpdata.length===0?null:this.state.bpbutton===false?null:
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle>혈압</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="recharts-wrapper">
                    <ResponsiveContainer>
                      <LineChart
                        width={500}
                        height={300}
                        data={this.props.bpdata}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis tick={{fontSize: 10}} dataKey="CREATE_TIME" />
                        <YAxis />
                        <Tooltip />
                        <Legend/>
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
                </CardBody>
              </Card>
            </Col>
          }

          {this.props.pulstdata.length===0?null:this.state.pulsebutton===false?null:
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle>맥박</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="recharts-wrapper">
                    <ResponsiveContainer>
                      <LineChart
                        width={500}
                        height={300}
                        data={this.props.pulstdata}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5
                        }}
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
                </CardBody>
              </Card>
            </Col>
          }

          {this.props.wedata.length===0?null:this.state.webutton===false?null:
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle>몸무게</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="recharts-wrapper">
                    <ResponsiveContainer>
                      <LineChart
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
                </CardBody>
              </Card>
            </Col>
          }

          {this.props.bsdata.length===0?null:this.state.glbutton===false?null:
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle>혈당</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="recharts-wrapper">
                    <ResponsiveContainer>
                      <LineChart
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
                </CardBody>
              </Card>
            </Col>
          }

          {this.props.tempdata.length===0?null:this.state.tempbutton===false?null:
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle>혈당</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="recharts-wrapper">
                    <ResponsiveContainer>
                      <LineChart
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
                  </CardBody>
              </Card>
            </Col>
          }

          

          

          {this.props.spo2data.length===0?null:this.state.spo2button===false?null:
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle>산소포화도</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="recharts-wrapper">
                    <ResponsiveContainer>
                      <LineChart
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
                  </CardBody>
              </Card>
            </Col>
          }

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

export default connect(mapStateToProps,{getVitalDataAll,serachVitalData, resetVitalData}) (VitalData)
