import React from "react"
import {InputGroup, Form, FormGroup, Input, Button,
  CustomInput,
  CardHeader,
  CardTitle,
  Card,
  CardBody,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"
// import classnames from "classnames"
// import RegisterFirebase from "./RegisterFirebase"
// import RegisterAuth0 from "./RegisterAuth0"
import RegisterJWT from "./RegisterJWT"
// import registerImg from "../../../../assets/img/pages/register.jpg"
import "../../../../assets/scss/pages/authentication.scss"
// import { register4 } from "../../../../redux/actions/auth/registerActions"
import { connect } from "react-redux"
import previmg from "../../../../assets/img/portrait/small/Sample_User_Icon.png"
import { history } from "../../../../history"
import Select from "react-select"
import axios from "axios"

//  '01' : 가정의학과, '02' : 내과 
//  '03' : 산부인과, '04' : 피부과 
//  '05' : 비뇨기과, '99' : 기타
const medicalpartOptions = [
  { value: "01", label: "가정의학과" },
  { value: "02", label: "내과" },
  { value: "03", label: "산부인과" },
  { value: "04", label: "피부과" },
  { value: "05", label: "비뇨기과" },
  { value: "99", label: "기타"}
]

class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      // userid: "kingbal13@naver.com",
      userid: props.user.register.values.registeruser,
      filename: "",
      file : "",
      medicalpart: "01", 
      medicalable: "", 
      medicaldesc: "", 
      medicalnum: "", 
      userdesc: "",
      previewURL : "",
      registermodal: false
    }
  }

  handleFileOnChange = e => {
    
    e.preventDefault();
    
    let reader = new FileReader();
    let file = e.target.files[0];
    let filename = e.target.files[0].name
    reader.onloadend = () => {
      this.setState({
        file : file,
        previewURL : reader.result,
        filename: filename
      })
    }
    reader.readAsDataURL(file);
    e.target.value = null;
  }

  

  handleRegister = e => {
    e.preventDefault()
    this.register4(
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

  register4 = (userid, filename, file, medicalpart, medicalable, medicaldesc, medicalnum, userdesc) => {
    let data = new FormData();
    data.append('user_id', userid);
    data.append('file_name', file);
    data.append('medical_part', medicalpart);
    data.append('medical_able', medicalable);
    data.append('medical_desc', medicaldesc);
    data.append('medical_num', medicalnum);
    data.append('user_desc', userdesc)

    axios
      .put("http://203.251.135.81:9300/v1/doctor/account/user-info", data)
      .then(response => {
        let register4status;

        if(response.data.status === "200") {
          register4status = response.data.status
          console.log(register4status)
          this.registerModal()

        } else {
        
    
          alert(response.data.message);
        }

      })
  }
  

  viewlog = e => {
    e.preventDefault()
    console.log(this.state)
  }

  registerModal = () => {
    this.setState(prevState => ({
      registermodal: !prevState.registermodal
    }))
  }

  goRegisterComplete = e => {
    e.preventDefault()
    history.push("/pages/registtercomplete")
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
    } else {
      profile_preview = 
      <div className="dz-thumb ">
        <div className="dz-thumb-inner">  
          <img
            width="150px"
            height="150px" 
            src={previmg}
            className="dz-img"
            style={{borderRadius:"100%"}} 
            alt="" 
            />
        </div>
      </div>
    }
    return (
      <Row className="m-0 justify-content-center">
      <Col
        sm="8"
        xl="8"
        lg="8"
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
                      <div className="d-flex justify-content-between">
                        <div className="col-2 align-self-start"><b>프로필 사진 등록</b></div>
                        <InputGroup>
                          <CustomInput 
                            type="file" 
                            accept="image/gif,image/jpeg,image/png" 
                            id="exampleCustomFileBrowser" 
                            name="customFile" 
                            label=""
                            onChange={this.handleFileOnChange}/> 
                        </InputGroup>
                      </div>
                      
                      <div className="d-flex justify-content-between">
                        <div className="col-2"></div>
                        <Row className="text-left col-4 mt-2">{profile_preview}</Row>
                        <div className="col-6 mt-2">
                          {/* <Input type="file" accept="image/gif,image/jpeg,image/png"  id="inputFile" name="fileInpur" />  */}
                          <Button className="col-5 mr-1" color="primary" type="button" outline>수정</Button>
                          <Button className="col-5 ml-1" color="primary" type="button" outline>삭제</Button>
                        </div>
                      </div>
                      
                    </FormGroup> 
                    <FormGroup className="form-label-group d-flex justify-content-between no-gutters">
                      <div className="col-2 align-self-center"><b className="ml-1">진료과</b></div>
                      
                      <Input type="select" name="select" value={this.state.medicalpart}  onChange={e => this.setState({ medicalpart: e.target.value })}>
                        <option value="01">가정의학과</option>
                        <option value="02">내과</option>
                        <option value="03">산부인과</option>
                        <option value="04">피부과</option>
                        <option value="05">비뇨기과</option>
                        <option value="99">기타</option>
                      </Input>
                      {/* 차후 적용시킬 select 
                      <Col>
                        <Select
                          classNamePrefix="select"
                          defaultValue={medicalpartOptions[0]}
                          name="loading"
                          options={medicalpartOptions}
                          // isLoading={true}
                        />
                      </Col>
                       */}
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

                    <div className="col-12 d-flex justify-content-between mt-5">
                      <Button
                        outline
                        size="lg"
                        color="dark" 
                        type="button"
                      >
                        이전단계
                      </Button>
                      <Button
                        outline
                        size="lg"
                        color="dark" 
                        type="button"
                      >
                        임시저장
                      </Button>
                      <Button
                        outline
                        size="lg"
                        color="dark" 
                        type="button"
                        onClick={this.viewlog}
                      >
                        미리보기
                      </Button>
                      <Button
                        size="lg"
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

      <Modal
        isOpen={this.state.registermodal}
        toggle={this.registerModal}
        className="modal-dialog-centered modal-sm"
      >
        <ModalHeader toggle={this.registerModal}>
          
        </ModalHeader>
        <ModalBody>
          진료승인을 요청하였습니다.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={ this.goRegisterComplete}>
            확인
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  }
}
export default connect(mapStateToProps)(Register)
