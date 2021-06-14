import React from "react"
import {Form, FormGroup, Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col
} from "reactstrap"
import { Check } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import "../../../../assets/scss/pages/authentication.scss"
import RegisterCheckbox from "./RegisterCheckbox"
import ReactDOM from "react-dom"

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      certifications: [
        {id: 1, value: "서비스 이용약관(필수)", isChecked: false},
        {id: 2, value: "개인정보 수집 및 이용동의(필수)", isChecked: false},
        {id: 3, value: "개인정보 제3자 제공", isChecked: false},
        {id: 4, value: "마케팅 정보 수신(선택)", isChecked: false},
      ],
      push: false,
      email: false
    };
  }
  

  handleAllChecked = e => {
    let certifications = this.state.certifications
    certifications.forEach(certification => (certification.isChecked = e.target.checked));
    this.setState({certifications: certifications})
    console.log(this.state)
  }

  handleCheckChieldElement = e => {
    let certifications = this.state.certifications
    certifications.forEach(certification => {
      if (certification.value === e.target.value)
        certification.isChecked = e.target.checked;
    });
    this.setState({
      certifications: certifications
    })
  }
 
  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="4"
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
                      <h1>약관동의</h1>
                    </CardTitle>
                  </CardHeader>
                  <p className="ml-2">하이케어넷 사용을 위해 아래의 약관에 동의해 주세요!</p>
                  <CardBody className="pt-1 pb-50">
                      <Form action="/" onSubmit={this.handleRegister}>
                        <FormGroup className="form-label-group allagree">
                          <Checkbox
                            className="pb-1"
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="모든 약관에 동의"
                            value="checkedall"
                            onChange={this.handleAllChecked}
                          />
                        </FormGroup>
                        {/* id값 오류 수정해야함 기능에는 문제가 없음 */}
                          {this.state.certifications.map(certification => {
                            return(
                              <RegisterCheckbox
                                handleCheckChieldElement={this.handleCheckChieldElement}
                                {...certification}
                              />
                            );
                          })}
                        <div className="pb-3 select"><small>선택 약관은 동의하지 않아도 회원가입이 가능합니다.</small></div>
                        {/* <FormGroup className="row pl-1 form-label-group">
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="앱 푸시알림"
                            defaultChecked={false}
                            onChange={this.handleRemember}
                          />
                          <Checkbox
                            className="pl-1"
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="이메일"
                            defaultChecked={false}
                            onChange={this.handleRemember}
                          />
                        </FormGroup> */}
                        <div className="d-flex justify-content-between">
                          <Button.Ripple
                            color="primary"
                            outline
                            onClick={() => {
                              history.push("/pages/login")
                            }}
                          >
                            Login
                          </Button.Ripple>
                          <Button.Ripple 
                          disabled={
                            this.state.certifications[0].isChecked===true&&
                            this.state.certifications[1].isChecked===true&& 
                            this.state.certifications[2].isChecked===true 
                            ?false:true}
                          color="primary" 
                          type="button"
                          onClick={() => {
                            history.push("/pages/register2")
                          }}>
                            다음단계
                          </Button.Ripple>
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

const mapStateToProps  = state => {
  return {
    values : state.register1
  }
}
export default Register
