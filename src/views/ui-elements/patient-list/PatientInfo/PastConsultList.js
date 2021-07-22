import React from "react"
import {Table,
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Collapse
} from "reactstrap"
import ReactPaginate from "react-paginate"
import "../../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../../assets/scss/pages/authentication.scss"
import {connect} from "react-redux"
import userImg from "../../../../assets/img/portrait/small/avatar-s-11.jpg"
import { Fragment } from "react"
import appoints from "../../../../redux/reducers/appoint/appoints"
import previmg from "../../../../assets/img/portrait/small/Sample_User_Icon.png"
import { 
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight, 
  Phone, 
  Video 
} from "react-feather"
import DataListConfig from "./DataListConfig"
import queryString from "query-string"



class PastConsultList extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = { 
      collapse: 0, 
      cards: props.cousultlist,
      user: this.props.user.login.values.loggedInUser.username,
    name: "",
    data: [],
    totalPages: 0,
    currentPage: 0,
    allData: [],
    value: "",
    rowsPerPage: 5,
    sidebar: false,
    currentData: null,
    selected: [],
    totalRecords: 0,
    sortIndex: [],
    addNew: ""
    };
  }
  state = {
    value: 20
  }

  toggle(e) {
    let event = e.target.dataset.event;
    this.setState({ collapse: this.state.collapse === event ? 0 : event });
  }

  handlePagination = page => {
    let { parsedFilter, getData } = this.props
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 5

    this.props.getData(this.state.user, perPage, page.selected + 1 )
    this.setState({ currentPage: page.selected })
  }
 
  render() {
    let {
      columns,
      data,
      allData,
      totalPages,
      value,
      rowsPerPage,
      currentData,
      sidebar,
      totalRecords,
      sortIndex
    } = this.state
    const {cards, collapse} = this.state;
    return (
      
      <div>
        {/* 환자정보, 버튼 모음 Row */}
        {this.props.appo===null?null:
          <Row>
            <Col className="col-12 mb-2">
            <Table responsive>
                <thead>
                  <tr className="table-primary align=self-center">
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
                        <Button.Ripple className= "btn-icon btn" color="primary">
                          <Phone size={14} />
                        </Button.Ripple>
                        <Button.Ripple outline className="ml-1 btn-icon btn"  color="primary">
                          <Video size={14} />
                        </Button.Ripple>
                      </th>
                      :
                      <th>
                        <Button.Ripple outline className= "btn-icon btn"  color="primary">
                          <Phone size={14} />
                        </Button.Ripple>
                        <Button.Ripple className="ml-1 btn-icon btn"  color="primary">
                          <Video size={14} />
                        </Button.Ripple>
                      </th>
                    }
                  </tr>
                </thead>
              </Table>
            </Col>   
          </Row>
        }
        <h3 className="page-header text-bold-600">Past Consulting List</h3>
        <DataListConfig parsedFilter={queryString.parse(this.props.location.search)}/>
        
        )
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    dataList: state.dataList,
    appo: state.dataList.appointment,
    pinfo: state.dataList.patient,
    cousultlist: state.dataList.pastconsultlist,
    totalpage: state.dataList.totalPages

  }
}

export default connect(mapStateToProps) (PastConsultList)
