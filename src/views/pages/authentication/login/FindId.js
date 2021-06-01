import React from "react"
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap"
import Radio from "../../../../components/@vuexy/radio/RadioVuexy"
import Select from "react-select"
import { history } from "../../../../history"

const colourOptions = [
  { value: "개인회원", label: "개인회원" },
  { value: "기업회원", label: "기업회원" }
]


class FindId extends React.Component {
  state = {
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
            {/* <FormGroup className="d-flex justify-content-center pb-1">
              <div className="d-inline-block mr-1">
                <Radio label="이메일" defaultChecked={true} name="auth" />
              </div>
              <div className="d-inline-block">
                <Radio
                  label="휴대폰 인증"
                  defaultChecked={false}
                  name="auth"
                />
              </div>
            </FormGroup> */}
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

export default FindId
