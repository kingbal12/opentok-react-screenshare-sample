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
import { Check } from "react-feather"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
// import Avatar from "../../../ui-elements/"



class Withdrawal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userid: props.user.login.values.loggedInUser.username,
      checkwithdrawal: ""
    }
  }
  

  handlewithdrawal = e => {
    e.preventDefault()
    this.props.changepassword(
      this.state.userid,
      this.state.checkwithdrawal
    )
  }



  render() {
  
    return (
      <Row className="m-0 justify-content-center">
      <Col
        sm="3"
        xl="3"
        lg="3"
        md="3"
        className="d-flex justify-content-center"
      >
        
        <Card className="bg-authentication rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col lg="12" md="12" className="p-0">
              <Card className="rounded-0 mb-0 p-2">
                <CardHeader className="pb-1 pt-50">
                  <CardTitle className="d-flex col-12 justify-content-center">
                    <h1>회원탈퇴</h1>
                  </CardTitle>
                </CardHeader>   
              <CardBody className="pt-1 pb-50">
                
                  <Form>
                    <div>
                      <div><strong>내 정보 및 서비스 이용기록 삭제 안내</strong></div>
                      <div>
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />
                        내 정보 및 서비스 이용기록 삭제 안내<br />

                      </div>
                    </div>
                    <FormGroup className="form-label-group mt-2">
                     <Checkbox
                        color="primary"
                        icon={<Check className="vx-icon" size={16} />}
                        label="내용을 모두 확인하였습니다."
                        defaultChecked={false}
                        onChange={this.handleRemember}
                      />
                    </FormGroup>

                    <div className="d-flex justify-content-center mt-5">
                      <Button
                      size="lg"
                      color="primary" 
                      type="submit"
                      >
                        회원 탈퇴
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
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  }
}
export default connect(mapStateToProps, {register4})(Withdrawal)
