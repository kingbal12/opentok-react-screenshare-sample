import React from "react"
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap"
import { loginWithJWT } from "../../../../redux/actions/auth/loginActions"
import Radio from "../../../../components/@vuexy/radio/RadioVuexy"
import Select from "react-select"
import { history } from "../../../../history"

const colourOptions = [
  { value: "개인회원", label: "개인회원" },
  { value: "기업회원", label: "기업회원" }
]




class FindPw extends React.Component {
  state = {
    id: "",
    name: "",
    bt_date: "",
    phone:"",
    docnum:""
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
                value={this.state.id}
                onChange={e => this.setState({ id: e.target.value })}
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
                value={this.state.email}
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
              <Button color="primary" type="submit" size="lg" block
              onClick={() => {
                history.push("/pages/login")
              }}>
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
