import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  TabContent,
  TabPane,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap"
import classnames from "classnames"
import "../../../../assets/scss/pages/authentication.scss"
import LoginAuth0 from "./LoginAuth0"
import LoginJWT from "./LoginJWT"
import HicareLogo from "../../../../assets/img/logo/logo1.png"
import { IntlContext } from "../../../../utility/context/Internationalization"
import ReactCountryFlag from "react-country-flag"




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
  handleLangDropdown = () =>
  this.setState({ langDropdown: !this.state.langDropdown })
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
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100 shadow-none">
            <Row className="m-0">
              <Col md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 login-tabs-container">
                  <CardHeader className="pb-3 pt-3 d-flex justify-content-center">      
                      <img className="px-3" src={HicareLogo} alt="HicareLogo" style={{width:"90%"}}/>
                  </CardHeader>
                  {/* <Row className="d-flex justify-content-center">
                    <Col lg="6" md="6" className="d-flex justify-content-center">
                    <ul className="nav">
                      <IntlContext.Consumer>
                        {context => {
                          let langArr = {
                            "ko" : "Korean",
                            "en" : "English",
                            // "de" : "German",
                            // "fr" : "French",
                            // "pt" : "Portuguese"
                          }
                          return (
                            <Dropdown
                              tag="li"
                              className="dropdown-language nav-item"
                              isOpen={this.state.langDropdown}
                              toggle={this.handleLangDropdown}
                              data-tour="language"
                            >
                              <DropdownToggle
                                tag="a"
                                className="nav-link"
                              >
                                <ReactCountryFlag
                                className="country-flag"
                                  countryCode={
                                    context.state.locale === "ko"
                                      ? "kr"
                                      : context.state.locale
                                  }
                                  svg
                                />
                                <ReactCountryFlag
                                className="country-flag"
                                  countryCode={
                                    context.state.locale === "en"
                                      ? "us"
                                      : context.state.locale
                                  }
                                  svg
                                />
                                <span className="d-sm-inline-block d-none text-capitalize align-middle ml-50">
                                  {langArr[context.state.locale]}
                                </span>
                              </DropdownToggle>
                              <DropdownMenu right>
                                <DropdownItem
                                  tag="a"
                                  onClick={e => context.switchLanguage("ko")}
                                >
                                  <ReactCountryFlag className="country-flag" countryCode="kr" svg />
                                  <span className="ml-1">Korean</span>
                                </DropdownItem>
                                <DropdownItem
                                  tag="a"
                                  onClick={e => context.switchLanguage("en")}
                                >
                                  <ReactCountryFlag className="country-flag" countryCode="us" svg />
                                  <span className="ml-1">English</span>
                                </DropdownItem>
                                <DropdownItem
                                  tag="a"
                                  onClick={e => context.switchLanguage("fr")}
                                >
                                  <ReactCountryFlag className="country-flag" countryCode="fr" svg />
                                  <span className="ml-1">French</span>
                                </DropdownItem>
                                <DropdownItem
                                  tag="a"
                                  onClick={e => context.switchLanguage("de")}
                                >
                                  <ReactCountryFlag className="country-flag" countryCode="de" svg />
                                  <span className="ml-1">German</span>
                                </DropdownItem>
                                <DropdownItem
                                  tag="a"
                                  onClick={e => context.switchLanguage("pt")}
                                >
                                  <ReactCountryFlag className="country-flag" countryCode="pt" svg />
                                  <span className="ml-1">Portuguese</span>
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          )
                        }}
                      </IntlContext.Consumer> 
                    </ul>
                    </Col>
                    </Row> */}
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <LoginJWT />
                    </TabPane>
                    <TabPane tabId="2">
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
