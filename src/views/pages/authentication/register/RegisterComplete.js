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
import RegisterJWT from "./RegisterJWT"


class RegisterComplete extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userid: "kingbal999@gmail.com",
      // userid: props.user.register.values.registeruser,
      filename: "",
      file : "",
      medicalpart: "", 
      medicalable: "", 
      medicaldesc: "", 
      medicalnum: "", 
      userdesc: "",
      previewURL : "",
      // register4status: props.rg4status.register4status,
      registermodal: false
    }
  }

 

  render() {
    
    return (
      <Col className="m-0 p-0" style={{background:"linear-gradient(#7367f0, #dff8fc)", width:"1980px",height:"1050px"}}>
        <Row className="justify-content-center">
        <Col
          sm="6"
          xl="6"
          lg="6"
          md="6"
          className="d-flex justify-content-center"
        >
          
          <Card className="bg-authentication rounded-0 mb-0 w-100" style={{marginTop:"30%"}}>
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
                          <Row className="text-left col-4 mt-2"></Row>
                          <div className="col-6 mt-2">
                            <Button className="col-5 mr-1" color="primary" type="button" outline>수정</Button>
                            <Button className="col-5 ml-1" color="primary" type="button" outline>삭제</Button>
                          </div>
                        </div>
                        
                      </FormGroup> 
                      <FormGroup className="form-label-group d-flex justify-content-between no-gutters">
                        <div className="col-2 align-self-center"><b className="ml-1">진료과</b></div>
                        
                        
                        
                      </FormGroup>
                      
                      <FormGroup className="form-label-group d-flex justify-content-between">
                        <div className="col-2 align-self-center"><b>진료가능분야</b></div>
                        
                      </FormGroup>

                      

                    

                      <FormGroup className="form-label-group d-flex justify-content-between pt-1">
                        <div className="col-2 align-self-center"><b>면허번호</b></div>
                        
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
      </Row>
    </Col>
    )
  }
}


export default RegisterComplete
