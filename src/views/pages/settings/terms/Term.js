import React from "react"
import {
  CardHeader,
  CardTitle,
  Card,
  CardBody,
  Row,
  Col,

} from "reactstrap"
import "../../../../assets/scss/pages/authentication.scss"
import { FormattedMessage } from "react-intl"



class Term extends React.Component {
  render() {
    return (
      <Row className="m-0 p-0 justify-content-center">
      <Col
        sm="12"
        xl="12"
        lg="12"
        md="12"
        className="d-flex justify-content-center m-0 p-0"
      >
        
        <Card className="bg-authentication rounded-0 mb-0 w-100 p-0 m-0">
          <Row className="m-0">
            <Col lg="12" md="12" className="p-0">
              <Card className="rounded-0 mb-0 p-2">
                <CardHeader className="pb-1 pt-50">
                  <CardTitle>
                      <h3 className="text-bold-600"><FormattedMessage id="이용약관"/></h3>
                  </CardTitle>
                </CardHeader>   
              <CardBody className="px-6 pb-50">
                <iframe src="https://health.iot4health.co.kr/lv1/_agree/agree.all.html" style={{width:"100%", height:"40rem"}} />
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

export default Term
