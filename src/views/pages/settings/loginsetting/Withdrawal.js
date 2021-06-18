import React from "react"
import {Form, FormGroup, Button,
  CardHeader,
  CardTitle,
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap"


import "../../../../assets/scss/pages/authentication.scss"
import { withdrawal } from "../../../../redux/actions/auth/registerActions"
import { connect } from "react-redux"
import { Check } from "react-feather"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"



class Withdrawal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userid: props.user.login.values.loggedInUser.username,
      checkwithdrawal: false
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
      this.props.withdrawal(this.state.userid)
    } else {
      alert("회원탈퇴 도중 오류가 발생하였습니다.")
    }
    
  }



  render() {
  
    return (
      <Row className="m-0 justify-content-center">
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
                    <h1>회원탈퇴</h1>
                  </CardTitle>
                </CardHeader>   
              <CardBody className="pt-1 pb-50">
                
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

                    <div className="d-flex justify-content-center mt-5">
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
export default connect(mapStateToProps, {withdrawal})(Withdrawal)
