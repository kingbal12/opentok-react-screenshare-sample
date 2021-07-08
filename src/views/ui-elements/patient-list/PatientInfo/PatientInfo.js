import React from "react"
import {Form, FormGroup, Button,
  InputGroup, InputGroupAddon,Input,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col
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
import { Check } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import "../../../../assets/scss/pages/authentication.scss"
import {connect} from "react-redux"
import userImg from "../../../../assets/img/portrait/small/avatar-s-11.jpg"
import { ContextLayout } from "../../../../utility/context/Layout"
import { Fragment } from "react"
import appoints from "../../../../redux/reducers/appoint/appoints"

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
]

class PatientInfo extends React.Component {
  state = {
    value: 20
  }
  componentDidMount() {
    console.log(this.props.user)
    console.log(this.props.dataList)
  }

  onSliderChange = value => {
    this.setState({ value })
  }

  resetSlider = () => {
    this.setState({ value: null })
  }
 
  render() {
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
              <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                <b>Past Consulting List</b>
              </CardTitle>
              <CardBody className="d-flex pl-0">
                <div className="col-4 text-center">
                  <h5><span className="text-bold-600">진료과/진료의</span></h5>

                </div>
                <div className="col-4 text-center">
                  <h5><span className="text-bold-600">진단명</span></h5>

                </div>
                <div className="col-4 text-center">
                  <h5><span className="text-bold-600">진료일자</span></h5>

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
                </Card>
              </div>
            </div>
            
            <Card className="mb-1" style={{height:"350px", border:"solid silver 1px"}}>
              <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                <b>Vital Data</b>
              </CardTitle>
              <CardBody className="d-flex pl-0">
                <div className="d-flex col-12">
                  <LineChart
                    width={200}
                    height={280}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke={this.props.primary}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="uv"
                      stroke={this.props.success}
                    />
                  </LineChart>
                  <LineChart
                    width={200}
                    height={280}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke={this.props.primary}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="uv"
                      stroke={this.props.success}
                    />
                  </LineChart>
                  <LineChart
                    width={200}
                    height={280}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke={this.props.primary}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="uv"
                      stroke={this.props.success}
                    />
                  </LineChart>
                  <LineChart
                    width={200}
                    height={280}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke={this.props.primary}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="uv"
                      stroke={this.props.success}
                    />
                  </LineChart>
                  <LineChart
                    width={200}
                    height={280}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke={this.props.primary}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="uv"
                      stroke={this.props.success}
                    />
                  </LineChart>
                  <LineChart
                    width={200}
                    height={280}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke={this.props.primary}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="uv"
                      stroke={this.props.success}
                    />
                  </LineChart>
                  
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
    cslist: state.dataList.csdata
  }
}

export default connect(mapStateToProps) (PatientInfo)
