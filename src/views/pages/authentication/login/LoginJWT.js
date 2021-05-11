import React from "react"
import { Link } from "react-router-dom"
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Mail, Lock, Check } from "react-feather"
import { loginWithJWT } from "../../../../redux/actions/auth/loginActions"
import { connect } from "react-redux"
import { history } from "../../../../history"

class LoginJWT extends React.Component {
  state = {
    // 인성 api 연결
    // email: "i4h00001",
    // password: "1234",
    // remember: true


    // i4h api 연결
    email: "doctor@iges.co.kr",
    password: "user_pw",
    remember: true
  }

  handleLogin = e => {
    e.preventDefault()
    this.props.loginWithJWT(this.state)
  }
  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                placeholder="아이디"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Mail size={15} />
              </div>
              {/* <Label>아이디</Label> */}
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Lock size={15} />
              </div>
              {/* <Label>비밀번호</Label> */}
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="자동 로그인"
                defaultChecked={false}
                onChange={this.handleRemember}
              />
              
            </FormGroup>
            <div className="d-flex justify-content-center pb-1">
              <Button color="primary" type="submit" size="lg" block>
                로그인
              </Button>
            </div>
            
            
            <div className="d-flex justify-content-center pb-1">
              <Link to="/pages/forgot-password">아이디 찾기</Link>
              <div>&nbsp; &nbsp; |&nbsp; &nbsp;</div>
              <Link to="/pages/forgot-password">비밀번호 찾기</Link>
            </div>
            
            <div className="d-flex justify-content-center">
              <Button
                  color="primary"
                  outline
                  size="lg" 
                  block
                  onClick={() => {
                    history.push("/pages/register1")
                  }}
                >
                  회원가입
              </Button>
            </div>
          </Form>
        </CardBody>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    values: state.auth.login
  }
}
export default connect(mapStateToProps, { loginWithJWT })(LoginJWT)
