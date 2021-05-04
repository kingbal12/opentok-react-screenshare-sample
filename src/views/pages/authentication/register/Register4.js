import React from "react"
import {InputGroup, InputGroupAddon, InputGroupText, Form, FormGroup, Input, Label, Button,
  CustomInput,
  CardHeader,
  CardTitle,
  Card,
  CardBody,
  Row,
  Col,
  TabContent,
  TabPane
} from "reactstrap"
// import classnames from "classnames"
// import RegisterFirebase from "./RegisterFirebase"
// import RegisterAuth0 from "./RegisterAuth0"
import RegisterJWT from "./RegisterJWT"
// import registerImg from "../../../../assets/img/pages/register.jpg"
import "../../../../assets/scss/pages/authentication.scss"

import { history } from "../../../../history"

class Register extends React.Component {
  state = {
    activeTab: "1"
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
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
                    <h1>병원정보 입력하기</h1>
                  </CardTitle>
                </CardHeader>   
              <CardBody className="pt-1 pb-50">
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                  <Form action="/" onSubmit={this.handleRegister}>
                    <FormGroup className="form-label-group">
                      <div><b>프로필 사진 등록</b></div>
                      <InputGroup>
                        <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" label=""/> 
                      </InputGroup>
                    </FormGroup> 

                    <FormGroup className="form-label-group">
                      <div><b>진료과</b></div>
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="TEXT를 입력해주세요"
                          required
                          value={this.state.name}
                          onChange={e => this.setState({ name: e.target.value })}
                        />   
                      </InputGroup>
                    </FormGroup>
                    
                    <FormGroup className="form-label-group">
                      <div><b>진료가능분야</b></div>
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="TEXT를 입력해주세요"
                          required
                          value={this.state.name}
                          onChange={e => this.setState({ name: e.target.value })}
                        />   
                      </InputGroup>
                    </FormGroup>

                    <FormGroup className="form-label-group">
                      <div><b>약력</b></div>
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="TEXT를 입력해주세요"
                          required
                          value={this.state.name}
                          onChange={e => this.setState({ name: e.target.value })}
                        />   
                      </InputGroup>
                    </FormGroup>

                    <FormGroup className="form-label-group">
                      <div><b>자기소개</b></div>
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="TEXT를 입력해주세요"
                          required
                          value={this.state.name}
                          onChange={e => this.setState({ name: e.target.value })}
                        />   
                      </InputGroup>
                    </FormGroup>

                    <FormGroup className="form-label-group">
                      <div><b>면허번호</b></div>
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="TEXT를 입력해주세요"
                          required
                          value={this.state.name}
                          onChange={e => this.setState({ name: e.target.value })}
                        />   
                      </InputGroup>
                    </FormGroup>

                    <div className="d-flex justify-content-between">
                      <Button
                      size="lg"
                      block
                      color="primary" 
                      type="button"
                      onClick={() => {
                        history.push("/schedule")
                      }}>
                        진료 승인요청
                      </Button>
                    </div>
                  </Form>
                  </TabPane>
                </TabContent>
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
export default Register
