import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap"
import "../../../../assets/scss/pages/authentication.scss"
import classnames from "classnames"
import LoginAuth0 from "./LoginAuth0"
import LoginFirebase from "./LoginFirebase"
import FindId from "./FindId"
import FindPw from "./FindPw"
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
                  <CardHeader className="pb-4 mt-2 justify-content-center">
                    <CardTitle>
                      <h2>아이디/비밀번호 찾기</h2>
                    </CardTitle>
                  </CardHeader>
                  <Nav tabs className="px-2 justify-content-center inline-block">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "1"
                        })}
                        onClick={() => {
                          this.toggle("1")
                        }}
                      >
                        아이디 찾기
                      </NavLink>
                    </NavItem>
                    <NavItem className="pt-1">&nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp;</NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "2"
                        })}
                        onClick={() => {
                          this.toggle("2")
                        }}
                      >
                        비밀번호 찾기
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <FindId />
                    </TabPane>
                    <TabPane tabId="2">
                      <FindPw />
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
