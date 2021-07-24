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
import FindId from "./FindId"
import FindPw from "./FindPw"
import { ChevronLeft } from "react-feather"
import { history } from "../../../../history"
import { FormattedMessage } from "react-intl"


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
          sm="3"
          xl="3"
          lg="3"
          md="3"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 login-tabs-container">
                  <Row className="mt-1">
                    <ChevronLeft onClick={() => {
                          history.push("/")
                        }}  style={{cursor:"pointer"}} />
                  </Row>
                  <CardHeader className="pb-2 pt-3 justify-content-center">
                    <CardTitle>
                      <h4><b><FormattedMessage id="FP"/></b></h4>
                    </CardTitle>
                  </CardHeader>
                  <Nav tabs className="px-3 justify-content-center">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "1"
                        })}
                        onClick={() => {
                          this.toggle("1")
                        }}
                      >
                        <h5><FormattedMessage id="Find ID"/></h5>
                      </NavLink>
                    </NavItem>
                    <NavItem className="pt-1">
                      &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "2"
                        })}
                        onClick={() => {
                          this.toggle("2")
                        }}
                      >
                        <h5><FormattedMessage id="Find Password"/></h5>
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
