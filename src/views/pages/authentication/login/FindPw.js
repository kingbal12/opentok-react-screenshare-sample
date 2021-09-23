import React from "react"
import { CardBody, FormGroup, Form, Input, Button, Modal, Row,
  ModalHeader,
  ModalBody,
  ModalFooter, } from "reactstrap"

import Select from "react-select"

import axios from "axios"
import Radio from "../../../../components/@vuexy/radio/RadioVuexy"
import { FormattedMessage } from "react-intl"

const colourOptions = [
  { value: "개인회원", label: "개인회원" },
  { value: "기업회원", label: "기업회원" }
]




class FindPw extends React.Component {
  state = {
    userid: "",
    name: "",
    bt_date: "",
    phone:"",
    docnum:"",
    modal:false,
    verifymodal: false,
    useridchecked: false,
    emailchecked: true,
    email: "",
    emaillabel: "",
    modalmsg:"",
  }

  searchemail = e => {
    e.preventDefault()
    axios
          .get("https://health.iot4health.co.kr:9300/v1/doctor/account/password", {
            params: {
              user_id: this.state.userid,
              f_name: this.state.name,
              birth_dt: this.state.bt_date,
              mobile_num: this.state.phone,
              medical_num: this.state.docnum
            }
          })
          .then(response => {
            console.log(response)
            if(response.data.status==="200") {
              this.setState({
                email: response.data.data.EMAIL,
                emaillabel: response.data.data.EMAIL
              })
              if(response.data.data.USER_ID===response.data.data.EMAIL){
                axios.post("https://health.iot4health.co.kr:9300/v1/doctor/account/password", {
                    user_id: this.state.userid,
                    email: this.state.email,
                    f_name: this.state.name,
                    birth_dt: this.state.bt_date,
                    mobile_num: this.state.phone,
                    medical_num: this.state.docnum
                })
                .then(response =>{
                  if(response.data.status==="200"){
                    this.setState({
                      modal:true,
                      modalmsg: <FormattedMessage id="비밀번호 전송 성공"/>
                    })
                  } else {
                    this.setState({
                      modal:true,
                      modalmsg: <FormattedMessage id="비밀번호 전송 실패"/>
                    })
                  }
                })
              } else{
                this.setState({
                  userid: response.data.data.USER_ID,
                  email: response.data.data.EMAIL,
                  emaillabel: response.data.data.EMAIL,
                  verifymodal:true
                })
              }
              
            } else {
              this.setState({
                modal:true,
                modalmsg: response.data.message
              })
            }
          })
  }

  findEmailModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  verifyModal = () => {
    this.setState(prevState => ({
      verifymodal: !prevState.verifymodal
    }))
    console.log(this.state)
  }

  onSiteChanged = e => {
    this.setState({
      site: e.currentTarget.value
      });
  }

  onAddressChanged = e => {
    this.setState({
      address: e.currentTarget.value
      });
  }

  changePassword = () => {
    axios
    .post("https://health.iot4health.co.kr:9300/v1/doctor/account/password", {
        user_id: this.state.userid,
        email: this.state.email,
        f_name: this.state.name,
        birth_dt: this.state.bt_date,
        mobile_num: this.state.phone,
        medical_num: this.state.docnum
    })
    .then(response => {
      console.log(response)
      if(response.data.status==="200"){
        this.setState({
          modal:true,
          modalmsg: <FormattedMessage id="선택 비밀번호 전송 성공"/>
        })
      } else {
        this.setState({
          modal:true,
          modalmsg: <FormattedMessage id="비밀번호 전송 실패"/>
        })
      }
    })

    this.setState(prevState => ({
      verifymodal: !prevState.verifymodal
    }))
    
  }
  
  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.modal}
          toggle={this.findEmailModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.findEmailModal}>
            
          </ModalHeader>
          <ModalBody>
            {this.state.modalmsg}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.findEmailModal}>
              <FormattedMessage id="확인"/>
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.verifymodal}
          toggle={this.verifyModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.verifyModal}>
            <FormattedMessage id="이메일 선택"/>
          </ModalHeader>
          <ModalBody>
            <Row className="d-flex">
              <h6 className="align-self-center ml-1"><FormattedMessage id="ID"/>: </h6>
              <Radio
                label={this.state.userid}
                defaultChecked={this.state.userid===""||this.state.userid?true:false}  
                name="exampleRadioSizes" 
                value={this.state.userid}
                onChange={e => this.setState({ email: e.target.value })}
                color="primary"
                defaultChecked={this.state.useridchecked}
                className="ml-1"
              />
            </Row>

            <Row className="d-flex">
              <h6 className="align-self-center ml-1"><FormattedMessage id="보안이메일"/>: </h6>
              <Radio
                label={this.state.emaillabel}
                color="primary"
                value={this.state.email}
                defaultChecked={this.state.emailchecked}
                onChange={e => this.setState({ email: e.target.value })}
                name="exampleRadioSizes"
                className="ml-1"
              /> 
            </Row>         
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.changePassword}>
              확인
            </Button>{" "}
          </ModalFooter>
        </Modal>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.searchemail}>       
            <FormGroup className="form-label-group position-relative">
              <Select
                className="React"
                classNamePrefix="select"
                defaultValue={colourOptions[0]}
                name="color"
                options={colourOptions}
              />
            </FormGroup>
            <FormGroup className="form-label-group position-relative">
              <Input
                placeholder="아이디를 입력하세요"
                value={this.state.userid}
                onChange={e => this.setState({ userid: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup className="form-label-group position-relative">
              <Input
                placeholder="이름을 입력하세요"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup className="form-label-group position-relative">
              <Input
                type="text"
                placeholder="생년월일 입력, 숫자만 입력"
                value={this.state.bt_date}
                onChange={e => this.setState({ bt_date: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup className="form-label-group position-relative">
              <Input
                type="text"
                placeholder="휴대폰 번호를 입력하세요"
                value={this.state.phone}
                onChange={e => this.setState({ phone: e.target.value })}
                required
              />
            </FormGroup>  
            <FormGroup className="form-label-group position-relative">
              <Input
                type="text"
                placeholder="의사면허번호를 입력하세요"
                value={this.state.docnum}
                onChange={e => this.setState({ docnum: e.target.value })}
                required
              />
            </FormGroup>           
            <div className="d-flex justify-content-center py-3">
              <Button color="primary" type="submit" size="lg" block>
                <FormattedMessage id="Send"/>
              </Button>
            </div>
          </Form>
        </CardBody>
      </React.Fragment>
    )
  }
}

export default FindPw
