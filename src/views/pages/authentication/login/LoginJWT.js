import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CardBody, FormGroup, Form, Input, Button, FormFeedback } from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Mail, Lock, Check } from "react-feather"
import { loginWithJWT} from "../../../../redux/actions/auth/loginActions"
import { connect } from "react-redux"
import { history } from "../../../../history"
import { useCookies } from 'react-cookie'

// const [email, setEmail] = useState("");
// const [isRemember, setIsRemember] = useState(false);
// const [cookies, setCookie, removeCookie] = useCookies(['rememberEmail']);

// useEffect(() => {
//   if(cookies.rememberEmail !== undefined) {
//     setEmail(cookies.rememberEmail);
//     setIsRemember(true);
//   }
// }, []);

// const handleOnChange = (e) => {
//   setIsRemember(e.target.check);
//   if(e.target.check){
//     setCookie('rememberEmail', email, {maxAge: 2000});
//   } else {
//   removeCookie('rememberEmail');
//   }
// }

class LoginJWT extends React.Component {
  
  state = {
    email: "kingbal999@gmail.com",
    password: "123456",
    remember: false
  }
  

  handleLogin = e => {
    e.preventDefault()
    this.props.loginWithJWT(this.state)
  }

  handleRemember = e => {
    this.setState({
      remember: e.target.checked
    })
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
                invalid={this.state.email.length >= 6 ? false : true}
              />
              <FormFeedback>{this.state.email.length >= 6 ? "" : "아이디를 6자 이상입력하십시오"}</FormFeedback>
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
                invalid={this.state.password.length >= 6 ? false : true}
              />
              <FormFeedback>{this.state.password.length >= 6 ? "" : "비밀번호를 6자 이상입력하십시오"}</FormFeedback>
              <div className="form-control-position">
                <Lock size={15} />
              </div>
              {/* <Label>비밀번호</Label> */}
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="아이디 기억"
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
              <Link to="/pages/finduser">아이디 / 비밀번호 찾기</Link>
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
    values: state.auth
  }
}
export default connect(mapStateToProps, { loginWithJWT })(LoginJWT)
