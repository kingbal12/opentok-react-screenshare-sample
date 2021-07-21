import React from "react"
import {Form, FormGroup, Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap"
import { Check, ChevronRight } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { setTerm } from "../../../../redux/actions/auth/registerActions"
import "../../../../assets/scss/pages/authentication.scss"
import RegisterCheckbox from "./RegisterCheckbox"
import { connect } from "react-redux"
import classnames from "classnames"
import PerfectScrollbar from 'react-perfect-scrollbar'



class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      national_id: "1",
      term1: "Y",
      term2: "N",
      certifications: [
        {id: "1", label: "서비스 이용약관_내국인(필수)",          value: "1", isChecked: false},
        {id: "2", label: "라이프레코드 이용약관(필수)",           value: "2",  isChecked: false},
        {id: "3", label: "라이프레코드 개인정보처리방침(필수)",   value: "3",   isChecked: false},
        {id: "4", label: "위치기반서비스 이용약관(필수)",         value: "4",  isChecked: false},
        {id: "5", label: "개인정보 수집 및 이용동의(필수)",       value: "5",  isChecked: false},
        {id: "6", label: "개인정보 수집 및 이용동의(선택)",       value: "6",  isChecked: false},
        {id: "7", label: "민감정보 수집 및 이용동의(필수)",       value: "7",  isChecked: false},
        {id: "8", label: "민감정보 수집 및 이용동의(선택)",       value: "8",  isChecked: false},
        {id: "9", label: "고유식별 정도 수집 및 이용동의(필수)",  value: "9",  isChecked: false},
        {id: "10", label: "개인정보 제 3자 제공동의(필수)",      value: "10",  isChecked: false},
        {id: "11", label: "민감정보 제 3자 제공동의(필수)",      value: "11",  isChecked: false},
        {id: "12", label: "회원가입 유의사항(필수)",             value: "12",  isChecked: false}
      ],
      six:"N",
      eight: "N",
      

      termmodal: false

    }
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        national_id: tab
      })
    }

    if (tab==="1") {
      this.setState({term1:"Y",term2:"N"})
    } else {
      this.setState({term1:"N",term2:"Y"})
    }
  }
  
  handleAllChecked = e => {
    let certifications = this.state.certifications
    certifications.forEach(certification => (certification.isChecked = e.target.checked));
    this.setState({certifications: certifications})
    console.log(this.state)
  }

  handleCheckChieldElement = e => {
    let certifications = this.state.certifications
    certifications.forEach(certification => {
      if (certification.value === e.target.value)
        certification.isChecked = e.target.checked;
    });
    this.setState({
      certifications: certifications
    })
  }

  termModal = () => {
    this.setState(prevState => ({
      termmodal: !prevState.termmodal
    }))
  }

  setTerms = e => {
    e.preventDefault()
    if(this.state.certifications[5].isChecked===true && this.state.certifications[7].isChecked===false) {
      this.setState({six:"Y", eight:"N"}, ()=> this.props.setTerm(
        this.state.national_id,
        this.state.term1,
        this.state.term2,
        this.state.six, 
        this.state.eight
        ))
    } else if (this.state.certifications[5].isChecked===false && this.state.certifications[7].isChecked===true) {
      this.setState({six:"N", eight:"Y"}, ()=> this.props.setTerm(
        this.state.national_id,
        this.state.term1,
        this.state.term2,
        this.state.six, 
        this.state.eight
        ))
    } else if (this.state.certifications[5].isChecked===true && this.state.certifications[7].isChecked===true) {
      this.setState({six:"Y", eight:"Y"}, ()=> this.props.setTerm(
        this.state.national_id,
        this.state.term1,
        this.state.term2,
        this.state.six, 
        this.state.eight
        ))
    } else {
      this.props.setTerm(
        this.state.national_id,
        this.state.term1,
        this.state.term2,
        this.state.six, 
        this.state.eight
        )
    }
  }
 
 
  render() {
    return (
      <PerfectScrollbar style={{height:"100vh", alignItems:"center"}}>
      <Row className="m-0 justify-content-center">
        <Modal
          isOpen={this.state.termmodal}
          toggle={this.termModal}
          className="modal-dialog-centered modal-lg"
        >
          <ModalHeader toggle={this.termModal}>
            <span className="text-primary text-bold-600">서비스 이용 약관</span>
          </ModalHeader>
          <ModalBody>
            <iframe src="http://192.168.0.7/lv1/_agree/agree.all.html" style={{width:"100%", height: "50rem"}} />
          </ModalBody>
          <ModalFooter className="text-right">
            <Button color="primary" onClick={ this.termModal}>
              확인
            </Button>
          </ModalFooter>
        </Modal>
          <Col
          sm="6"
          xl="6"
          lg="6"
          md="6"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            
            <Row className="m-0">
              
              <Col lg="12" md="12" className="p-0">
                <Card className="rounded-0 mb-0 p-2">
                  <CardHeader className="pb-1 pt-50">
                    <CardTitle>
                      <h1>약관동의</h1>
                    </CardTitle>
                  </CardHeader>
                  <p className="ml-2">하이케어넷 사용을 위해 아래의 약관에 동의해 주세요!</p>
                  <Nav tabs className="px-3 justify-content-center">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.national_id === "1"
                        })}
                        onClick={() => {
                          this.toggle("1")
                        }}
                      >
                        <h5>내국인</h5>
                      </NavLink>
                    </NavItem>
                    <NavItem className="pt-1">
                      &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.national_id === "2"
                        })}
                        onClick={() => {
                          this.toggle("2")
                        }}
                      >
                        <h5>외국인</h5>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <CardBody className="pt-1 pb-50">
                      <Form action="/" onSubmit={this.handleRegister}>  
                        <FormGroup className="form-label-group allagree">
                          <Checkbox
                            className="pb-1"
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label="모든 약관에 동의"
                            value="checkedall"
                            onChange={this.handleAllChecked}
                            
                          />
                        </FormGroup>
                        <Row>
                          <Col lg="9" md="9">
                            {/* id값 오류 수정해야함 기능에는 문제가 없음 */}
                              {this.state.certifications.map(certification => {
                                return(
                                  <RegisterCheckbox
                                    handleCheckChieldElement={this.handleCheckChieldElement}
                                    {...certification}
                                  />
                                );
                              })}
                          </Col>
                          <Col lg="3" md="3">
                            <ChevronRight style={{marginTop: "0.2rem", cursor:"pointer"}} onClick={this.termModal}/><br/>
                            <ChevronRight style={{marginTop: "1.7rem", cursor:"pointer"}} onClick={this.termModal}/><br/>
                            <ChevronRight style={{marginTop: "1.7rem", cursor:"pointer"}} onClick={this.termModal}/><br/>
                            <ChevronRight style={{marginTop: "1.7rem", cursor:"pointer"}} onClick={this.termModal}/><br/>
                            <ChevronRight style={{marginTop: "1.7rem", cursor:"pointer"}} onClick={this.termModal}/><br/>
                            <ChevronRight style={{marginTop: "1.7rem", cursor:"pointer"}} onClick={this.termModal}/><br/>
                            <ChevronRight style={{marginTop: "1.7rem", cursor:"pointer"}} onClick={this.termModal}/><br/>
                            <ChevronRight style={{marginTop: "1.7rem", cursor:"pointer"}} onClick={this.termModal}/><br/>
                            <ChevronRight style={{marginTop: "1.7rem", cursor:"pointer"}} onClick={this.termModal}/><br/>
                            <ChevronRight style={{marginTop: "1.7rem", cursor:"pointer"}} onClick={this.termModal}/><br/>
                            <ChevronRight style={{marginTop: "1.7rem", cursor:"pointer"}} onClick={this.termModal}/><br/>
                            <ChevronRight style={{marginTop: "1.7rem", cursor:"pointer"}} onClick={this.termModal}/><br/>
                          </Col>
                        </Row> 
                        
                        <div className="pb-3 select"><small>선택 약관은 동의하지 않아도 회원가입이 가능합니다.</small></div>
                       
                        <div className="d-flex justify-content-between">
                          <Button.Ripple
                            color="primary"
                            outline
                            onClick={() => {
                              history.push("/pages/login")
                            }}
                          >
                            Login
                          </Button.Ripple>
                          <Button.Ripple 
                          disabled={
                            this.state.certifications[0].isChecked===true&&
                            this.state.certifications[1].isChecked===true&& 
                            this.state.certifications[2].isChecked===true&&
                            this.state.certifications[3].isChecked===true&&
                            this.state.certifications[4].isChecked===true&&
                            this.state.certifications[6].isChecked===true&&
                            this.state.certifications[8].isChecked===true&&
                            this.state.certifications[9].isChecked===true&&
                            this.state.certifications[10].isChecked===true&& 
                            this.state.certifications[11].isChecked===true
                            ?false:true}
                          color="primary" 
                          type="button"
                          onClick={this.setTerms}
                          >
                            다음단계
                          </Button.Ripple>
                        </div>
                      </Form>
                     
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      </PerfectScrollbar>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps, {setTerm}) (Register)
