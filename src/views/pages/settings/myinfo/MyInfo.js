import React from "react"
import {InputGroup, 
  Form, 
  FormGroup, 
  Input, 
  Button,
  CustomInput,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap"

import "../../../../assets/scss/pages/authentication.scss"
import { putmyinfo, putmyinfonfile } from "../../../../redux/actions/auth/registerActions"
import { connect } from "react-redux"
import axios from "axios"
import previmg from "../../../../assets/img/portrait/small/Sample_User_Icon.png"
import { saveRegister4 } from "../../../../redux/actions/cookies"
import { FormattedMessage } from "react-intl"

class MyInfo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      birthday:"1991.08.28",
      gender:"",
      userid: props.user.login.values.loggedInUser.username,
      filename: "",
      file : "",
      medicalpart: props.cookiere4.medicalpart,
      medicalable: props.cookiere4.medicalable,
      medicaldesc: props.cookiere4.medicaldesc,
      medicalnum: props.cookiere4.userdesc,
      userdesc: props.cookiere4.previewURL,
      previewURL : "",
      previewmodal: false
    }
  }

  saveRe4 = e => {
    e.preventDefault()
    this.props.saveRegister4(
      this.state.medicalpart,
      this.state.medicalable,
      this.state.medicaldesc,
      this.state.medicalnum,
      this.state.userdesc,
      this.state.previewURL,
    )
    alert("의사정보가 저장되었습니다.")
  }

  previewModal = e => {
    this.setState(prevState => ({
      previewmodal: !prevState.previewmodal
    }))
  }

  componentDidMount() {
    if(this.props.cookiere4.medicalpart===""){
      axios
          .get("http://203.251.135.81:9300/v1/doctor/account/user-info", {
            params: {
              user_id: this.state.userid
            }
          })
          .then(response => {
            let myinfo;
    
            if(response.data.status==="200") {
              myinfo = response.data.data
              if(myinfo.GENDER==='1' || myinfo.GENDER==='3') {
                this.setState({gender: "M"})
              } else if(myinfo.GENDER==='2' || myinfo.GENDER==='4'){
                this.setState({gender: "F"})
              } else{
                this.setState({gender: "성별정보가 저장되어있지 않습니다."})
              }
              this.setState({
                name: myinfo.F_NAME,
                medicalpart: myinfo.MEDICAL_PART,
                medicalable: myinfo.MEDICAL_ABLE,
                medicaldesc: myinfo.MEDICAL_DESC,
                medicalnum: myinfo.MEDICAL_NUM,
                userdesc: myinfo.USER_DESC
              })
            } else {
              alert("고객정보를 불러오지 못하였습니다.")
            }
          })
      }
    }
 
  
  
 
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
    if(this.state.filename===""){
      this.props.putmyinfonfile(
        this.state.userid,
        this.state.medicalpart,
        this.state.medicalable,
        this.state.medicaldesc,
        this.state.medicalnum,
        this.state.userdesc,    
        this.state.previewURL
      )
    } else{
      this.props.putmyinfo(
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
    
  }



  render() {
    let profile_preview = null;
    if(this.props.user.login.values.loggedInUser.file_path !== ''&&this.state.file===""&&this.state.filename===""){
      profile_preview = 
      <div className="dz-thumb ">
        <div className="dz-thumb-inner">
          <img
            width="150px"
            height="150px" 
            src={"http://203.251.135.81:9300"+this.props.user.login.values.loggedInUser.file_path
                +this.props.user.login.values.loggedInUser.file_name } 
            className="dz-img" 
            alt="" 
            />
        </div>
      </div>
    } else if (this.state.file !== "" && this.state.filename !== "") {
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

    }else {
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
        sm="12"
        xl="12"
        lg="12"
        md="12"
        className="d-flex justify-content-center  m-0 p-0"
      >
        
        <Card className="bg-authentication rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col lg="12" md="12" className="p-0">
              <Card className="rounded-0 mb-0 p-2">
                <CardHeader className="pt-50">
                  <CardTitle>
                    <h3 className="text-bold-600">개인정보 수정하기</h3>
                  </CardTitle>
                </CardHeader>     
                <CardBody className="pt-1 pb-50">
                  <Row>
                  <Col lg="2" md="12">
                  </Col>
                  <Col lg="8" md="12">
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
                    <div>{this.state.gender}</div>
                  </div> 
                  <Form action="/" onSubmit={this.handleRegister}>
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-2 align-self-center"><b>프로필 사진 등록<span className="text-danger">(필수)</span></b></div>
                      <InputGroup>
                        <CustomInput
                          className="col-11" 
                          type="file" 
                          accept="image/gif,image/jpeg,image/png" 
                          id="exampleCustomFileBrowser" 
                          name="customFile" 
                          label="  "
                          onChange={this.handleFileOnChange}/> 
                      </InputGroup>
                      <Row className="justify-content-md-center">{profile_preview}</Row>
                    </FormGroup> 
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-2 align-self-center"><b>진료과<span className="text-danger">(필수)</span></b></div>
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
                      <div className="col-2 align-self-center"><b>진료가능분야<span className="text-danger">(필수)</span></b></div>
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
                        <div className="col-2 align-self-start"><b>약력<span className="text-danger">(필수)</span></b></div>
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

                    <div className="text-right">
                      <Button
                        className='mr-1'
                        outline
                        color="primary" 
                        type="button"
                        onClick={this.saveRe4}
                      >
                        <FormattedMessage id="Drafts"/>
                      </Button>
                      <Button
                        className="mr-1"
                        outline
                        color="primary" 
                        type="button"
                        onClick={this.previewModal}
                      >
                        <FormattedMessage id="Preview"/>
                      </Button>
                      <Button
                      
                      color="primary" 
                      type="submit"
                      >
                        저장하기
                      </Button>

                    </div>
                    
                  </Form>
                  </Col>
                  <Col lg="2" md="12">
                  </Col>
                </Row>
              </CardBody>
            </Card>
            </Col>
          </Row>
          
        </Card>
      </Col>
      <Modal
        isOpen={this.state.previewmodal}
        toggle={this.previewModal}
        className="modal-dialog-centered modal-sm"
      >
        <ModalBody className="mx-1">
          <Row className="d-flex justify-content-center">
            {profile_preview}
          </Row>
          <Row className="d-flex justify-content-center">
            <h5 className="text-bold-600">{this.state.name}</h5>
          </Row>
          <Row className="d-flex justify-content-center">
            {this.state.medicalpart==="01"?"가정의학과":
             this.state.medicalpart==="02"?"내과":
             this.state.medicalpart==="03"?"산부인과":
             this.state.medicalpart==="04"?"피부과":
             this.state.medicalpart==="05"?"비뇨기과":
             this.state.medicalpart==="99"?"기타": null}
          </Row>
          <Card className="mt-1">
            <CardBody className="pt-1">
              <Row>
                <h5 className="text-bold-400 ">진료분야</h5>
              </Row>
              <Row>
                {this.state.medicalable}
              </Row>
            </CardBody>
          </Card>
          <Card className="mt-1">
            <CardBody className="pt-1">
              <Row>
                <h5 className="text-bold-400 ">약력</h5>
              </Row>
              <Row>
                <pre>
                  {this.state.medicaldesc}
                </pre>
              </Row>
            </CardBody>
          </Card>
          <Card className="mt-1">
            <CardBody className="pt-1">
              <Row>
                <h5 className="text-bold-400 ">자기소개</h5>
              </Row>
              <Row>
                <pre>
                  {this.state.userdesc}
                </pre>
              </Row>
            </CardBody>
          </Card>
          
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.previewModal}>
            확인
          </Button>
        </ModalFooter>
      </Modal>
    </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    cookiere4: state.cookies.register4
  }
}
export default connect(mapStateToProps, {putmyinfo, putmyinfonfile, saveRegister4})(MyInfo)
