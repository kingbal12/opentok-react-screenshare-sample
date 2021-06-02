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
// import Avatar from "../../../ui-elements/"



class ChagePassword extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userid: "kjh@iot4health.co.kr",
      // userid: props.user.register.values.registeruser,
      filename: "",
      file : "", 
      medicalpart: "", 
      medicalable: "", 
      medicaldesc: "", 
      medicalnum: "", 
      userdesc: "",
      previewURL : ""
    }
  }
  // 20210517 여기까지 작업함

  handleFileOnChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    let filename = event.target.files[0].name
    reader.onloadend = () => {
      this.setState({
        file : file,
        previewURL : reader.result,
        filename: filename
      })
    }
    reader.readAsDataURL(file);
  }

  handleRegister = e => {
    e.preventDefault()
    this.props.register4(
      this.state.userid,
      this.state.filename,
      this.state.file,
      this.state.medicalpart,
      this.state.medicalable,
      this.state.medicaldesc,
      this.state.medicalnum,
      this.state.userdesc,    
      this.state.previewURL
    )
  }



  render() {
    let profile_preview = null;
    if(this.state.file !== ''){
      profile_preview = 
      <div className="dz-thumb ">
        <div className="dz-thumb-inner">
          <img
            width="150px"
            height="150px" 
            src={this.state.previewURL} 
            className="dz-img" 
            // alt={file.name} 
            />
        </div>
      </div>
    
      // <CardImg style={{borderRadius:"100%"}} className='profile_preview'  src={this.state.previewURL} />
    }
    return (
      <Row className="m-0 justify-content-center">
      <Col
        sm="7"
        xl="7"
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
                    <h1>비밀번호 변경</h1>
                  </CardTitle>
                </CardHeader>   
              <CardBody className="pt-1 pb-50">
                
                  <Form action="/" onSubmit={this.handleRegister}>
                    <FormGroup className="form-label-group">
                      <div className="col-1 align-self-center"><b>아이디</b></div>
                      <div>kjh@iot4health.co.kr</div>
                      <Row className="justify-content-md-center">{profile_preview}</Row>
                    </FormGroup> 
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-2 align-self-center"><b>진료과</b></div>
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="TEXT를 입력해주세요"
                          required
                          value={this.state.medicalpart}
                          onChange={e => this.setState({ medicalpart: e.target.value })}
                        />   
                      </InputGroup>
                    </FormGroup>
                    
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-2 align-self-center"><b>진료가능분야</b></div>
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="TEXT를 입력해주세요"
                          required
                          value={this.state.medicalable}
                          onChange={e => this.setState({ medicalable: e.target.value })}
                        />   
                      </InputGroup>
                    </FormGroup>

                    <FormGroup className="form-label-group">
                      <div className="d-flex justify-content-between">
                        <div className="col-2 align-self-start"><b>약력</b></div>
                        <InputGroup>
                          <Input
                            type="textarea"
                            placeholder="TEXT를 입력해주세요"
                            required
                            rows="3"
                            value={this.state.medicaldesc}
                            onChange={e => this.setState({ medicaldesc: e.target.value })}
                          />   
                        </InputGroup>
                      </div>
                      <small
                        className={`counter-value float-right ${
                          this.state.medicaldesc.length > 400 ? "bg-danger" : ""
                        }`}
                      >
                        {`${this.state.medicaldesc.length}/400`}
                      </small>
                    </FormGroup>

                    <FormGroup className="form-label-group pt-1">
                      <div className="d-flex justify-content-between">
                        <div className="col-2 align-self-start"><b>자기소개</b></div>
                        <InputGroup>
                          <Input
                            type="textarea"
                            placeholder="TEXT를 입력해주세요"
                            required
                            rows="3"
                            value={this.state.userdesc}
                            onChange={e => this.setState({ userdesc: e.target.value })}
                          />   
                        </InputGroup>
                      </div>
                      <small
                        className={`counter-value float-right ${
                          this.state.userdesc.length > 400 ? "bg-danger" : ""
                        }`}
                      >
                        {`${this.state.userdesc.length}/400`}
                      </small>
                    </FormGroup>

                    <FormGroup className="form-label-group d-flex justify-content-between pt-1">
                      <div className="col-2 align-self-center"><b>면허번호</b></div>
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="TEXT를 입력해주세요"
                          required
                          value={this.state.medicalnum}
                          onChange={e => this.setState({ medicalnum: e.target.value })}
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
                        진료 승인요청
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
export default connect(mapStateToProps, {register4})(ChagePassword)
