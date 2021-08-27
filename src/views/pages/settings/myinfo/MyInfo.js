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
import { putmyinfo, putmyinfonfile, putMyInfoNonFile } from "../../../../redux/actions/auth/registerActions"
import { connect } from "react-redux"
import axios from "axios"
import previmg from "../../../../assets/img/portrait/small/Sample_User_Icon.png"
import { saveMyinfo, saveImage } from "../../../../redux/actions/cookies"
import { FormattedMessage } from "react-intl"

class MyInfo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      birthday:"",
      gender:"",
      phonenumber: "",
      userid: props.user.login.values.loggedInUser.username,
      filename: "",
      file : "",
      medicalpart: props.cookiemyinfo.medicalpart,
      medicalable: props.cookiemyinfo.medicalable,
      medicaldesc: props.cookiemyinfo.medicaldesc,
      userdesc: props.cookiemyinfo.userdesc,
      previewURL : "",
      previewmodal: false,
      getfilepath: "",
      getfilename: "",
      phonenumtoggle: false,
      vfauth: "N",
      mdfphonenum: "",
      authnum: ""
    }
  }

  saveRe4 = e => {
    e.preventDefault()
    this.props.saveMyinfo(
      this.state.medicalpart,
      this.state.medicalable,
      this.state.medicaldesc,
      this.state.userdesc
    )
    alert("의사정보가 저장되었습니다.")
  }

  previewModal = e => {
    this.setState(prevState => ({
      previewmodal: !prevState.previewmodal
    }))
  }

  togglePhonenum = e =>{
    this.setState(prevState => ({
      phonenumtoggle: !prevState.phonenumtoggle
    }))
  }


  postPhone = e => {
    e.preventDefault()
    axios
      .post("https://health.iot4health.co.kr:9300/signup-sms", {
        mobile_num: this.state.mdfphonenum
      })
      .then(response => {
        console.log(response);
        if(response.data.status === "200") {
          alert(response.data.message);
        } else{
          alert(response.data.message);
        }

      })
     
    
  }
  
  auth = e => {
    e.preventDefault()
    axios
        .get("https://health.iot4health.co.kr:9300/signup-sms", {
          params:{
            mobile_num: this.state.mdfphonenum,
            auth_code: Number(this.state.authnum)
          }
        })
        .then(response => {
          console.log(response);
          if(response.data.status === "200") {
            alert(response.data.message);
            this.setState({vfauth:"Y"})
          } else{
            alert(response.data.message);
          }
  
        })
  }

  

  componentDidMount() {
    if(this.props.cookiemyinfo.medicalable===""
    ){
      axios
          .get("https://health.iot4health.co.kr:9300/v1/doctor/account/user-info", {
            params: {
              user_id: this.state.userid
            }
          })
          .then(response => {
            console.log(response)
            let myinfo;
    
            if(response.data.status==="200") {
              myinfo = response.data.data
              if(myinfo.GENDER==='1' || myinfo.GENDER==='3') {
                this.setState({gender: "남성"})
              } else if(myinfo.GENDER==='2' || myinfo.GENDER==='4'){
                this.setState({gender: "여성"})
              } else{
                this.setState({gender: "성별정보가 저장되어있지 않습니다."})
              }
              this.setState({
                name: myinfo.F_NAME,
                phonenumber: myinfo.MOBILE_NUM,
                birthday: myinfo.BIRTH_DT,
                getfilepath: myinfo.FILE_PATH,
                getfilename: myinfo.FILE_NAME,
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
    if(this.state.vfauth==="Y"){
      if(this.state.filename==="") {
        this.props.putMyInfoNonFile(
          this.state.mdfphonenum,
          this.state.userid,
          this.state.medicalpart,
          this.state.medicalable,
          this.state.medicaldesc,
          this.state.medicalnum,
          this.state.userdesc
        )
      } else {
        this.props.putmyinfonfile(
          this.state.mdfphonenum,
          this.state.userid,
          this.state.filename,
          this.state.file,
          this.state.medicalpart,
          this.state.medicalable,
          this.state.medicaldesc,
          this.state.medicalnum,
          this.state.userdesc
        )
      }
    } else{
      if(this.state.filename==="") {
        this.props.putMyInfoNonFile(
          this.state.phonenumber,
          this.state.userid,
          this.state.medicalpart,
          this.state.medicalable,
          this.state.medicaldesc,
          this.state.medicalnum,
          this.state.userdesc
        )
      } else {
        this.props.putmyinfo(
          this.state.phonenumber,
          this.state.userid,
          this.state.filename,
          this.state.file,
          this.state.medicalpart,
          this.state.medicalable,
          this.state.medicaldesc,
          this.state.medicalnum,
          this.state.userdesc
        )
      }
      this.props.saveImage(
        this.state.previewURL
      )
    }
    
  }



  render() {
    let profile_preview = null;
    if(this.props.user.login.values.loggedInUser.file_path !== ''&&this.state.file===""&&this.state.filename===""){
      profile_preview =
        <img
          width="150px"
          height="150px" 
          src={"https://health.iot4health.co.kr:9300"+this.state.getfilepath
              +this.state.getfilename } 
          className="dz-img" 
          alt="" 
        />

    } 
    // else if (this.props.user.login.values.loggedInUser.file_name!==this.props.user.login.values.loggedInUser.username+"-"+this.state.filename
    //   && this.state.file !== "" && this.state.filename !== ""){
    //   profile_preview =
    //     <img
    //       width="150px"
    //       height="150px" 
    //       src={"https://health.iot4health.co.kr:9300/images/doc-img/"
    //           +this.props.user.login.values.loggedInUser.username+"-"+this.state.filename } 
    //       className="dz-img" 
    //       alt="" 
    //     />
    // }
    else if (this.state.file !== "" && this.state.filename !== "") {
      profile_preview = 
          <img
            width="150px"
            height="150px" 
            src={this.state.previewURL} 
            className="dz-img" 
            alt="" 
            />


    }else {
      profile_preview = 
          <img
            width="150px"
            height="150px" 
            src={previmg}
            className="dz-img"
            style={{borderRadius:"100%"}} 
            alt="" 
            />

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
                    <div className="col-2 align-self-center"><b>아이디</b></div>
                    <div className="col-3">{this.state.userid}</div>
                    <div className="col-1"></div>
                    <div className="col-1 align-self-center"><b>이름</b></div>
                    <div className="align-self-center">{this.state.name}</div>
                  </div> 
                  <div className="form-label-group d-flex">
                    <div className="col-2 align-self-center"><b>생년월일</b></div>
                    <div className="col-3">{this.state.birthday}</div>
                    <div className="col-1"></div>
                    <div className="col-1 align-self-center"><b>성별</b></div>
                    <div>{this.state.gender}</div>
                    <div className="col-2"></div>
                    <div className="col-2 align-self-center"><b>의사 면허번호</b></div>
                    <div>{this.state.medicalnum}</div>
                  </div>
                  <div className="form-label-group d-flex" >
                    <div className="col-2 align-self-center"><b>휴대폰 번호</b></div>
                    <div className="col-2 align-self-center">{this.state.phonenumber}</div>

                    <Button className="ml-1" color="primary" onClick={this.togglePhonenum}>
                      {this.state.phonenumtoggle===false?"변경":"취소"}
                    </Button>
                  </div>
                  {this.state.phonenumtoggle===false? null:
                  <div className="form-label-group d-flex" >
                    <div className="col-2 align-self-center"><b>변경정보</b></div>
                    <Input
                      className="col-2"
                      type="number"
                      placeholder="변경할 휴대폰 번호 입력"
                      required
                      value={this.state.mdfphonenum}
                      onChange={e => this.setState({ mdfphonenum: e.target.value })}
                    />   
                    <Button className="ml-1" color="primary" onClick={this.postPhone}>
                      인증 요청
                    </Button>
                    <Input
                      className="col-2 ml-1"
                      type="number"
                      placeholder="인증번호 입력"
                      required
                      value={this.state.authnum}
                      onChange={e => this.setState({ authnum: e.target.value })}
                    /> 
                    <Button className="ml-1" color="primary" onClick={this.auth}>
                      인증 확인
                    </Button>
                  </div>  
                  }  
                  <Form action="/" onSubmit={this.handleRegister}>
                    <FormGroup className="form-label-group d-flex justify-content-between">
                      <div className="col-2"><b>프로필 사진 등록<span className="text-danger">(필수)</span></b></div>
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
                      <div >{profile_preview}</div>
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
    cookiemyinfo: state.cookies.myinfo
  }
}
export default connect(mapStateToProps, {putmyinfo, putmyinfonfile, putMyInfoNonFile, saveMyinfo, saveImage})(MyInfo)
