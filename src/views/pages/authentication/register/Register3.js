import React from "react"
import {InputGroup, InputGroupAddon, InputGroupText, Form, FormGroup, Input, Label, Button,
  CardHeader,
  CardTitle,
  Card,
  CardBody,
  Row,
  Col,
  TabContent,
  TabPane
} from "reactstrap"
import { history } from "../../../../history"
import "../../../../assets/scss/pages/authentication.scss"
import { register3 } from "../../../../redux/actions/auth/registerActions"
import { connect } from "react-redux"

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      // userid: this.props.register.registeruser 클래스 형식에서 리덕스 스토어에서 데이터를 불러오는것을 볼것,
      userid: props.user.register.values.registeruser,
      // userid: "",
      hospitalname: "",
      businessnumber: "",
      zipcode: "",
      address1: "",
      address2: "",
      phonenumber: "",
      accountname: "",
      bankname: "",
      accountnumber: "",
  }
}
  // state = {
  //   // userid: this.props.register.registeruser 클래스 형식에서 리덕스 스토어에서 데이터를 불러오는것을 볼것,
  //   userid: "iot",
  //   hospitalname: "",
  //   businessnumber: "",
  //   zipcode: "",
  //   address1: "",
  //   address2: "",
  //   phonenumber: "",
  //   accountname: "",
  //   bankname: "",
  //   accountnumber: "",
  // }
  

  handleRegister = e => {
    e.preventDefault()
    this.props.register3(
      // this.user.register.values.registeruser,
      this.state.userid,
      this.state.hospitalname,
      this.state.businessnumber,
      this.state.zipcode,
      this.state.address1,
      this.state.address2,
      this.state.phonenumber,
      this.state.accountname,
      this.state.bankname,
      this.state.accountnumber
    )
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
                  <Form action="/" onSubmit={this.handleRegister}>
                    <FormGroup className="form-label-group">
                      <div>회원인증</div>            
                      <div><Button type="button">휴대폰 인증</Button></div>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <div>병원명 (필수)</div>
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="상호명을 입력해주세요"
                          required
                          value={this.state.hospitalname}
                          onChange={e => this.setState({ hospitalname: e.target.value })}
                        />   
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <div>사업자 등록번호 (필수)</div>
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="하이픈(-)을 생략하고 입력해주세요"
                          required
                          value={this.state.businessnumber}
                          onChange={e => this.setState({ businessnumber: e.target.value })}
                        />
                        <InputGroupAddon addonType="append"><Button color="secondary" type="button">중복확인</Button></InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <div>병원주소 (필수)</div>
                      <InputGroup className="mb-1">
                        <Input
                          type="text"
                          required
                          value={this.state.address1}
                          onChange={e => this.setState({ address1: e.target.value })}
                        />
                     
                        <Input
                          type="text"
                          required
                          value={this.state.zipcode}
                          onChange={e => this.setState({ zipcode: e.target.value })}
                        />
                        <InputGroupAddon addonType="append"><Button color="secondary" type="button">우편번호 검색</Button></InputGroupAddon>
                      </InputGroup>
                      
                      <InputGroup>
                        <Input
                          type="text"
                          required
                          value={this.state.address2}
                          onChange={e => this.setState({ address2: e.target.value })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <div>전화번호 (필수)</div>
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="하이픈(-)을 생략하고 입력해주세요"
                          required
                          value={this.state.phonenumber}
                          onChange={e => this.setState({ phonenumber: e.target.value })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <div>계좌정보</div>
                      <div className="row mb-1">
                        <div className="col-6">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>예금주</InputGroupText>
                            </InputGroupAddon>  
                            <Input
                              type="text"
                              required
                              value={this.state.accountname}
                              onChange={e => this.setState({ accountname: e.target.value })}
                            />
                          </InputGroup> 
                        </div>
                        <div className="col-6">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>은행명</InputGroupText>
                            </InputGroupAddon>  
                            <Input
                              type="text"
                              required
                              value={this.state.bankname}
                              onChange={e => this.setState({ bankname: e.target.value })}
                            />
                          </InputGroup> 
                        </div>
                      </div>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>계좌번호</InputGroupText>
                        </InputGroupAddon>  
                        <Input
                          type="text"
                          required
                          value={this.state.accountnumber}
                          onChange={e => this.setState({ accountnumber: e.target.value })}
                        />
                      </InputGroup> 
                    </FormGroup>
                    <div className="d-flex justify-content-between">
                      <Button
                      size="lg"
                      block
                      color="primary" 
                      type="submit"
                      >
                        저장하기
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

const mapStateToProps = state =>{
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps, {register3})(Register)
