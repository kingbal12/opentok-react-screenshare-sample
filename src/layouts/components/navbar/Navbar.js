import React from "react"
import { Navbar } from "reactstrap"
import { connect } from "react-redux"
import classnames from "classnames"
import { useAuth0 } from "../../../authServices/auth0/auth0Service"
import {
  logoutWithJWT
} from "../../../redux/actions/auth/loginActions"
import NavbarBookmarks from "./NavbarBookmarks"
import NavbarUser from "./NavbarUser"
import userImg from "../../../assets/img/portrait/small/avatar-s-11.jpg"
import { history } from "../../../history"
import Clock from 'react-live-clock';
import HicareLogo from "../../../assets/img/logo/logo2.png"



// 원본
//  const UserName = props => {
//     let username = ""
//     if (props.userdata !== undefined) {
//       username = props.userdata.name
//     } else if (props.user.login.values !== undefined) {
//       username = props.user.login.values.name
//       if (
//         props.user.login.values.loggedInWith !== undefined &&
//         props.user.login.values.loggedInWith === "jwt"
//       ) {
//         username = props.user.login.values.loggedInUser.name
//       }
//     } else {
//       username = "John Doe"
//     }
//     return username
//   }

const UserName = props => {
  let username = ""
  if (props.user.login.values !== undefined) {
    if (props.user.login.values.loggedInWith ==="jwt") {
      username = props.user.login.values.loggedInUser.username
    }else {
      history.push("/")
    }
  }else {
    history.push("/")
  }

  return username
}


const ThemeNavbar = props => {
  const { user } = useAuth0()
  const colorsArr = [ "primary", "danger", "success", "info", "warning", "dark"]
  const navbarTypes = ["floating" , "static" , "sticky" , "hidden"]
  return (
    <React.Fragment>
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <Navbar
        className={classnames(
          "header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow",
          {
            "navbar-light": props.navbarColor === "default" || !colorsArr.includes(props.navbarColor),
            "navbar-dark": colorsArr.includes(props.navbarColor),
            "bg-primary":
              props.navbarColor === "primary" && props.navbarType !== "static",
            "bg-danger":
              props.navbarColor === "danger" && props.navbarType !== "static",
            "bg-success":
              props.navbarColor === "success" && props.navbarType !== "static",
            "bg-info":
              props.navbarColor === "info" && props.navbarType !== "static",
            "bg-warning":
              props.navbarColor === "warning" && props.navbarType !== "static",
            "bg-dark":
              props.navbarColor === "dark" && props.navbarType !== "static",
            "d-none": props.navbarType === "hidden" && !props.horizontal,
            "floating-nav":
              (props.navbarType === "floating" && !props.horizontal) || (!navbarTypes.includes(props.navbarType) && !props.horizontal),
            "navbar-static-top":
              props.navbarType === "static" && !props.horizontal,
            "fixed-top": props.navbarType === "sticky" || props.horizontal,
            "scrolling": props.horizontal && props.scrolling

          }
        )}
      >
         <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div
              className="navbar-collapse d-flex justify-content-between align-items-center"
              id="navbar-mobile"
            >
              <div className="bookmark-wrapper">
                {/* <NavbarBookmarks
                  sidebarVisibility={props.sidebarVisibility}
                  handleAppOverlay={props.handleAppOverlay}
                /> */}
                <Clock 
                format={'YYYY, MM, DD, dddd'} 
                ticking={true}  />
                <p></p>
                <Clock 
                format={'hh:mm A'} 
                ticking={true}  />
              </div>
              {props.horizontal ? (
                <div className="logo d-flex align-items-center">
                   <img className="px-5" src={HicareLogo} alt="HicareLogo" style={{width:"100%"}}/>
                </div>
              ) : null}
        {/* <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div
              className="navbar-collapse d-flex justify-content-between align-items-center"
              id="navbar-mobile"
            >
              <div className="bookmark-wrapper col-5 row justify-content-start">
                <Clock />
                <NavbarBookmarks
                  sidebarVisibility={props.sidebarVisibility}
                  handleAppOverlay={props.handleAppOverlay}
                />
              </div>
              {props.horizontal ? (
                <div className="logo d-flex align-items-center col-4">
                  <div className="brand-logo mr-50"></div>
                  <h2 className="text-primary brand-text mb-0"><img className="col-3" src={HicareLogo} alt="HicareLogo"/></h2>
                </div>
              ) : null} */}
              
              <NavbarUser
                handleAppOverlay={props.handleAppOverlay}
                changeCurrentLang={props.changeCurrentLang}
                userName={<UserName userdata={user} {...props} />}
                userImg={
                  props.user.login.values !== undefined &&
                  props.user.login.values.loggedInWith === "jwt" &&
                  props.user.login.values.loggedInUser.file_path
                    ? "http://203.251.135.81:9300"+props.user.login.values.loggedInUser.file_path
                      +props.user.login.values.loggedInUser.file_name 
                  // ? props.user.login.values.photoUrl 
                    : user !== undefined && user.picture ? user.picture
                    : userImg
                }
                medicalpartnm={props.user.login.values.loggedInUser.medical_part_nm}
                loggedInWith={
                  props.user !== undefined &&
                  props.user.login.values !== undefined
                    ? props.user.login.values.loggedInWith
                    : null
                }
                // status={props.user.login.values.}
                logoutWithJWT={props.logoutWithJWT}
              />
            </div>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps, {
  logoutWithJWT,
  useAuth0
})(ThemeNavbar)
