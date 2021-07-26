import React from "react"
import {Table,
  Row,
  Col,
} from "reactstrap"
import "../../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../../assets/scss/pages/authentication.scss"
import {connect} from "react-redux"
import {gettokbox} from "../../../../redux/actions/data-list/"
import { history } from "../../../../history"
import DataListConfig from "./DataListConfig"
import queryString from "query-string"
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
    addNew: "",
    viewfilemodal: false,
    viewprescriptionmodal: false
    };
  }

  viewFileModal = () => {
    this.setState(prevState => ({
      viewfilemodal: !prevState.viewfilemodal
    }))
  }

  viewPrescriptionModal = () => {
    this.setState(prevState => ({
      viewprescriptionmodal: !prevState.viewprescriptionmodal
    }))
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

  goCallSetting = e => {
    e.preventDefault() 
    history.push("/pages/callsetting")
    this.props.gettokbox(this.props.user.login.values.loggedInUser.username, this.props.appo.APPOINT_NUM)
  }

  goPhoneConsult= e => {
    e.preventDefault() 
    history.push("/pages/phoneconsulting")
  }
 
  render() {
    
   
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
                        {
                          this.props.pinfo.BP==="00"?<img src={pressure_2} alt="pressure_2"/>:
                          this.props.pinfo.BP==="01"?<img src={pressure_1} alt="pressure_1"/>:
                          this.props.pinfo.BP==="02"?<img src={pressure_5} alt="pressure_5"/>:
                          this.props.pinfo.BP==="03"?<img src={pressure_4} alt="pressure_4"/>:
                          this.props.pinfo.BP==="04"?<img src={pressure_3} alt="pressure_3"/>:
                          null
                        }
                        {
                          this.props.pinfo.PULSE==="00"?<img src={pulse_2} alt="pulse_2"/>:
                          this.props.pinfo.PULSE==="01"?<img src={pulse_1} alt="pulse_1"/>:
                          this.props.pinfo.PULSE==="02"?<img src={pulse_5} alt="pulse_5"/>:
                          this.props.pinfo.PULSE==="03"?<img src={pulse_4} alt="pulse_4"/>:
                          this.props.pinfo.PULSE==="04"?<img src={pulse_3} alt="pulse_3"/>:
                          null
                        }
                        {
                          this.props.pinfo.BW==="00"?<img src={weight_2} alt="weight_2"/>:
                          this.props.pinfo.BW==="01"?<img src={weight_1} alt="weight_1"/>:
                          this.props.pinfo.BW==="02"?<img src={weight_5} alt="weight_5"/>:
                          this.props.pinfo.BW==="03"?<img src={weight_4} alt="weight_4"/>:
                          this.props.pinfo.BW==="04"?<img src={weight_3} alt="weight_3"/>:
                          null
                        }
                        {
                          this.props.pinfo.BS==="00"?<img src={glucose_2} alt="glucose_2"/>:
                          this.props.pinfo.BS==="01"?<img src={glucose_1} alt="glucose_1"/>:
                          this.props.pinfo.BS==="02"?<img src={glucose_5} alt="glucose_5"/>:
                          this.props.pinfo.BS==="03"?<img src={glucose_4} alt="glucose_4"/>:
                          this.props.pinfo.BS==="04"?<img src={glucose_3} alt="glucose_3"/>:
                          null
                        }
                        {
                          this.props.pinfo.TEMPERATURE==="00"?<img src={temperature_2} alt="temperature_2"/>:
                          this.props.pinfo.TEMPERATURE==="01"?<img src={temperature_1} alt="temperature_1"/>:
                          this.props.pinfo.TEMPERATURE==="02"?<img src={temperature_5} alt="temperature_5"/>:
                          this.props.pinfo.TEMPERATURE==="03"?<img src={temperature_4} alt="temperature_4"/>:
                          this.props.pinfo.TEMPERATURE==="04"?<img src={temperature_3} alt="temperature_3"/>:
                          null
                        }
                        {
                          this.props.pinfo.SPO2==="00"?<img src={spo2_2} alt="spo2_2"/>:
                          this.props.pinfo.SPO2==="01"?<img src={spo2_1} alt="spo2_1"/>:
                          this.props.pinfo.SPO2==="02"?<img src={spo2_5} alt="spo2_5"/>:
                          this.props.pinfo.SPO2==="03"?<img src={spo2_4} alt="spo2_4"/>:
                          this.props.pinfo.SPO2==="04"?<img src={spo2_3} alt="spo2_3"/>:
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
        <h4 className="page-header text-bold-600 ml-3">Past Consulting List</h4>
        <DataListConfig parsedFilter={queryString.parse(this.props.location.search)}/>
        
        
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

export default connect(mapStateToProps,{gettokbox}) (PastConsultList)