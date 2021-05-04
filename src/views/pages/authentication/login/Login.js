import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  TabContent,
  TabPane
} from "reactstrap"
import "../../../../assets/scss/pages/authentication.scss"
import LoginAuth0 from "./LoginAuth0"
import LoginFirebase from "./LoginFirebase"
import LoginJWT from "./LoginJWT"
import HicareLogo from "../../../../assets/img/logo/user_register_logo.png"

class Login extends React.Component {
  state = {
    activeTab: "1"
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="3"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 login-tabs-container">
                  <CardHeader className="pb-4">
                    <CardTitle>
                      <div>
                        <img className="col" src={HicareLogo} alt="HicareLogo"/>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <LoginJWT />
                    </TabPane>
                    <TabPane tabId="2">
                      <LoginFirebase />
                    </TabPane>
                    <TabPane tabId="3">
                      <LoginAuth0 />
                    </TabPane>
                  </TabContent>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default Login
