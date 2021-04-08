import React from "react"
import {InputGroup, InputGroupAddon, InputGroupText, Form, FormGroup, Input, Label, Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  TabContent,
  TabPane
} from "reactstrap"
import { Mail, Lock, Check } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import "../../../../assets/scss/pages/authentication.scss"

class Register extends React.Component {
  state = {
    activeTab: "1"
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  render() {
    return (
      <Row className="m-0 justify-content-center">
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
                  <CardHeader className="pb-1 pt-50">
                    <CardTitle>
                      <h4>약관동의</h4>
                      
                    </CardTitle>
                  </CardHeader>
                  <p className="ml-2">하이케어넷 사용을 위해</p>
                  <p className="ml-2">아래의 약관에 동의해 주세요!</p>
                  <CardBody className="pt-1 pb-50">
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                      <Form action="/" onSubmit={this.handleRegister}>
                        <FormGroup className="form-label-group">
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="모든 약관에 동의"
                            defaultChecked={false}
                            onChange={this.handleRemember}
                          />
                        </FormGroup>
                        <FormGroup className="form-label-group">
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="서비스 이용약관(필수)"
                            defaultChecked={false}
                            onChange={this.handleRemember}
                          />
                        </FormGroup>
                        <FormGroup className="form-label-group">
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="개인정보 수집 및 이용동의(필수)"
                            defaultChecked={false}
                            onChange={this.handleRemember}
                          />
                        </FormGroup>
                        <FormGroup className="form-label-group">
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="개인정보 제 3자 제공(선택)"
                            defaultChecked={false}
                            onChange={this.handleRemember}
                          />
                        </FormGroup>
                        <FormGroup className="form-label-group">
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="마케팅 정보 수신(선택)"
                            defaultChecked={false}
                            onChange={this.handleRemember}
                          />
                        </FormGroup>
                        <FormGroup className="form-label-group">
                          <Checkbox
                            className="float-left"
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="앱 푸시알림"
                            defaultChecked={false}
                            onChange={this.handleRemember}
                          />
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="이메일"
                            defaultChecked={false}
                            onChange={this.handleRemember}
                          />
                        </FormGroup>
                        <div className="d-flex justify-content-between">
                          <Button.Ripple
                            color="primary"
                            outline
                            onClick={() => {
                              history.push("/pages/login")
                            }}
                          >
                            Login
                          </Button.Ripple>
                          <Button.Ripple 
                          color="primary" 
                          type="submit"
                          onClick={() => {
                            history.push("/pages/register2")
                          }}>
                            Register
                          </Button.Ripple>
                        </div>
                      </Form>
                      </TabPane>
                    </TabContent>
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
export default Register
