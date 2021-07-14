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
  TabContent,
  TabPane,
  Table
} from "reactstrap"
import {getPastConulstList} from "../../../../redux/actions/data-list"
import { history } from "../../../../history"
import "../../../../assets/scss/pages/authentication.scss"
import {connect} from "react-redux"
import { Fragment } from "react"
import classnames from "classnames"
import BPSetting from "./BPSetting"
import PulseSetting from "./PulseSetting"
import WESetting from "./WESetting"
import BSSetting from "./BSSetting"



class VitalDataSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      activeTab: "1",
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

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  componentDidMount() {
    console.log(this.props.user)
    console.log(this.props.dataList)
  }
 
  render() {
    return (
      <Fragment>
        {/* 환자정보, 버튼 모음 Row */}
        {this.props.appo===null?null:
          <Row>
            <Col className="col-12">
              <Table responsive>
                <thead>
                  <tr className="table-primary">
                    <th>{this.props.appo.APPOINT_TIME}</th>
                    <th>{this.props.pinfo.F_NAME}</th>
                    <th>{this.props.pinfo.GENDER==="1"||this.props.pinfo.GENDER==="3"?"M":"F"}</th>
                    <th>27</th>
                    <th>{this.props.pinfo.BIRTH_DT}</th>
                    <th>DM</th>
                    <th>재진</th>
                    <th>재진</th>
                    <th>재진</th>
                  </tr>
                </thead>
              </Table>

            </Col>   
          </Row>
        }
        <Row className="mt-2 flex-wrap">
          <Col className="col-12 d-flex">
            <h4 className="text-bold-600 align-self-center">선택항목</h4>
            <ButtonGroup className="ml-1">
              <Button.Ripple 
                outline={this.state.bpbutton===true?false:true} 
                color="primary" 
                className={classnames({
                          active: this.state.activeTab === "1"
                        })}
                        onClick={() => {
                          this.toggle("1")
                        }}
              >
                혈압
              </Button.Ripple>
              <Button.Ripple 
                outline={this.state.pulsebutton===true?false:true} 
                color="primary"
                className={classnames({
                          active: this.state.activeTab === "2"
                        })}
                        onClick={() => {
                          this.toggle("2")
                        }}
              >
                맥박
              </Button.Ripple>
              <Button.Ripple 
              outline={this.state.webutton===true?false:true} 
              color="primary" 
              className={classnames({
                active: this.state.activeTab === "3"
              })}
              onClick={() => {
                this.toggle("3")
              }}
              >
                체중
              </Button.Ripple>
              <Button.Ripple 
              outline={this.state.glbutton===true?false:true} 
              color="primary" 
              className={classnames({
                active: this.state.activeTab === "4"
              })}
              onClick={() => {
                this.toggle("4")
              }}
              >
                혈당
              </Button.Ripple>
              <Button.Ripple outline={this.state.tempbutton===true?false:true} color="primary" onClick={this.handletemp}>체온</Button.Ripple>{" "}
              <Button.Ripple outline={this.state.spo2button===true?false:true} color="primary" onClick={this.handlespo2}>산소포화도</Button.Ripple>{" "}
              {/* <Button.Ripple color="primary" onClick={this.check}>산소포화도</Button.Ripple>{" "} */}
            </ButtonGroup>
          </Col>
        </Row>
        <TabContent className="mt-5" activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <BPSetting />
          </TabPane>
          <TabPane tabId="2">
            <PulseSetting />
          </TabPane>
          <TabPane tabId="3">
            <WESetting />
          </TabPane>
          <TabPane tabId="4">
            <BSSetting />
          </TabPane>
        </TabContent>
        <Row>
          <Col md="12" className="d-flex text-right">
            <Button.Ripple outline color="primary" className="mr-2">Edit</Button.Ripple>
            <Button.Ripple color="primary">Save</Button.Ripple>
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

export default connect(mapStateToProps, {getPastConulstList}) (VitalDataSetting)
