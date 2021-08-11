import React from "react"
import {InputGroup, InputGroupAddon, InputGroupText, Form, FormGroup, Input, Label, Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardHeader,
  CardTitle,
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap"
import "../../../../assets/scss/pages/authentication.scss"
import { register3, postPhonenumber, phoneAuth} from "../../../../redux/actions/auth/registerActions"
import { saveRegister3 } from "../../../../redux/actions/cookies"
import { connect } from "react-redux"
import DaumPostcode from 'react-daum-postcode';
import axios from "axios"
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from "react-perfect-scrollbar";
import HicareLogo from "../../../../assets/img/logo/logo1.png"
import { FormattedMessage } from "react-intl"
import { history } from "../../../../history"

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      // userid: props.user.register.values.registeruser,
      userid: "kingbal999@kakao.com",
      phonenum: "",
      phonauthnum: "",
      hospitalname: props.cookiere3.hospitalname,
      businessnumber: props.cookiere3.businessnumber,
      zipcode: props.cookiere3.zipcode,
      address1: props.cookiere3.address1,
      address2: props.cookiere3.address2,
      phonenumber: props.cookiere3.phonenumber,
      accountname: props.cookiere3.accountname,
      bankname: props.cookiere3.bankname,
      accountnumber: props.cookiere3.accountnumber,
      modal: false,
      businessmodal: false,
      businessmodalmsg: "",
      phoneauthveryfied:"N",
      
  }
}




postPhone = e => {
  e.preventDefault()
 
    if(this.props.user.register.values.phone === this.state.phonenum){
      axios
        .post("https://health.iot4health.co.kr:9300/signup-sms", {
          mobile_num: this.state.phonenum
        })
        .then(response => {
          console.log(response);
          if(response.data.status === "200") {
            alert(response.data.message);
          } else{
            alert(response.data.message);
          }

        })
    } else {
      alert("본인의 휴대폰번호와 다릅니다.\n본인의 휴대폰 번호를 입력해 주세요")
    }
  
}

auth = e => {
  e.preventDefault()
  axios
      .get("https://health.iot4health.co.kr:9300/signup-sms", {
        params:{
          mobile_num: this.state.phonenum,
          auth_code: Number(this.state.phonauthnum)
        }
      })
      .then(response => {
        console.log(response);
        if(response.data.status === "200") {
          alert(response.data.message);
          this.setState({phoneauthveryfied:"Y"})
        } else{
          alert(response.data.message);
        }

      })
}



