import React from "react"
import {InputGroup, InputGroupAddon, Form, FormGroup, Input, Button,
  CardHeader,
  CardTitle,
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap"
import { Check } from "react-feather"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import "../../../../assets/scss/pages/authentication.scss"
import { register2,authemail,verifyemail } from "../../../../redux/actions/auth/registerActions"
import { connect } from "react-redux"
import axios from "axios"



class Register extends React.Component {
  state = {
    name: "",
    phone: "",
    email: "",
    idnumber: "",
    password: "",
    chkpassword: "",
  }
  

  emailauth = e => {
    e.preventDefault()
    this.props.authemail(
        this.state.email
      )
    }

  verifyauth = e => {
    e.preventDefault()
    this.props.verifyemail(
      this.state.email,
      this.state.idnumber
    )
  }

  handleRegister1 = e => {
    e.preventDefault()
    this.props.register2(
      this.state.name,
      this.state.phone,
      this.state.email,
      this.state.password,
      this.state.chkpassword
    )
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
                      <Form onSubmit={this.handleRegister1}>
                        <FormGroup className="form-label-group">
                          <div>아이디</div>
                          <InputGroup>
                            <Input
                              type="email"
                              // placeholder="이메일"
                              required
                              value={this.state.email}
                              onChange={e => this.setState({ email: e.target.value })}
                            />
                            <InputGroupAddon addonType="append"><Button color="primary" type="button" onClick={this.emailauth}>중복확인</Button></InputGroupAddon>
                          </InputGroup>
                          <div>보안이메일 <span className="text-primary">(비밀번호 변경에 사용)</span></div>
                          <div className="d-flex flex-row-reverse">
                            <Checkbox
                              color="primary"
                              icon={<Check className="vx-icon" size={16} />}
                              label="아이디와 다른 이메일에 사용"
                              defaultChecked={false}
                              onChange={this.handleRemember}
                            />
                          </div>                
                        </FormGroup>
          
                        <FormGroup className="form-label-group">
                          <InputGroup>
                            <Input
                              type="email"
                              placeholder="이메일"
                              required
                              value={this.state.email}
                              onChange={e => this.setState({ email: e.target.value })}
                            />
                            <InputGroupAddon addonType="append"><Button color="primary" type="button" onClick={this.emailauth}>이메일 인증</Button></InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        
                        <FormGroup className="form-label-group">
                          <div className="emailidentify">인증번호를 입력해주세요.</div>
                          <InputGroup>
                            <Input
                              type="number"
                              placeholder="인증번호"
                              required
                              value={this.state.idnumber}
                              onChange={e => this.setState({ idnumber: e.target.value })}
                            />
                            <InputGroupAddon addonType="append"><Button color="primary" type="button" onClick={this.verifyauth}>인증 확인</Button></InputGroupAddon>
                          </InputGroup>
                        </FormGroup>

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
                        {/* <FormGroup className="form-label-group">
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="생년월일"
                              required
                              value={this.state.birth}
                              onChange={e => this.setState({ birth: e.target.value })}
                            />   
                          </InputGroup>
                        </FormGroup> */}
                        <FormGroup className="form-label-group">
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="휴대폰번호"
                              required
                              value={this.state.phone}
                              onChange={e => this.setState({ phone: e.target.value })}
                            />   
                          </InputGroup>
                        </FormGroup>

                        <FormGroup className="form-label-group">
                          <InputGroup>
                            <Input
                              type="password"
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
                              type="password"
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
                          type="submit"
                          size="lg"
                          block
                          >
                            가입하기
                          </Button>
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
    values: state.auth.register2
  }
}
export default connect(mapStateToProps, { register2,authemail, verifyemail })(Register)

