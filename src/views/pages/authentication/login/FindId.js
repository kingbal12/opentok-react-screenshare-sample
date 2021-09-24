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
  { value: <FormattedMessage id="privmem" />, label: <FormattedMessage id="privmem" /> },
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
          .get("https://health.iot4health.co.kr:9300/v1/doctor/account/user-id", {
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
                modalmsg: response.data.data.USER_ID
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
              <FormattedMessage id="EnterName">
                { (EnterName) =>
                <Input
                  placeholder={EnterName}
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                  required
                />
                }
              </FormattedMessage>
            </FormGroup>
            <FormGroup className="form-label-group position-relative">
              <FormattedMessage id="EnterDOB">
                { (EnterDOB) =>
                <Input
                  type="text"
                  placeholder={EnterDOB}
                  value={this.state.bt_date}
                  onChange={e => this.setState({ bt_date: e.target.value })}
                  required
                />
                }
              </FormattedMessage>
            </FormGroup>
            <FormGroup className="form-label-group position-relative">
              <FormattedMessage id="EnterPhonenum">
                { (EnterPhonenum) =>
                <Input
                  type="text"
                  placeholder={EnterPhonenum}
                  value={this.state.phone}
                  onChange={e => this.setState({ phone: e.target.value })}
                  required
                />
                }
              </FormattedMessage>
            </FormGroup>  
            <FormGroup className="form-label-group position-relative">
              <FormattedMessage id="EnterLicense">
                { (EnterLicense) =>
                <Input
                  type="text"
                  placeholder={EnterLicense}
                  value={this.state.docnum}
                  onChange={e => this.setState({ docnum: e.target.value })}
                  required
                />
                }
              </FormattedMessage>
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
            <FormattedMessage id="사용중인 아이디1"/> {this.state.modalmsg} <FormattedMessage id="사용중인 아이디2"/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.findidModal}>
              <FormattedMessage id="확인"/>
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
            <FormattedMessage id="아이디없음1"/><br/>
            <FormattedMessage id="아이디없음2"/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.go}>
              <FormattedMessage id="회원가입 시작"/>
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}

export default FindId
