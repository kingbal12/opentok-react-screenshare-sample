import React from "react"
import {InputGroup, InputGroupAddon, Form, FormGroup, Input, Button,
  CardHeader,
  CardTitle,
  Card,
  CardBody,
  Row,
  Col,
  TabContent,
  TabPane
} from "reactstrap"
import { Check } from "react-feather"
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
                      <h1>회원가입</h1>
                    </CardTitle>
                  </CardHeader>   
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
                              placeholder="전화번호"
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
                          <div className="pt-1 emailidentify">인증번호를 입력해주세요.</div>
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
                        <FormGroup className="form-label-group emailagree">
                          <Checkbox
                            className="smallcheckbox"
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="서비스에 대한 소식을 이메일로 받겠습니다."
                            defaultChecked={false}
                            onChange={this.handleRemember}
                          />
                        </FormGroup>
                        <FormGroup className="form-label-group seeterm">
                          <Checkbox
                            className="smallcheckbox"
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="제공하는 서비스 약관에 동의합니다. 약관보기"
                            defaultChecked={false}
                            onChange={this.handleRemember}
                          />
                        </FormGroup>
                        <div className="d-flex justify-content-center">
                          <Button
                          color="primary" 
                          type="button"
                          size="lg"
                          block
                          onClick={() => {
                            history.push("/pages/register3")
                          }}>
                            가입하기
                          </Button>
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
