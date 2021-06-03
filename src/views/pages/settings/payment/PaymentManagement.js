import React from "react"
import {InputGroup, Form, FormGroup, Input, Button,
  CustomInput,
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
