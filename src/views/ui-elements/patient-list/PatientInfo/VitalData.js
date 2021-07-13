import React from "react"
import {Form, FormGroup, Button,
  InputGroup, InputGroupAddon,Input,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  ButtonGroup
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
import { Check } from "react-feather"
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
  getVitalDataAll
} from "../../../../redux/actions/data-list/"
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
      enddate: ""
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
  

  handlePeriod = periodname => {
    this.setState({periodname}, () => {
      if(this.state.periodname==="today") {
        this.setState({startdate: moment().format("YYYYMMDD")},()=>{this.props.getVitalDataAll()})--여기서부터 시작
      } else if(this.state.periodname==="week") {
        this.setState({startdate: moment().add(-6,'days').format("YYYYMMDD")})
      } else if(this.state.periodname==="month") {
        this.setState({startdate: moment().add(-29,'days').format("YYYYMMDD")})
      } else if(this.state.periodname==="year") {
        this.setState({startdate: moment().add(-364,'days').format("YYYYMMDD")})
      }
    })
  }
  
  
 
  render() {
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
              <Card style={{backgroundColor: "#efefff", height:"60px"}}>
                {this.props.appo.APPOINT_TIME}
                {this.props.pinfo.F_NAME}
                {this.props.pinfo.GENDER==="1"||this.props.pinfo.GENDER==="3"?"M":"F"}
                {this.props.pinfo.BIRTH_DT}
              </Card>
            </Col>   
          </Row>
        }
        <Row>
          <Col className="col-6 d-flex">
            <h4 className="text-bold-600 align-self-center">선택항목</h4>
            <ButtonGroup className="ml-1">
              <Button.Ripple outline={this.state.bpbutton===true?false:true} color="primary" onClick={this.handlebp}>혈압</Button.Ripple>
              <Button.Ripple outline={this.state.pulsebutton===true?false:true} color="primary" onClick={this.handlepulse}>맥박</Button.Ripple>{" "}
              <Button.Ripple outline={this.state.webutton===true?false:true} color="primary" onClick={this.handlewe}>체중</Button.Ripple>{" "}
              <Button.Ripple outline={this.state.glbutton===true?false:true} color="primary" onClick={this.handlegl}>혈당</Button.Ripple>{" "}
              <Button.Ripple outline={this.state.tempbutton===true?false:true} color="primary" onClick={this.handletemp}>체온</Button.Ripple>{" "}
              <Button.Ripple outline={this.state.spo2button===true?false:true} color="primary" onClick={this.handlespo2}>산소포화도</Button.Ripple>{" "}
            </ButtonGroup>
          </Col>

          <Col className="col-4 d-flex ml-auto">
            <h4 className="text-bold-600 align-self-center">기간</h4>
            <ButtonGroup className="ml-1" >

              <button
                // disabled={this.state.auto=="true"?false:true}
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
                // disabled={this.state.auto=="true"?false:true}
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
                // disabled={this.state.auto=="true"?false:true}
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
                // disabled={this.state.auto=="true"?false:true}
                onClick={() => this.handlePeriod("year")}
                className={`btn ${
                  this.state.periodname === "year"
                    ? "btn-primary"
                    : "btn-outline-primary text-primary"
                }`}
              >
                1년
              </button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row className="mt-1">
          <Col className="col-6">
          </Col>

          <Col className="col-4 d-flex ml-auto">
            <h4 className="text-bold-600 align-self-center">직접입력</h4>
            <div>{this.state.token}</div>
          </Col>
        </Row>

        
        <div className="d-flex flex-wrap mt-1">

          {this.props.bpdata.length===0?null:this.state.bpbutton===false?null:
              <div className="col-6 d-flex justify-content-center ">
                <LineChart
                  width={600}
                  height={400}
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
                </div>
          }

          {this.props.pulstdata.length===0?null:this.state.pulsebutton===false?null:
            <div className="col-6 d-flex justify-content-center">
                <LineChart
                  width={600}
                  height={400}
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
            </div>

          }

          {this.props.wedata.length===0?null:this.state.webutton===false?null:
            <div className="col-6 d-flex justify-content-center ">
                <LineChart
                  width={600}
                  height={400}
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
            </div>
          }

          {this.props.bsdata.length===0?null:this.state.glbutton===false?null:
            <div className="col-6 d-flex justify-content-center ">
                <LineChart
                  width={600}
                  height={400}
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
            </div>
          }

          {this.props.tempdata.length===0?null:this.state.tempbutton===false?null:
            <div className="col-6 d-flex justify-content-center ">
                <LineChart
                  width={600}
                  height={400}
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
            </div>
          }

          

          

          {this.props.spo2data.length===0?null:this.state.spo2button===false?null:
            <div className="col-6 d-flex justify-content-center ">
                <LineChart
                  width={600}
                  height={400}
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
            </div>
          }

        </div>
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

export default connect(mapStateToProps,{getVitalDataAll}) (VitalData)
