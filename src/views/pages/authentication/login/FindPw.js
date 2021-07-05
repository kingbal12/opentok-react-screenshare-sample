import React from "react"
import { CardBody, FormGroup, Form, Input, Button, Label,Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, } from "reactstrap"
import { loginWithJWT } from "../../../../redux/actions/auth/loginActions"
import Select from "react-select"
import { history } from "../../../../history"
import axios from "axios"

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
    email: "",
    modalmsg:"",
  }

  searchemail = e => {
    e.preventDefault()
    axios
          .get("http://203.251.135.81:9300/v1/doctor/account/password", {
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
                modal:true,
                email: response.data.data.EMAIL
              })
              if(response.data.data.USER_ID===response.data.data.EMAIL){
                axios.post("http://203.251.135.81:9300/v1/doctor/account/password", {
                    user_id: this.state.userid,
                    email: this.state.email,
                    f_name: this.state.name,
                    birth_dt: this.state.bt_date,
                    mobile_num: this.state.phone,
                    medical_num: this.state.docnum
                })
                .then(response =>{
                  console.log(response)
                })
              }
              
            } else {
              this.setState({
                modal:true,
                modalmsg:""
              })
            }
          })
  }

  findEmailModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }
  
  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.modal}
          toggle={this.findEmailModal}
          className="modal-dialog-centered modal-sm"
        >
          <ModalHeader toggle={this.findEmailModal}>
            
          </ModalHeader>
          <ModalBody>
            {this.state.businessmodalmsg}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.findEmailModal}>
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
                확인
              </Button>
            </div>
          </Form>
        </CardBody>
      </React.Fragment>
    )
  }
}

export default FindPw
