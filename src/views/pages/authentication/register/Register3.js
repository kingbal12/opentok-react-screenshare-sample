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
import { register3 } from "../../../../redux/actions/auth/registerActions"
import { connect } from "react-redux"
import DaumPostcode from 'react-daum-postcode';
import axios from "axios"
import PerfectScrollbar from "react-perfect-scrollbar";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userid: props.user.register.values.registeruser,
      // userid: "kingbal13@naver.com",
      hospitalname: "",
      businessnumber: "",
      zipcode: "",
      address1: "",
      address2: "",
      phonenumber: "",
      accountname: "",
      bankname: "",
      accountnumber: "",
      modal: false,
      businessmodal: false,
      businessmodalmsg: ""
  }
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
      this.state.accountnumber
    )
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


  // 여기부터 수정
  postBusinessNumber = businessnumber => {
    console.log("작동됨",businessnumber)
      axios
        .get("http://203.251.135.81:9300/v1/doctor/account/hospital-verify", {
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

  

  
  render() {
    return (
      <PerfectScrollbar>
      <Row className="m-0 justify-content-center">
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
                    <h1>병원정보 입력하기</h1>
                  </CardTitle>
                </CardHeader>   
              <CardBody className="pt-1 pb-50">
                  <Form action="/" onSubmit={this.handleRegister}>
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-3 align-self-center"><b>회원인증</b></div>            
                      <InputGroup>
                        <Button type="button" color="primary" outline>휴대폰 인증</Button>
                        <Input
                          className="ml-1"
                          type="text"
                          placeholder="인증번호"
                          required
                          value={this.state.phoeauthnum}
                          onChange={e => this.setState({ phoeauthnum: e.target.value })}
                        />
                        <InputGroupAddon addonType="append"><Button color="primary" type="button">인증확인</Button></InputGroupAddon>
                      </InputGroup>                      
                    </FormGroup>
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-3 align-self-center"><b>병원명 <span className="text-primary">(필수)</span></b></div>
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="상호명을 입력해주세요"
                          required
                          value={this.state.hospitalname}
                          onChange={e => this.setState({ hospitalname: e.target.value })}
                        />   
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-3 align-self-center"><b>사업자 등록번호 <span className="text-primary">(필수)</span></b></div>
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="하이픈(-)을 생략하고 입력해주세요"
                          required
                          value={this.state.businessnumber}
                          onChange={e => this.setState({ businessnumber: e.target.value })}
                        />
                        <InputGroupAddon addonType="append"><Button color="primary" type="button" onClick={this.verifyBusinessNumber}>중복확인</Button></InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <div className="d-flex justify-content-between">
                        <div className="col-3 align-self-start"><b>병원주소 <span className="text-primary">(필수)</span></b></div>
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
                        toggle={this.toggleModal}
                        className="modal-dialog-centered"
                      >
                        <ModalHeader toggle={this.toggleModal}>
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
                      <div className="col-3 align-self-center"><b>전화번호 <span className="text-primary">(필수)</span></b></div>
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="하이픈(-)을 생략하고 입력해주세요"
                          required
                          value={this.state.phonenumber}
                          onChange={e => this.setState({ phonenumber: e.target.value })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-3 self-align-start"><b>계좌정보</b></div>
                      <InputGroup className="mr-1">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>예금주</InputGroupText>
                        </InputGroupAddon>  
                        <Input
                          type="text"
                          required
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
                          required
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
                          type="text"
                          required
                          value={this.state.accountnumber}
                          onChange={e => this.setState({ accountnumber: e.target.value })}
                        />
                      </InputGroup> 
                    </FormGroup>
                    <div className="text-right">
                      <Button
                        className="mr-1"
                        outline
                        color="dark" 
                        type="button"
                        // onClick={this.checkstate}
                      >
                        임시저장
                      </Button>
                      <Button
                        color="primary" 
                        type="submit"
                        // onClick={this.checkstate}
                      >
                        다음단계
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
      </PerfectScrollbar>
    )
  }
}

const mapStateToProps = state =>{
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps, {register3})(Register)
