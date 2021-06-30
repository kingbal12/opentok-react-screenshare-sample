import React from "react"
import {InputGroup, InputGroupAddon, Form, FormGroup, Input, Button,
  CardHeader,
  CardTitle,
  Card,
  CardBody,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
import { Check } from "react-feather"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import "../../../../assets/scss/pages/authentication.scss"
import { register2,authemail } from "../../../../redux/actions/auth/registerActions"
import { connect } from "react-redux"
import axios from "axios"


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid:"",
      email: "",
      idnumber: "",
      name: "",
      phone: "",  
      password: "",
      chkpassword: "",
      btdate:"",
      gender:"",
      otheremail: false,
      idmodal: false,
      vfemodal: false,
      verifyemailyn:"N",
      chkpasswordmodal: false
    }
  }

  idModal = () => {
    this.setState(prevState => ({
      idmodal: !prevState.idmodal
    }))
  }
  

  emailauth = e => {
    e.preventDefault()
    if(this.state.otheremail===false){
      this.props.authemail(
        this.state.userid,
        this.state.userid
      )
    } else {
      this.props.authemail(
        this.state.userid,
        this.state.email
      )
    }
  }


  verifyauth = e => {
    e.preventDefault()
    if(this.state.otheremail===false) {
      this.verifyemail(
        this.state.userid,
        this.state.idnumber
      )
    } else {
      this.verifyemail(
        this.state.email,
        this.state.idnumber
      )
    }
  }

  verifyemail = (email,idnumber) => {
    console.log("작동됨",email,idnumber)
    
      axios
        .post("http://203.251.135.81:9300/signup-verify", {
          user_id: email,
          auth_code: idnumber
        })
  
        .then(response => {
          console.log(response.data.status);
          if(response.data.status === "200") {
            this.verifyEmailModal()
            this.setState({
              verifyemailyn:"Y"
            })
          } else {
            
          }
  
        })
        
    
  }

 

  handleRegister1 = e => {
    e.preventDefault()
    if(this.state.verifyemailyn==="Y") {
      if(this.state.password===this.state.chkpassword) {
        if(this.state.otheremail===false) {
          this.props.register2(
            this.state.userid,
            this.state.name,
            this.state.phone,
            this.state.password,
            this.state.btdate,
            this.state.gender,
            this.state.userid
          )
        } else {
          this.props.register2(
            this.state.userid,
            this.state.name,
            this.state.phone,
            this.state.password,
            this.state.btdate,
            this.state.gender,
            this.state.email
          )
        }
      } else {
        this.setState({chkpasswordmodal:true})
      }
    } else {
      alert("이메일인증을 완료해주십시오")
    }
    
    
  }

  handleOtheremail = e => {
    this.setState({
      otheremail: e.target.checked
    })
  }
  
  verifyEmailModal = () => {
    this.setState(prevState => ({
      vfemodal: !prevState.vfemodal
    }))
  }

  chkpasswordModal = () => {
    this.setState(prevState => ({
      chkpasswordmodal: !prevState.chkpasswordmodal
    }))
  }


  render() {
    return (
      <Row className="m-0 justify-content-center">
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
                  <CardHeader className="pb-1 pt-50">
                    <CardTitle>
                      <h1>회원가입</h1>
                    </CardTitle>
                  </CardHeader>   
                  <CardBody className="pt-1 pb-50">
                      <Form onSubmit={this.handleRegister1}>
                        <FormGroup className="form-label-group">
                          <div className="d-flex justify-content-between"> 
                          <div className="col-3 align-self-center"><b>아이디</b></div>
                          <InputGroup>
                            <Input
                              type="email"
                              placeholder="사용 가능한 이메일 입력"
                              required
                              value={this.state.userid}
                              onChange={e => this.setState({ userid: e.target.value })}
                              // invalid={this.state.useemail.length === 0 ? true : false}
                            />
                            <InputGroupAddon addonType="append"><Button color="primary" type="button" onClick={this.idModal}>중복확인</Button></InputGroupAddon>
                          </InputGroup>
                          </div>
                          <div className="col-12 mt-1"><b>보안이메일<span className="text-primary">(비밀번호 변경에 사용)</span></b></div>
                          <div className="d-flex flex-row-reverse">
                            <small>
                              <Checkbox
                                color="primary"
                                icon={<Check className="vx-icon" size={16} />}
                                label="아이디와 다른 이메일 사용"
                                defaultChecked={false}
                                onChange={this.handleOtheremail}
                              />
                            </small>
                          </div>
                                     
                        </FormGroup>

                        <FormGroup className="form-label-group d-flex justify-content-between">
                          <div className="col-3"></div>
                          <InputGroup>
                            <Input
                              disabled={this.state.otheremail===true?false:true}
                              type="email"
                              placeholder="사용 가능한 이메일 입력"
                              required
                              value={this.state.email}
                              onChange={e => this.setState({ email: e.target.value })}
                            />
                            <InputGroupAddon addonType="append"><Button color="primary" type="button" onClick={this.emailauth}>이메일 인증</Button></InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                        
                        <FormGroup className="form-label-group d-flex justify-content-between">
                          <div className="col-3"></div>
                          <InputGroup>
                            <Input
                              type="number"
                              placeholder="인증번호 입력"
                              required
                              value={this.state.idnumber}
                              onChange={e => this.setState({ idnumber: e.target.value })}
                            />
                            <InputGroupAddon addonType="append"><Button color="primary" type="button" onClick={this.verifyauth}>인증 확인</Button></InputGroupAddon>
                          </InputGroup>
                        </FormGroup>

                        <FormGroup className="form-label-group d-flex justify-content-between">
                          <div className="col-3 align-self-center"><b>이름</b></div>
                          <InputGroup>
                            <Input
                              type="text"
                              // placeholder="이름"
                              required
                              value={this.state.name}
                              onChange={e => this.setState({ name: e.target.value })}
                            />   
                          </InputGroup>
                        </FormGroup>

                        <FormGroup className="form-label-group d-flex justify-content-between">
                         <div className="col-3 align-self-center"><b>휴대폰번호</b></div>
                          <InputGroup>
                            <Input
                              type="text"
                              // placeholder="휴대폰번호"
                              required
                              value={this.state.phone}
                              onChange={e => this.setState({ phone: e.target.value })}
                            />   
                          </InputGroup>
                        </FormGroup>

                        <FormGroup className="form-label-group d-flex justify-content-between">
                          <div className="col-3 align-self-center"><b>비밀번호</b></div>
                          <InputGroup>
                            <Input
                              type="password"
                              placeholder="영어, 숫자, 특수문자 포함 6자~14자 이내"
                              required
                              value={this.state.password}
                              onChange={e => this.setState({ password: e.target.value })}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="form-label-group d-flex justify-content-between">
                          <div className="col-3"></div>
                          <InputGroup>
                            <Input
                              type="password"
                              placeholder="비밀번호 확인"
                              required
                              value={this.state.chkpassword}
                              onChange={e => this.setState({ chkpassword: e.target.value })}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="form-label-group d-flex justify-content-between">
                          <div className="col-3 align-self-center"><b>생년월일/성별</b></div>
                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="앞 6자리"
                              required
                              value={this.state.btdate}
                              onChange={e => this.setState({ btdate: e.target.value })}
                            />
                            <div className="align-self-center font-weight-600"><b>&nbsp;-&nbsp;</b></div>
                            <Input
                              className=""
                              type="text"
                              placeholder="1,or2"
                              required
                              value={this.state.gender}
                              onChange={e => this.setState({ gender: e.target.value })}
                            />
                            <div className="align-self-center"><b>&nbsp;******&nbsp;</b></div>
                            
                          </InputGroup>
                        </FormGroup>
                        <div className="text-right">
                          <Button
                          color="primary" 
                          type="submit"
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

        <Modal
          isOpen={this.state.idmodal}
          toggle={this.idModal}
          className="modal-dialog-centered modal-sm"
        >
          <ModalHeader toggle={this.idModal}>
            
          </ModalHeader>
          <ModalBody>
            사용가능한 아이디입니다.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.idModal}>
              확인
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.vfemodal}
          toggle={this.verifyEmailModal}
          className="modal-dialog-centered modal-sm"
        >
          <ModalHeader toggle={this.verifyEmailModal}>
            
          </ModalHeader>
          <ModalBody>
            인증이 완료되었습니다.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.verifyEmailModal}>
              확인
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.chkpasswordmodal}
          toggle={this.chkpasswordModal}
          className="modal-dialog-centered modal-sm"
        >
          <ModalHeader toggle={this.chkpasswordModal}>
            
          </ModalHeader>
          <ModalBody>
            비밀번호가 동일하지 않습니다.
            다시 입력하여 주십시오.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.chkpasswordModal}>
              확인
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </Row>

      


    )
  }
}

const mapStateToProps = state => {
  return {
    values: state.auth.register2,
    // vfemail: state.auth.register.verify
  }
}
export default connect(mapStateToProps, { register2, authemail })(Register)

