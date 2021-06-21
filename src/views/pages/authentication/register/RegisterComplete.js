import React from "react"
import {InputGroup, Form, FormGroup, Button,
  CustomInput,
  CardHeader,
  CardTitle,
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap"

class RegisterComplete extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userid: "kingbal999@gmail.com",
      filename: "",
      file : "",
      medicalpart: "", 
      medicalable: "", 
      medicaldesc: "", 
      medicalnum: "", 
      userdesc: "",
      previewURL : "",
      registermodal: false
    }
  }


  render() {
    return (
      <Col className="m-0 p-0" style={{background:"linear-gradient(#7367f0, #dff8fc)", width:"1980px",height:"1050px"}}>
        <Row className="justify-content-center">
        <Col
          sm="4"
          xl="4"
          lg="4"
          md="4"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-0 mb-0 w-100" style={{marginTop:"70%"}}>
            <Row className="m-0">
              <Col lg="12" md="12" className="p-0">
                <Card className="rounded-0 mb-0 p-2">
                  <CardHeader className="pb-1 pt-50">
                    <CardTitle>
                      <h1>병원정보 입력하기</h1>
                    </CardTitle>
                  </CardHeader>   
                <CardBody className="pt-1 pb-50">              
                  <div className="col-12 d-flex justify-content-center mt-5">
                    <Button
                      size="lg"
                      color="primary" 
                      type="submit"
                    >
                      스케쥴 설정 시작하기
                    </Button>
                  </div>
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
