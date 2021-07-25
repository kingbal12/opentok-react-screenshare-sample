import React from "react"
import {Form, FormGroup, Button,
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
import axios from "axios"
import "../../../../assets/scss/pages/authentication.scss"
import { connect } from "react-redux"
import { Check } from "react-feather"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { history } from "../../../../history"



class Withdrawal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userid: props.user.login.values.loggedInUser.username,
      checkwithdrawal: false,
      modal: false
    }
  }
  

  handleChkWithdrawal = e => {
    this.setState({
      checkwithdrawal: e.target.checked
    })
  }

  handlewithdrawal = e => {
    e.preventDefault()
    if(this.state.checkwithdrawal===true) {
      axios
      .put("http://203.251.135.81:9300/v1/doctor/account/user-state", {
          user_id : this.state.userid, 
          user_state : "9",
        }
      )
      .then(response => {
        console.log(response);
        if(response.data.status === "200") {
          this.setState({modal:true})
        } else {
          alert(response.data.message);
        }

      })
    }
    
  }
  Modal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }
  goLogin = e => {
    e.preventDefault()
    history.push("/")
  }


  render() {
  
    return (
      <Row className="m-0 justify-content-center">
        <Modal
          isOpen={this.state.modal}
          toggle={this.Modal}
          className="modal-dialog-centered modal-sm"
        >
          <ModalHeader toggle={this.Modal}>
            
          </ModalHeader>
          <ModalBody>
            회원 탈퇴가 완료되었습니다.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.goLogin}>
              확인
            </Button>{" "}
          </ModalFooter>
        </Modal>
      <Col
        sm="12"
        xl="12"
        lg="12"
        md="12"
        className="d-flex justify-content-center"
      >
        
        <Card className="bg-authentication rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col lg="12" md="12" className="p-0">
              <Card className="rounded-0 mb-0 p-2">
                <CardHeader className="pb-1 pt-50">
                  <CardTitle>
                    <h3 className="text-bold-600">회원탈퇴</h3>
                  </CardTitle>
                </CardHeader>   
              <CardBody className="pt-1 pb-50">
                <Row>
                  <Col lg="2" md="12">
                  </Col>
                  <Col lg="8" md="12">
                  <Form>
                    <div>
                      <div><strong>내 정보 및 서비스 이용기록 삭제 안내</strong></div>
                      <div>
                        

                      </div>
                    </div>
                    <FormGroup className="form-label-group mt-2">
                     <Checkbox
                        color="primary"
                        icon={<Check className="vx-icon" size={16} />}
                        label="상기 내용을 모두 확인하였습니다."
                        defaultChecked={false}
                        onChange={this.handleChkWithdrawal}
                      />
                    </FormGroup>

                    <div className="text-right">
                      <Button
                      size="lg"
                      color="primary" 
                      type="button"
                      disabled={this.state.checkwithdrawal===true?false:true}
                      onClick={this.handlewithdrawal}
                      >
                        회원 탈퇴
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
export default connect(mapStateToProps)(Withdrawal)
