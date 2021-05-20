import React from "react"
import { Link } from "react-router-dom"
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Mail, Lock, Check } from "react-feather"
import { loginWithJWT } from "../../../../redux/actions/auth/loginActions"
import { connect } from "react-redux"
import { history } from "../../../../history"

class FindPw extends React.Component {
  state = {
    email: "",
    password: "",
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
            <FormGroup className="form-label-group position-relative">
              <Input
                type="text"
                placeholder="아이디"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup className="form-label-group position-relative">
              <Input
                type="text"
                placeholder="이름을 입력하세요"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup className="form-label-group position-relative">
              <Input
                type="text"
                placeholder="이메일 주소를 입력하세요"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                required
              />
            </FormGroup>   
            <div className="d-flex justify-content-center pt-4">
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
