import React from "react"
import {Form, FormGroup, Button,
  InputGroup, InputGroupAddon,Input,
  Card,
  Table,
  CardBody,
  Row,
  Col
} from "reactstrap"
import { Check } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import "../../../../assets/scss/pages/authentication.scss"
import {connect} from "react-redux"
import userImg from "../../../../assets/img/portrait/small/avatar-s-11.jpg"
import SliderBasic from "./SliderBasic"
import { ContextLayout } from "../../../../utility/context/Layout"
import { Fragment } from "react"
import Select from "react-select"






class CallSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      camera:[],
      mic:[],
      speaker:[],
      cameraset:{},
      micset:{},
      speakerset:{}
    }
  }
 
  componentDidMount() {

    (async () => {   
      await navigator.mediaDevices.getUserMedia({audio: true, video: true});   
      let devices = await navigator.mediaDevices.enumerateDevices();
      console.log(devices)
      let camera = await devices.filter(devices => devices.kind ==="videoinput")
      let mic = await devices.filter(devices =>devices.kind ==="audioinput")
      let speaker = await devices.filter(devices =>devices.kind ==="audiooutput")

      let modifiedcamera = new Array();
        for (let i=0; i<camera.length; i++) {
          let item = {deviceId: camera[i].deviceId, groupId: camera[i].groupId, kind: camera[i].kind, value: camera[i].label, label: camera[i].label }
          modifiedcamera.push(item);
        }

      let modifiedmic = new Array();
        for (let i=0; i<mic.length; i++) {
          let item = {deviceId: mic[i].deviceId, groupId: mic[i].groupId, kind: mic[i].kind, value: mic[i].label, label: mic[i].label }
          modifiedmic.push(item);
        }

      let modifiedspeaker = new Array();
        for (let i=0; i<speaker.length; i++) {
          let item = {deviceId: speaker[i].deviceId, groupId: speaker[i].groupId, kind: speaker[i].kind, value: speaker[i].label, label: speaker[i].label }
          modifiedspeaker.push(item);
        }


      await this.setState({camera:modifiedcamera})
      await this.setState({mic:modifiedmic})
      await this.setState({speaker:modifiedspeaker})
      
    })();
  }

  setCamera= e => {
    
    
    e.preventDefault()
    let audioList = this.state.micset;
    let videoList = this.state.cameraset;
    
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
  
      devices.forEach(function(device) {
        let elem = document.createElement("li");
        let [kind, type, direction] = device.kind.match(/(\w+)(input|output)/i);
  
        elem.innerHTML = "<strong>" + device.label + "</strong> (" + direction + ")";
        if (type === "audio") {
          audioList.appendChild(elem);
        } else if (type === "video") {
          videoList.appendChild(elem);
        }
      });
    });
    


    // navigator.mediaDevices.getUserMedia({video:this.state.cameraset, audio:this.state.micset})
    // .then(function(stream) {
    //   alert(stream)
    // })
    // .catch(function(err) {
    //   console.log(err)
    // });
  }




  Check = e => {
    e.preventDefault()
    console.log(this.state)
  }
 
  render() {
    return (
      <Fragment>
        <Row className="d-flex justify-content-between mb-0">
          <Col lg="6" md="12">
            {this.props.appo===null?null:
              <Table responsive>
                <thead>
                  <tr className="table-primary" style={{verticalAlign:"middle"}}>
                    <th><h6>{this.props.appo.APPOINT_TIME}</h6></th>
                    <th><h6>{this.props.pinfo.F_NAME}</h6></th>
                    <th><h6>{this.props.pinfo.GENDER==="1"||this.props.pinfo.GENDER==="3"?"M":"F"}</h6></th>
                    <th><h6>{this.props.pinfo.AGE}</h6></th>
                    <th><h6>{this.props.pinfo.BIRTH_DT}</h6></th>
                    <th><h6>{this.props.pinfo.NOTE_DX}</h6></th>
                    <th><h6>{this.props.pinfo.FIRST_YN==="N"?"재진":"초진"}</h6></th>
                  </tr>
                </thead>
              </Table>
            } 
          </Col>
          <Col lg="6" md="12" className="text-right">
            <Button
              className="mr-1"
              color="primary"
              outline
              type="button">
              남은시간
            </Button>
            <Button
              className="mr-1"
              color="primary"
              outline
              type="button">
              화면공유
            </Button>
            <Button
              className="mr-1"
              color="primary"
              outline
              type="button">
              화면녹화
            </Button>
            <Button
              color="primary"
              outline
              type="button">
              설정
            </Button>
          </Col>
        </Row>
      <Row className="pt-3 justify-content-center">
        <Col
          sm="6"
          xl="6"
          lg="6"
          md="6"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            <Row className="m-0">
              
              <Col lg="12" md="12" className="p-0">
                <Card className="rounded-0 mb-0 p-2">
                  <Row className="justify-content-md-center">
                    <div className="dz-thumb ">
                      <div className="dz-thumb-inner">
                        <img 
                          src={
                            this.props.user.login.values.loggedInUser.file_name!==""
                              ? "http://203.251.135.81:9300"+this.props.user.login.values.loggedInUser.file_path
                                +this.props.user.login.values.loggedInUser.file_name 
                              : userImg
                          }
                          className="dz-img"
                          width="160px"
                          height="160px" 
                          />
                      </div>
                    </div>
                  </Row>
                
                  <h3 className="ml-1 mt-1"><strong>영상 및 진료 카메라 마이크 설정</strong></h3>
                  <p className="ml-1">* 원격진료실 안에서도 설정 및 장비 테스트가 가능합니다.</p>
                  <CardBody className="pt-1 pb-50">
                    <Row className="mt-1">
                      <Col lg="3" md="12" className="align-self-center">
                        <h5 className="text-bold-600">카메라 설정</h5>
                      </Col>
                      <Col lg="6" md="12">
                        <Select 
                          className="React"
                          classNamePrefix="select"
                          defaultValue={this.state.camera[0]}
                          name="color"
                          options={this.state.camera}
                          onChange={e => this.setState({ cameraset: e})}
                        />
                      </Col>
                      <Col lg="3" md="12">
                        <Button.Ripple outline color="primary" size="md" onClick={this.setCamera}>
                          적용
                        </Button.Ripple>
                      </Col>
                    </Row>    
                    <Row className="mt-1">
                      <Col lg="3" md="12" className="align-self-center">
                        <h5 className="text-bold-600">마이크 설정</h5>
                      </Col>
                      <Col lg="6" md="12">
                        <Select 
                          className="React"
                          classNamePrefix="select"
                          defaultValue={this.state.mic[0]}
                          name="color"
                          options={this.state.mic}
                          onChange={e => this.setState({ micset: e})}
                        />
                      </Col>
                      <Col lg="3" md="12">
                        <Button.Ripple outline color="primary" size="md">
                          적용
                        </Button.Ripple>
                      </Col>
                    </Row>
                    <Row className="mt-1">
                      <Col lg="3" md="12" className="align-self-center">
                        <h5 className="text-bold-600">스피커 설정</h5>
                      </Col>
                      <Col lg="6" md="12">
                        <Select 
                          className="React"
                          classNamePrefix="select"
                          defaultValue={this.state.speaker[0]}
                          name="color"
                          options={this.state.speaker}
                          onChange={e => this.setState({ speakerset: e})}
                        />
                      </Col>
                      <Col lg="3" md="12">
                        <Button.Ripple outline color="primary" size="md">
                          적용
                        </Button.Ripple>
                      </Col>
                    </Row>       
                     
                    <Row className="mt-1">
                      <Col lg="12" md="12" className="d-flex justify-content-center">
                        <Button.Ripple 
                        color="primary" 
                        type="button"
                        size="lg"
                        // onClick={() => {
                        //   history.push("/pages/consultingroom")
                        // }}
                        onClick={this.Check}
                        >
                          원격의료실 입장하기
                        </Button.Ripple>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
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

export default connect(mapStateToProps) (CallSetting)
