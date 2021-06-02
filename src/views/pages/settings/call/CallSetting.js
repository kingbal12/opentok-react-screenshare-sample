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

class CallSetting extends React.Component {
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
      <Row className="pt-3 justify-content-center">
        <Col
          sm="8"
          xl="4"
          lg="10"
          md="8"
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
                          src={userImg}
                          className="dz-img" 
                          // alt={file.name} 
                          />
                      </div>
                    </div>
                  </Row>
                
                  <h3 className="ml-1 mt-1"><strong>영상 및 진료 카메라 마이크 설정</strong></h3>
                  <p className="ml-1">* 원격진료실 안에서도 설정 및 장비 테스트가 가능합니다.</p>
                  <CardBody className="pt-1 pb-50">           
                      <Form action="/" onSubmit={this.handleRegister}>
                        {/* <ContextLayout.Consumer>
                          {context => (
                            <Row>
                              <Col sm="12">
                                <SliderBasic rtl={context.state.direction} />
                              </Col>
                            </Row>
                          )}
                        </ContextLayout.Consumer> */}
                        <FormGroup className="form-label-group allagree">
                          <InputGroup>
                            <Input
                              type="number"
                              // placeholder="인증번호"
                              required
                              // value={this.state.idnumber}
                              // onChange={e => this.setState({ idnumber: e.target.value })}
                            />
                            <InputGroupAddon addonType="append"><Button color="primary" type="button" >적용</Button></InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="form-label-group allagree">
                          <InputGroup>
                            <Input
                              type="number"
                              // placeholder="인증번호"
                              required
                              // value={this.state.idnumber}
                              // onChange={e => this.setState({ idnumber: e.target.value })}
                            />
                            <InputGroupAddon addonType="append"><Button color="primary" type="button" >적용</Button></InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="form-label-group allagree">
                          <InputGroup>
                            <Input
                              type="number"
                              // placeholder="인증번호"
                              required
                              // value={this.state.idnumber}
                              // onChange={e => this.setState({ idnumber: e.target.value })}
                            />
                            <InputGroupAddon addonType="append"><Button color="primary" type="button" >적용</Button></InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="form-label-group">
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="오늘 하루 보지 않기"
                            defaultChecked={false}
                            onChange={this.handleRemember}
                          />
                        </FormGroup>
                        
                        <div className="d-flex justify-content-center">
                          <Button.Ripple 
                          color="primary" 
                          type="button"
                          size="lg"
                          // onClick={() => {
                          //   history.push("/pages/register2")
                          // }}
                          >
                            원격의료실 입장하기
                          </Button.Ripple>
                        </div>
                      </Form>
                     
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps) (CallSetting)
