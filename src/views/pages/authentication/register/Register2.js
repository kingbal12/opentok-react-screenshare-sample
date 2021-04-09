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
import { history } from "../../../../history"
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
                  
                    
                      <Row>
                        <Col xs="4 text-center">로고</Col>
                        <Col xs="7"><h5>회원가입</h5></Col>
                      </Row>
                    
                  
                  
                  <CardBody className="pt-1 pb-50">
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                      <Form action="/" onSubmit={this.handleRegister}>
                        <FormGroup className="form-label-group">
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="이름"
                              required
                              value={this.state.name}
                              onChange={e => this.setState({ name: e.target.value })}
                            />   
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="form-label-group">
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="이메일"
                              required
                              value={this.state.email}
                              onChange={e => this.setState({ email: e.target.value })}
                            />
                            <InputGroupAddon addonType="append"><Button color="secondary" type="button">이메일 인증</Button></InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="form-label-group">
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="인증번호"
                              required
                              value={this.state.idnumber}
                              onChange={e => this.setState({ idnumber: e.target.value })}
                            />
                            <InputGroupAddon addonType="append"><Button color="secondary" type="button">인증 확인</Button></InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="form-label-group">
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="비밀번호"
                              required
                              value={this.state.password}
                              onChange={e => this.setState({ password: e.target.value })}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="form-label-group">
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="비밀번호확인"
                              required
                              value={this.state.chkpassword}
                              onChange={e => this.setState({ chkpassword: e.target.value })}
                            />
                          </InputGroup>
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
                          type="button"
                          onClick={() => {
                            history.push("/pages/register3")
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
