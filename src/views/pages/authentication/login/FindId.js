import React from "react"
import { CardBody, FormGroup, Form, Input, Button, Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from "reactstrap"
import Select from "react-select"
import { history } from "../../../../history"
import axios from "axios"
import { FormattedMessage } from "react-intl"

const colourOptions = [
  { value: "개인회원", label: "개인회원" },
  { value: "기업회원", label: "기업회원" }
]


class FindId extends React.Component {
  state = {
    name: "",
    bt_date: "",
    phone:"",
    docnum:"",
    modal:false,
    modalmsg:"",
    nomodal:false
  }

  handleLogin = e => {
    e.preventDefault()
    axios
          .get("http://203.251.135.81:9300/v1/doctor/account/user-id", {
            params: {
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
                modal:true, 
                modalmsg:"사용중인 아이디는 "+response.data.data.USER_ID+"입니다."
              })
            } else {
              this.setState({
                nomodal:true
              })
            }
          })
  }

  findidModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  noModal = () => {
    this.setState(prevState => ({
      nomodal: !prevState.nomodal
    }))
  }

  go = e => {
    e.preventDefault()
    this.noModal()
    history.push("/pages/register1")
  }

  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>      
            {/* <FormGroup className="d-flex justify-content-center pb-1">
              <div className="d-inline-block mr-1">
                <Radio label="이메일" defaultChecked={true} name="auth" />
              </div>
              <div className="d-inline-block">
                <Radio
                  label="휴대폰 인증"
                  defaultChecked={false}
                  name="auth"
                />
              </div>
            </FormGroup> */}
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
                value={this.state.email}
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
        <Modal
          isOpen={this.state.modal}
          toggle={this.findidModal}
          className="modal-dialog-centered modal-sm"
        >
          <ModalHeader toggle={this.findidModal}>
            
          </ModalHeader>
          <ModalBody>
            {this.state.modalmsg}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.findidModal}>
              확인
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.nomodal}
          toggle={this.noModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.noModal}>
          </ModalHeader>
          <ModalBody>
            등록된 사용자가 없습니다.<br/>
            회원으로 가입하시겠어요?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.go}>
              회원가입 시작
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}

export default FindId
