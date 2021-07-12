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
import { Check } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import "../../../../assets/scss/pages/authentication.scss"
import {connect} from "react-redux"
import userImg from "../../../../assets/img/portrait/small/avatar-s-11.jpg"
import SliderBasic from "./SliderBasic"
import { ContextLayout } from "../../../../utility/context/Layout"
import { Fragment } from "react"
import { OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } from 'opentok-react';
import {Helmet} from "react-helmet";

class ConsultingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { streams: [] };
  }
  state = {
    value: 20
  }

  onSliderChange = value => {
    this.setState({ value })
  }

  resetSlider = () => {
    this.setState({ value: null })
  }

  // call = e => {
  //   e.preventDefault()
  //   this.sessionHelper = createSession({
    
  //   api_key: "47274054",
  //   session_id: "2_MX40NzI3NDA1NH5-MTYyNjA2NzI0ODM1Mn56aTZQdnVxVnNaNS82a2Q3YWZndmplc3V-UH4",
  //   tokens: "T1==cGFydG5lcl9pZD00NzI3NDA1NCZzaWc9M2E4ZDA3ODFiMjk4ZTg5M2M4NGY3ZjU2YWIwNDQ2ZmJlZTIzM2JjMDpzZXNzaW9uX2lkPTJfTVg0ME56STNOREExTkg1LU1UWXlOakEyTnpJME9ETTFNbjU2YVRaUWRuVnhWbk5hTlM4MmEyUTNZV1puZG1wbGMzVi1VSDQmY3JlYXRlX3RpbWU9MTYyNjA2NzI0NiZub25jZT0xMTI5ODg0NDUwJnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2MjYxNTM2NDY=",
  //   onStreamsUpdated: streams => { this.setState({ streams }); }
  //   });
  // }
 
  render() {
    return (
      <Fragment>
        {/* 환자정보, 버튼 모음 Row */}
        <Row className="d-flex justify-content-between mb-0">
        <Helmet>
          <script src="https://static.opentok.com/v2/js/opentok.min.js" type="text/javascript" />
        </Helmet>
          <Col className="col-6">
            <Card className="d-flex justify-content-between" style={{border:"solid #7367ef 1px", backgroundColor: "#efefff", width:"80%", height:"50px"}}>
            
            </Card>
          </Col>
          <Col className="col-6 text-right">
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

        {/* 화상통화, 생체데이터, 등등 */}
        <Row className="mt-0">
          <Col className="col-6"> 
            <Card className="mb-0" style={{height:"650px", border:"solid #7367ef 1px", backgroundColor:"#efefff"}}>
              <Row className="justify-content-md-center h-400">
              {/* <OTSession apiKey="47274054" sessionId="2_MX40NzI3NDA1NH5-MTYyNjA2NzI0ODM1Mn56aTZQdnVxVnNaNS82a2Q3YWZndmplc3V-UH4" token= "T1==cGFydG5lcl9pZD00NzI3NDA1NCZzaWc9M2E4ZDA3ODFiMjk4ZTg5M2M4NGY3ZjU2YWIwNDQ2ZmJlZTIzM2JjMDpzZXNzaW9uX2lkPTJfTVg0ME56STNOREExTkg1LU1UWXlOakEyTnpJME9ETTFNbjU2YVRaUWRuVnhWbk5hTlM4MmEyUTNZV1puZG1wbGMzVi1VSDQmY3JlYXRlX3RpbWU9MTYyNjA2NzI0NiZub25jZT0xMTI5ODg0NDUwJnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2MjYxNTM2NDY=">
                <OTPublisher />
                <OTStreams>
                  <OTSubscriber />
                </OTStreams>
              </OTSession> */}
                {/* <div className="dz-thumb ">
                  <div className="dz-thumb-inner">
                    <img 
                      src={userImg}
                      className="dz-img" 
                      // alt={file.name} 
                      />
                  </div>
                </div> */}
              </Row>
            </Card>
          </Col>
          <Col className="col-6">
            <div className="d-flex justify-content-between">
              <div className="mr-1" style={{width:"50%"}}>
                <Card className="mb-1" style={{height:"125px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <b>Personal Information</b>
                  </CardTitle>

                </Card>
                <Card className="mb-1" style={{height:"225px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <b>Physical Data</b>
                  </CardTitle>

                </Card>
              </div>

              <div style={{width:"50%"}}>
                <Card className="mb-1" style={{height:"125px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <b>Present Condition</b>
                  </CardTitle>

                </Card>
                <Card className="mb-1" style={{height:"90px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <b>Files</b>
                  </CardTitle>

                </Card>
                <Card className="mb-1" style={{height:"120px"}}>
                  <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                    <b>Past Consulting List</b>
                  </CardTitle>
                </Card>
              </div>
            </div>
            
            <Card className="mb-1" style={{height:"224px"}}>
              <CardTitle className="pl-1" style={{paddingTop:"5px"}}>
                <b>Vital Data</b>
              </CardTitle>
            </Card>
            <div className="pt-0 mt-0 text-right" style={{width:"100%"}}>
              <Button
                className="mr-1"
                color="primary"
                outline
                type="button"
                onClick={this.call}
              >
                test call
              </Button>
              <Button
                className="mr-1"
                color="primary"
                outline
                type="button"
              >
                MD Note
              </Button>
              <Button
                className="mr-1"
                color="primary"
                outline
                type="button"
              >
                Prescription
              </Button>
              <Button
                className="mr-1"
                color="primary"
                outline
                type="button"
              >
                Payment
              </Button>
              <Button
                className="mr-1"
                color="primary"
                outline
                type="button"
              >
                Save
              </Button>
              <Button
                color="primary"
                outline
                type="button"
              >
                End
              </Button>
            </div>
          </Col>
        </Row>
       
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  }
}

export default preloadScript(ConsultingRoom)