handleComplete = (data) => {
  let fullAddress = data.address +" ("+data.zonecode+")";
  let extraAddress = ''; 
  let zoneCodes = data.zonecode;
  
  if (data.addressType === 'R') {
    if (data.bname !== '') {
      extraAddress += data.bname;
    }
    if (data.buildingName !== '') {
      extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
    }
    fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
  }

  this.setState ({
    address1: fullAddress,
    zipcode: zoneCodes
  });

}

  handleRegister = e => {
    e.preventDefault()
    let regexp = /^[0-9]*$/
    if(this.state.phoneauthveryfied==="Y"){
      if(!regexp.test(this.state.hospitalname)){
        if(!regexp.test(this.state.accountname) || !regexp.test(this.state.bankname)){
            this.props.register3(
            this.state.userid,
            this.state.hospitalname,
            this.state.businessnumber,
            this.state.zipcode,
            this.state.address1,
            this.state.address2,
            this.state.phonenumber,
            this.state.accountname,
            this.state.bankname,
            this.state.accountnumber)
        } else{
          alert("예금주나 은행이름을 숫자로만 입력할 수 없습니다.")
        }
      } else{
        alert("병원 이름을 숫자로만 입력할수 없습니다.")
      }
    } else {
      alert("휴대폰 인증을 진행해주시기 바랍니다.")
    }
    
    
  }

  checkstate = e => {
    e.preventDefault()
    console.log(this.state)
  }


  verifyBusinessNumber = e => {
    e.preventDefault()
    this.postBusinessNumber(
      this.state.businessnumber
    )
  }

  saveRe3 = e => {
    e.preventDefault()
    this.props.saveRegister3(
      this.state.hospitalname,
      this.state.businessnumber,
      this.state.zipcode,
      this.state.address1,
      this.state.address2,
      this.state.phonenumber,
      this.state.accountname,
      this.state.bankname,
      this.state.accountnumber
    )
    alert("병원정보가 저장되었습니다.")
  }


  // 여기부터 수정
  postBusinessNumber = businessnumber => {
    let regexp = /^[0-9]*$/
      if(!regexp.test(this.state.businessnumber)) {
        alert("사업자 등록번호에는 숫자만 입력하세요")
      } else {
      axios
        .get("https://health.iot4health.co.kr:9300/v1/doctor/account/hospital-verify", {
          params: {
            business_num: businessnumber,
          }
        })
  
        .then(response => {
          if(response.data.status==="200"){
            
            if(response.data.data.COUNT===0) {
              this.setState({
                businessmodal:true, 
                businessmodalmsg:"확인 완료되었습니다."
              })
            }else{
              this.setState({
                businessmodal:true, 
                businessmodalmsg:"이미 등록된 번호입니다."
              })
            }

          }
          else {
            alert(response.data.message)
          }
  
        })
      }
        
    
  }

  businessnumModal = () => {
    this.setState(prevState => ({
      businessmodal: !prevState.businessmodal
    }))
  }

  zipModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }

  
  render() {
    return (
      <PerfectScrollbar style={{display:"flex",height:"100vh", alignItems:"center"}}>
      <Row className="m-0 w-100 justify-content-center">
        <Modal
          isOpen={this.state.businessmodal}
          toggle={this.businessnumModal}
          className="modal-dialog-centered modal-sm"
        >
          <ModalHeader toggle={this.verifyEmailModal}>
            
          </ModalHeader>
          <ModalBody>
            {this.state.businessmodalmsg}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.businessnumModal}>
              확인
            </Button>{" "}
          </ModalFooter>
        </Modal>
        <Col
          sm="12"
          xl="12"
          lg="12"
          md="12"
          className="d-flex justify-content-center p-0 m-0"
        >
          <Card className="shadow-none rounded-0 mb-0 w-100">
            <Row className="m-0 d-flex">
              <Col lg="3" md="12">
                <h3 className="mt-5 pl-2 text-bold-600">
                  <img 
                    className="px-2" 
                    onClick={()=>history.push("/")} 
                    src={HicareLogo} 
                    alt="HicareLogo" 
                    style={{width:"150px", paddingBottom:"0.7rem", cursor:"pointer"}}
                  />
                  <FormattedMessage id="Sign In"/>
                </h3>
              </Col>
            </Row>
            <Row className="m-0">
              
              <Col lg="3" md="12"></Col>
              <Col lg="6" md="12">
              <Card className="rounded-0 mb-0 p-2">
                <CardHeader className="pb-1 pt-50">
                  <CardTitle>
                    <h4 className="text-bold-600"><FormattedMessage id="CI"/></h4>
                  </CardTitle>
                </CardHeader>   
              <CardBody className="pt-1 pb-50">
                  <Form action="/" onSubmit={this.handleRegister}>
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-3 align-self-center"><b>휴대폰인증<span className="text-danger">(필수)</span></b></div>            
                      <InputGroup>
                        <Input
                          type="number"
                          placeholder="휴대폰번호를 - 없이 입력해주세요"
                          required
                          value={this.state.phonenum}
                          onChange={e => this.setState({ phonenum: e.target.value })}
                        />
                        <InputGroupAddon addonType="append"><Button color="primary" type="button" onClick={this.postPhone}>인증요청</Button></InputGroupAddon>
                      </InputGroup>                      
                    </FormGroup>
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-3 align-self-center"></div>            
                      <InputGroup>
                        <Input
                          type="number"
                          placeholder="인증번호 입력"
                          required
                          value={this.state.phonauthnum}
                          onChange={e => this.setState({ phonauthnum: e.target.value })}
                        />
                        <InputGroupAddon addonType="append"><Button color="primary" type="button" onClick={this.auth}>인증확인</Button></InputGroupAddon>
                      </InputGroup>                      
                    </FormGroup>
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-3 align-self-center"><b><FormattedMessage id="CN"/> <span className="text-danger">(필수)</span></b></div>
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="병원명 입력"
                          required
                          value={this.state.hospitalname}
                          onChange={e => this.setState({ hospitalname: e.target.value })}
                        />   
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-3 align-self-center"><b><FormattedMessage id="CRN"/> <span className="text-danger">(필수)</span></b></div>
                      <InputGroup>
                        <Input
                          maxLength="10"
                          type="number"
                          placeholder="하이픈(-)을 생략, 숫자만 입력"
                          required
                          value={this.state.businessnumber}
                          onInput={this.maxLengthCheck}
                          onChange={e => this.setState({ businessnumber: e.target.value })}
                        />
                        <InputGroupAddon addonType="append"><Button color="primary" type="button" onClick={this.verifyBusinessNumber}>중복확인</Button></InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <div className="d-flex justify-content-between">
                        <div className="col-3 align-self-start"><b><FormattedMessage id="Address"/> <span className="text-danger">(필수)</span></b></div>
                        <InputGroup className="mb-1" onClick={this.zipModal}>
                          <Input
                            type="text"
                            required
                            disabled
                            value={this.state.address1}
                            onChange={e => this.setState({ address1: e.target.value })}
                          />
                          <InputGroupAddon addonType="append">
                            <Button color="primary" type="button">주소 검색</Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </div>

                      <div className="d-flex justify-content-between">
                        <div className="col-3"></div>
                        <InputGroup>
                          <Input
                            type="text"
                            required
                            value={this.state.address2}
                            onChange={e => this.setState({ address2: e.target.value })}
                          />
                        </InputGroup>
                      </div>
                      
                      {/* 주소찾기 Modal창 */}
                      <Modal
                        isOpen={this.state.modal}
                        toggle={this.zipModal}
                        className="modal-dialog-centered"
                      >
                        <ModalHeader toggle={this.zipModal}>
                          주소 찾기
                        </ModalHeader>
                        <ModalBody>
                          <DaumPostcode 
                            onComplete={data => this.handleComplete(data)}
                            // style={postCodeStyle}
                            height={200}
                          />
                            <FormGroup>
                              <Label for="adress1">주소:</Label>
                              <Input
                                type="text"
                                id="adress1"
                                placeholder="주소"
                                value={this.state.address1}
                                onChange={e => this.setState({ address1: e.target.value })}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="address2">상세주소:</Label>
                              <Input
                                type="text"
                                id="address2"
                                placeholder="상세주소"
                                value={this.state.address2}
                                onChange={e => this.setState({ address2: e.target.value })}
                              />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.zipModal}>
                            저장
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </FormGroup>
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-3 align-self-center"><b><FormattedMessage id="CNumber"/> <span className="text-danger">(필수)</span></b></div>
                      <InputGroup>
                        <Input
                          type="number"
                          placeholder="하이픈(-)을 생략, 숫자만 입력"
                          required
                          value={this.state.phonenumber}
                          onChange={e => this.setState({ phonenumber: e.target.value })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-3 self-align-start"><b><FormattedMessage id="CAI"/></b></div>
                      <InputGroup className="mr-1">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>예금주</InputGroupText>
                        </InputGroupAddon>  
                        <Input
                          type="text"
                          value={this.state.accountname}
                          onChange={e => this.setState({ accountname: e.target.value })}
                        />
                      </InputGroup> 
                    
                      <InputGroup className="ml-1">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>은행명</InputGroupText>
                        </InputGroupAddon>  
                        <Input
                          type="text"
                          value={this.state.bankname}
                          onChange={e => this.setState({ bankname: e.target.value })}
                        />
                      </InputGroup>   
                    </FormGroup>

                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-3"></div>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>계좌번호</InputGroupText>
                        </InputGroupAddon>  
                        <Input
                          type="number"
                          value={this.state.accountnumber}
                          onChange={e => this.setState({ accountnumber: e.target.value })}
                        />
                      </InputGroup> 
                    </FormGroup>
                    <div className="text-right">
                      <Button
                        className="mr-1 text-bold-600"
                        outline
                        color="light" 
                        type="button"
                        onClick={()=> history.push("/pages/register2")}
                      >
                        이전단계
                      </Button>
                      <Button
                        className="mr-1 text-bold-600"
                        outline
                        color="light" 
                        type="button"
                        onClick={this.saveRe3}
                      >
                        <FormattedMessage id="Drafts"/>
                      </Button>
                      <Button
                        color="primary" 
                        type="submit"
                      >
                        <FormattedMessage id="Next"/>
                      </Button>
                    </div>
                  </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="3" md="12"></Col>
            </Row>
          </Card>
        </Col>
      </Row>
      </PerfectScrollbar>
    )
  }
}

const mapStateToProps = state =>{
  return {
    user: state.auth,
    cookiere3: state.cookies.register3
  }
}

export default connect(mapStateToProps, {register3, postPhonenumber, phoneAuth, saveRegister3})(Register)
