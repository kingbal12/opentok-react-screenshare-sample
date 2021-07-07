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
import { ContextLayout } from "../../../../utility/context/Layout"
import { Fragment } from "react"

class PatientInfo extends React.Component {
  state = {
    value: 20
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
        <Row>
          <Col className="col-12">
            <Card style={{backgroundColor: "#efefff", height:"60px"}}>
              {this.props.dataList.csdata[0].APPOINT_TIME}
            </Card>
          </Col>
          
        </Row>

        {/* 화상통화, 생체데이터, 등등 */}
        <Row className="mt-0">
          <Col className="col-6"> 
            <Card className="mb-0" style={{height:"650px", border:"solid #7367ef 1px", backgroundColor:"#efefff"}}>
              <Row className="justify-content-md-center h-400">
                <div className="dz-thumb ">
                  <div className="dz-thumb-inner">
                    <img 
                      src={userImg}
                      className="dz-img" 
                      // alt={file.name} 
                      />
                  </div>
                </div>
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
    user: state.auth,
    dataList: state.dataList
  }
}

export default connect(mapStateToProps) (PatientInfo)
