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
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            <Row className="m-0">
              
              <Col lg="12" md="12" className="p-0">
              <Card className="rounded-0 mb-0 p-2">
                  
                    
                  <Row>
                    <Col xs="4 text-center">병원정보 입력하기</Col>
                    <Col xs="7"></Col>
                  </Row>
                
              
              
              <CardBody className="pt-1 pb-50">
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                  <Form action="/" onSubmit={this.handleRegister}>
                    <FormGroup className="form-label-group">
                      
                        <div className="row">회원인증</div>
                        
                        <div className="row"><Button type="button">휴대폰 인증</Button></div>
                      
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <div className="row">병원명 (필수)</div>
                      <div className="row">
                        <InputGroup>
                          <Input
                            type="text"
                            placeholder="상호명을 입력해주세요"
                            required
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                          />   
                        </InputGroup>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <div className="row">사업자 등록번호 (필수)</div>
                      <div className="row">
                        <InputGroup>
                          <Input
                            type="text"
                            placeholder="하이픈(-)을 생략하고 입력해주세요"
                            required
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })}
                          />
                          <InputGroupAddon addonType="append"><Button color="secondary" type="button">중복확인</Button></InputGroupAddon>
                        </InputGroup>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <div className="row">병원주소 (필수)</div>
                      <div className="row">
                        <InputGroup className="mb-1">
                          <Input
                            type="text"
                            required
                            value={this.state.idnumber}
                            onChange={e => this.setState({ idnumber: e.target.value })}
                          />
                          <InputGroupAddon addonType="append"><Button color="secondary" type="button">우편번호 검색</Button></InputGroupAddon>
                        </InputGroup>
                        
                        <InputGroup>
                          <Input
                            type="text"
                            required
                            value={this.state.idnumber}
                            onChange={e => this.setState({ idnumber: e.target.value })}
                          />
                        </InputGroup>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <div className="row">전화번호 (필수)</div>
                      <div className="row">
                        <InputGroup>
                          <Input
                            type="text"
                            placeholder="하이픈(-)을 생략하고 입력해주세요"
                            required
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                          />
                        </InputGroup>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <div className="row">계좌정보</div>
                      <div className="row mb-1">
                        <div className="col-6">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>예금주</InputGroupText>
                            </InputGroupAddon>  
                            <Input
                              type="text"
                              required
                              value={this.state.chkpassword}
                              onChange={e => this.setState({ chkpassword: e.target.value })}
                            />
                          </InputGroup> 
                        </div>
                        <div className="col-6">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>은행명</InputGroupText>
                            </InputGroupAddon>  
                            <Input
                              type="text"
                              required
                              value={this.state.chkpassword}
                              onChange={e => this.setState({ chkpassword: e.target.value })}
                            />
                          </InputGroup> 
                        </div>
                      </div>
                      <div className="row">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>계좌번호</InputGroupText>
                          </InputGroupAddon>  
                          <Input
                            type="text"
                            required
                            value={this.state.chkpassword}
                            onChange={e => this.setState({ chkpassword: e.target.value })}
                          />
                        </InputGroup> 
                      </div>
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
