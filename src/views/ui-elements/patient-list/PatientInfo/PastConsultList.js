import React from "react"
import {Form, FormGroup, Button,
  InputGroup, InputGroupAddon,Input,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Collapse
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
import previmg from "../../../../assets/img/portrait/small/Sample_User_Icon.png"
import {Menu} from "react-feather"
import { starTask } from "../../../../redux/actions/todo"





class PastConsultList extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: 0, cards: this.props.cousultlist };
  }
  state = {
    value: 20
  }

  toggle(e) {
    let event = e.target.dataset.event;
    this.setState({ collapse: this.state.collapse === event ? 0 : event });
  }
 
  render() {
    const {cards, collapse} = this.state;
    return (
      
      <div>
        {/* 환자정보, 버튼 모음 Row */}
        {this.props.appo===null?null:
          <Row>
            <Col className="col-12 mb-2">
              <Card style={{backgroundColor: "#efefff", height:"60px"}}>
                {this.props.appo.APPOINT_TIME}
                {this.props.pinfo.F_NAME}
                {this.props.pinfo.GENDER==="1"||this.props.pinfo.GENDER==="3"?"M":"F"}
                {this.props.pinfo.BIRTH_DT}
              </Card>
            </Col>   
          </Row>
        }
        <h3 className="page-header text-bold-600">Past Consulting List</h3>
        <Card style={{marginBottom: '0rem', height: '3rem'}}>
          <div className="d-flex col-12">
            <div className="col-2 align-self-center"><h4>진료과/진료의</h4></div>
            <div className="col-2 align-self-center"><h4>진단명</h4></div>
            <div className="col-2 align-self-center"><h4>진료일자</h4></div>
          </div>
        </Card>
        {cards.map(index => {
          return (
            <Card style={{ marginBottom: '0rem', }} key={index.APPOINT_TIME}>
              <CardHeader onClick={this.toggle} data-event={index.APPOINT_TIME}>
                <div className="d-flex col-12">
                  <div className="col-2 align-self-center"><h5>{index.PART_NAME}/{index.F_NAME}</h5></div>
                  <div className="col-2 align-self-center"><h5>{index.NOTE_CC}</h5></div>
                  <div className="col-2 align-self-center"><h5>{index.APPOINT_TIME}</h5></div>
                </div>
              </CardHeader>
              <Collapse onClick={this.toggle} isOpen={collapse === index.APPOINT_TIME}>
              <CardBody>Example</CardBody>
              </Collapse>
            </Card>
          )
        })}     
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    dataList: state.dataList,
    appo: state.dataList.appointment,
    cousultlist: state.dataList.pastconsultlist,
    totalpage: state.dataList.totalPages

  }
}

export default connect(mapStateToProps) (PastConsultList)
