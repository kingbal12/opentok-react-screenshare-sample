import React from "react"
import {InputGroup, Form, Label, FormGroup, Input, Button,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardHeader,
  CardTitle,
  Card,
  CardBody,
  Row,
  Col,
  CardImg 
} from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"
// import classnames from "classnames"
// import RegisterFirebase from "./RegisterFirebase"
// import RegisterAuth0 from "./RegisterAuth0"

// import registerImg from "../../../../assets/img/pages/register.jpg"
import "../../../../assets/scss/pages/authentication.scss"
import { register4 } from "../../../../redux/actions/auth/registerActions"
import { connect } from "react-redux"
import { history } from "../../../../history"
import DataTableCustom from "./DataTableCustom"
// import Avatar from "../../../ui-elements/"



class PaymentManagement extends React.Component {
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
    this.props.changepassword(
      this.state.newpassword,
    )
  }

  pamentcheck = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }



  render() {
  
    return (
      <Row className="m-0 justify-content-center">
      <Col
        sm="7"
        xl="7"
        lg="10"
        md="8"
        className="d-flex justify-content-center"
      >
        
        <Card className="bg-authentication rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col lg="12" md="12" className="p-0">
              <Card className="rounded-0 mb-0 p-2">
                <CardHeader className="pb-1 pt-50">
                  <CardTitle>
                    <h1>진료비 청구내역</h1>
                    <div>2021.03.31 기준</div>
                  </CardTitle>
                </CardHeader>   
              <CardBody className="pt-1 pb-50">    
                <div className="col-12 text-right mt-5 pb-3" style={{borderBottom:"solid silver 1px"}}>
                  <h1>0원</h1>
                </div>
                <div className="col-12 mt-3">
                  <Button
                  size="lg"
                  color="primary" 
                  type="button"
                  outline
                  >
                    이번달 내역
                  </Button>
                </div>
                <div className="col-12 mt-3">
                  <DataTableCustom/>
                </div>              
                <div className="d-flex col-12 mt-5">
                  <div className="col-7"></div>
                  <div className="col-5 d-flex justify-content-between">
                    <Button 
                    color="primary" 
                    type="button"
                    >
                      내역서 다운로드
                    </Button>
                    <Button
                    color="primary" 
                    type="button"
                    onClick={this.pamentcheck}
                    >
                      세금계산서 발행
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
            </Col>
          </Row>    
        </Card>
        {/* 주소찾기 Modal창 */}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <div className="d-flex justify-content-center mt-4">
            <h2>세금계산서를 발행하시겠습니까?</h2>
          </div>
          <div className="d-flex justify-content-center">
            <h5>아래의 정보들이 맞는지 확인해주세요.</h5>
          </div>
          <ModalBody>
            <div className="ml-4 mr-5 mt-5" style={{fontSize:"1.2rem"}}>
              <div className="d-flex justify-content-between ml-4 mr-5">
                <div className="col-8"><b>과세형태</b></div>
                <div className="text-left">면세</div>
              </div>
              <div className="d-flex justify-content-between ml-4 mr-5 mt-2">
                <div className="col-8"><b>공급가액 합계</b></div>
                <div className="text-left">0원</div>
              </div>
              <div className="d-flex justify-content-between ml-4 mr-5 mt-2 md-2">
                <div className="col-8"><b>새액 합계</b></div>
                <div className="text-left">0원</div>
              </div>
            </div>
            <div className="mx-4 my-2" style={{borderBottom:"solid silver 1px"}}></div>
            <div className="ml-4 mr-5" style={{fontSize:"1.2rem"}}>
              <div className="d-flex justify-content-between ml-4 mr-5">
                <div className="col-8"><b>합계금액</b></div>
                <div className="text-left">0원</div>
              </div>
            </div>     
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.pamentcheck}>
              예
            </Button>
            <Button color="primary" outline onClick={this.pamentcheck}>
              아니오
            </Button>
          </ModalFooter>
        </Modal>
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
export default connect(mapStateToProps, {register4})(PaymentManagement)
