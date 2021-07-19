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
        <Card style={{marginBottom: '0rem', height: '3rem'}}>
          <div className="d-flex col-12">
            <div className="col-2 align-self-center"><h4>진료과/진료의</h4></div>
            <div className="col-2 align-self-center"><h4>진단명</h4></div>
            <div className="col-2 align-self-center"><h4>진료일자</h4></div>
          </div>
        </Card>
        {cards.map(index => {
          return (
            <Card className="p-0 m-0" style={{ marginBottom: '0rem', }} key={index.APPOINT_TIME}>
              <div onClick={this.toggle} data-event={index.APPOINT_TIME}>
                <div className="d-flex col-12"  onClick={this.toggle} data-event={index.APPOINT_TIME}>
                  <div className="col-2 align-self-center"><h5>{index.PART_NAME}/{index.F_NAME}</h5></div>
                  <div className="col-2 align-self-center"><h5>{index.NOTE_CC}</h5></div>
                  <div className="col-2 align-self-center"><h5>{index.APPOINT_TIME}</h5></div>
                  <div className="col-2">
                    {this.state.collapse===index.APPOINT_TIME?<ChevronUp/> : <ChevronDown/>}
                  </div>
                  
                </div>
              </div>
              <Collapse   style={{background:"#d3d3d3"}} isOpen={collapse === index.APPOINT_TIME}>
              <CardBody className="m-0">
                <Row className="m-0">
                  <Col className="col-4 m-0">
                    <Card className="m-0" style={{height:"23rem"}} >
                      <CardHeader>MD Note</CardHeader>
                      <CardBody>
                        <div>C.C {index.NOTE_CC}</div>
                        <div>Diagnosis {index.NOTE_DX}</div>
                        <div>Tx Rx {index.NOTE_RX}</div>
                        <div>Recommendation</div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col className="col-4 m-0">
                    <Card style={{height:"10.5rem"}}>
                      <CardHeader>Present Condition</CardHeader>
                      <CardBody>
                        {index.SYMPTOM}
                      </CardBody>
                    </Card>
                    <Card style={{height:"10.5rem"}}>
                      <CardHeader>Files</CardHeader>
                      <CardBody>
                      <div className="dz-thumb ">
                        <div className="dz-thumb-inner">
                          <img
                            width="75px"
                            height="75px" 
                            src={"http://203.251.135.81:9300"+index.FILE_PATH
                                +index.FILE_NAME} 
                            className="dz-img" 
                            alt="" 
                            />
                        </div>
                      </div>
                      </CardBody>
                    </Card>
                  </Col> 
                  <Col className="col-4 m-0">
                    <Card style={{height:"23rem"}}>
                      <CardHeader>Prescriotion</CardHeader>
                      <CardBody>
                        {index.SYMPTOM}
                      </CardBody>
                    </Card>
                  </Col>
                </Row> 
              </CardBody>
                
              </Collapse>
            </Card>
          )
        })}

        {/* <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={totalPages}
              containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
              activeClassName="active"
              forcePage={
                this.props.parsedFilter.page
                  ? parseInt(this.props.parsedFilter.page - 1)
                  : 0
              }
              onPageChange={page => this.handlePagination(page)}
            />      */}
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
