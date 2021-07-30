import React from "react"
import {InputGroup, Form, FormGroup, Input, Button, Label,
  InputGroupAddon, InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CustomInput,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col
} from "reactstrap"

import "../../../../assets/scss/pages/authentication.scss"
import { puthsinfo } from "../../../../redux/actions/auth/registerActions"
import { connect } from "react-redux"
import axios from "axios"
import previmg from "../../../../assets/img/portrait/small/Sample_User_Icon.png"
import DaumPostcode from 'react-daum-postcode';
import { FormattedMessage } from "react-intl"
import { saveRegister3 } from "../../../../redux/actions/cookies"


class Hospitalinfo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userid: props.user.login.values.loggedInUser.username,
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
      businessmodalmsg: ""
    }
  }

  componentDidMount() {
    if(this.props.cookiere3.hospitalname===""){
      axios
      .get("https://health.iot4health.co.kr:9300/v1/doctor/account/hospital-info", {
        params: {
          user_id: this.state.userid
        }
      })
      .then(response => {
        let hsinfo;

        if(response.data.status==="200") {
          hsinfo=response.data.data
          console.log("병원정보:",hsinfo)
          this.setState({
            hospitalname: hsinfo.HOSPITAL_NAME,
            businessnumber: hsinfo.BUSINESS_NUM,
            address1: hsinfo.ADDRESS_1,
            address2: hsinfo.ADDRESS_2,
            phonenumber: hsinfo.PHONE_NUM,
            accountname: hsinfo.BUSINESS_NUM,
            bankname: hsinfo.BANK_NAME,
            accountnumber: hsinfo.ACCOUNT_NUM,
            zipcode: hsinfo.ZIP_CODE,
          })
          
        } else {
          alert("병원정보를  불러오지 못하였습니다.")
        }
      })
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
      this.props.puthsinfo(
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
          .get("https://health.iot4health.co.kr:9300/v1/doctor/account/hospital-verify", {
            params: {
              business_num: businessnumber,
            }
          })
    
          .then(response => {
            console.log(response)
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


  render() {
   
    return (
      
      <Row className="m-0 justify-content-center">
        <Modal
          isOpen={this.state.businessmodal}
          toggle={this.businessnumModal}
          className="modal-dialog-centered modal-sm"
        >
          <ModalHeader toggle={this.businessnumModal}>
            
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
        className="d-flex justify-content-center m-0 p-0"
      >
        
        <Card className="bg-authentication rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col lg="12" md="12" className="p-0">
            <Card className="rounded-0 mb-0 p-2">
                <CardHeader className="pb-1 pt-50">
                  <CardTitle>
                    <h3><b>병원정보 수정하기</b></h3>
                  </CardTitle>
                </CardHeader>   
              <CardBody className="pt-1 pb-50">
                <Row>
                  <Col lg="2" md="12">
                  </Col>
                  <Col lg="8" md="12">
                  <Form action="/" onSubmit={this.handleRegister}>
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-3 align-self-center"><b>병원명 <span className="text-danger">(필수)</span></b></div>
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
                      <div className="col-3 align-self-center"><b>사업자 등록번호 <span className="text-danger">(필수)</span></b></div>
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
                        <div className="col-3 align-self-start"><b>병원 주소 <span className="text-danger">(필수)</span></b></div>
                        <InputGroup className="mb-1" onClick={this.zipModal}>
                          <Input
                            type="text"
                            required
                            disabled
                            value={this.state.address1}
                            onChange={e => this.setState({ address1: e.target.value })}
                          />
                          <InputGroupAddon addonType="append">
                            <Button color="primary" type="button">우편번호 검색</Button>
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
                      <div className="col-3 align-self-center"><b>병원 전화번호 <span className="text-danger">(필수)</span></b></div>
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
                      <div className="col-3 self-align-start"><b>병원 계좌정보 <span className="text-danger">(필수)</span></b></div>
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
                        className='mr-1'
                        outline
                        color="primary" 
                        type="button"
                        onClick={this.saveRe3}
                      >
                        <FormattedMessage id="Drafts"/>
                      </Button>
                      <Button
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
    user: state.auth,
    cookiere3: state.cookies.register3
  }
}
export default connect(mapStateToProps, {puthsinfo})(Hospitalinfo)
