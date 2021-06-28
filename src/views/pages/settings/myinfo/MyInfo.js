import React from "react"
import {InputGroup, Form, FormGroup, Input, Button,
  CustomInput,
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap"

import "../../../../assets/scss/pages/authentication.scss"
import { getMyInfo, register4 } from "../../../../redux/actions/auth/registerActions"
import { connect } from "react-redux"



class MyInfo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: "테스트의사",
      birthday:"1991.08.28",
      sex:"M",
      userid: props.user.login.values.loggedInUser.username,
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
  // 오류
  // componentDidMount() {
  //   this.props.getMyInfo(
  //     this.state.userid
  //   )
  // }
 
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
            alt="" 
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
                <CardBody className="pt-1 pb-50">
                  <div className="form-label-group d-flex">
                    <div className="col-1 align-self-center"><b>아이디</b></div>
                    <div>{this.state.userid}</div>
                  </div> 
                  <div className="form-label-group d-flex">
                    <div className="col-1 align-self-center"><b>이름</b></div>
                    <div>{this.state.name}</div>
                    <div className="col-2"></div>
                    <div className="col-1 align-self-center"><b>생일</b></div>
                    <div>{this.state.birthday}</div>
                    <div className="col-2"></div>
                    <div className="col-1 align-self-center"><b>성별</b></div>
                    <div>{this.state.sex}</div>
                  </div> 
                  <Form action="/" onSubmit={this.handleRegister}>
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-2 align-self-center"><b>프로필 사진 등록</b></div>
                      <InputGroup>
                        <CustomInput
                          className="col-11" 
                          type="file" 
                          accept="image/gif,image/jpeg,image/png" 
                          id="exampleCustomFileBrowser" 
                          name="customFile" 
                          label=""
                          onChange={this.handleFileOnChange}/> 
                      </InputGroup>
                      <Row className="justify-content-md-center">{profile_preview}</Row>
                    </FormGroup> 
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-2 align-self-center"><b>진료과</b></div>
                      <Input type="select" name="select" value={this.state.medicalpart}  onChange={e => this.setState({ medicalpart: e.target.value })}>
                        <option value="01">가정의학과</option>
                        <option value="02">내과</option>
                        <option value="03">산부인과</option>
                        <option value="04">피부과</option>
                        <option value="05">비뇨기과</option>
                        <option value="99">기타</option>
                      </Input>
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

                    <div className="d-flex justify-content-center">
                      <Button
                      size="lg"
                      
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

const mapStateToProps = state => {
  return {
    user: state.auth,
    // 오류
    // myinfo: state.auth.register.myinfoval.myinfo,
  }
}
export default connect(mapStateToProps, {getMyInfo, register4})(MyInfo)
