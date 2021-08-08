import React from "react"
import {InputGroup, Form, FormGroup, Input, Button,
  CustomInput,
  CardHeader,
  CardTitle,
  Card,
  CardBody,
  Row,
  Col,
  CardImg 
} from "reactstrap"

import "../../../../assets/scss/pages/authentication.scss"
import { changepassword } from "../../../../redux/actions/auth/registerActions"
import { connect } from "react-redux"




class ChagePassword extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userid: props.user.login.values.loggedInUser.username,
      password: "",
      newpassword : "",
      confirmnewpassword : "",
    }
  }

  handlechangepassword = e => {
    e.preventDefault()
    let pwcheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,14}$/;
    if (!pwcheck.test(this.state.newpassword)) {
      if(this.state.newpassword===this.state.confirmnewpassword){
        this.props.changepassword(
          this.state.userid,
          this.state.password,
          this.state.newpassword
        )
      } else {
        alert("설정된 새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다.")
      }
    } else {
      alert("비밀번호 형식이 올바르지 않습니다.\n비밀번호 형식은 영어, 숫자, 특수문자 포함 6자~14자 이내 입니다.") 
    }   
  }

  render() {
  
    return (
      <Row className="m-0 justify-content-center">
      <Col
        sm="12"
        xl="12"
        lg="12"
        md="12"
        className="d-flex justify-content-center  m-0 p-0"
      >
        
        <Card className="bg-authentication rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col lg="12" md="12" className="p-0">
              <Card className="rounded-0 mb-0 p-2">
                <CardHeader className="pb-1 pt-50">
                  <CardTitle>
                    <h3 className="text-bold-600">비밀번호 변경</h3>
                  </CardTitle>
                </CardHeader>   
              <CardBody className="pt-1 pb-50">
                <Row>
                  <Col lg="2" md="12">
                  </Col>
                  <Col lg="8" md="12">
                  <Form action="/" onSubmit={this.handlechangepassword}>
                    <div className="form-label-group d-flex">
                      <div className="col-1 align-self-center"><b>아이디</b></div>
                      <div className="text-primary">{this.state.userid}</div>
                    </div> 
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-2 align-self-center"><b>현재 비밀번호</b></div>
                      <InputGroup>
                        <Input
                          type="password"
                          placeholder="기존 비밀번호 입력"
                          required
                          value={this.state.password}
                          onChange={e => this.setState({ password: e.target.value })}
                        />   
                      </InputGroup>
                    </FormGroup>
                    <div className="ml-1 pb-2 mt-2" style={{borderBottom:"solid silver 1px"}}>
                      외부로부터 <span className="text-primary">{this.state.userid}</span> 님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인합니다. <br/>
                      항상 비밀번호는 타인에게 노출되지 않도록 주의하세요
                    </div>
                    
                    <FormGroup className="form-label-group d-flex justify-content-between mt-2">
                      <div className="col-2 align-self-center"><b>새 비밀번호</b></div>
                      <InputGroup>
                        <Input
                          type="password"
                          placeholder="영어, 숫자, 특수문자 포함 6자~14자 이내"
                          required
                          value={this.state.newpassword}
                          onChange={e => this.setState({ newpassword: e.target.value })}
                        />   
                      </InputGroup>
                    </FormGroup>

                    <FormGroup className="form-label-group">
                      <div className="d-flex justify-content-between">
                        <div className="col-2 align-self-start"><b>새 비밀번호 확인</b></div>
                        <InputGroup>
                          <Input
                            type="password"
                            placeholder="새 비밀번호 재입력"
                            required
                            value={this.state.confirmnewpassword}
                            onChange={e => this.setState({ confirmnewpassword: e.target.value })}
                          />   
                        </InputGroup>
                      </div>
                    </FormGroup>

                    <div className="text-right">
                      <Button
                      size="lg"
                      color="primary" 
                      type="submit"
                      >
                        저장하기
                      </Button>
                    </div>
                  </Form>
                  </Col>
                  <Col lg="2" md="12">
                  </Col>
                </Row>
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
export default connect(mapStateToProps, {changepassword})(ChagePassword)
