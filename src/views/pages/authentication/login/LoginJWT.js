import React from "react";
import { Link } from "react-router-dom";
import {
  CardBody,
  FormGroup,
  Form,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import { Check } from "react-feather";
import { loginWithJWT } from "../../../../redux/actions/auth/loginActions";
import { saveemail, delemail } from "../../../../redux/actions/idaction";
import { connect } from "react-redux";
import { history } from "../../../../history";
import firebase from "firebase";
import { FormattedMessage } from "react-intl";
import { resetCookie } from "../../../../redux/actions/cookies";

const config = {
  apiKey: "AIzaSyAMiyzuGLBHAk4K18Q4Bla4ljA4cfUf-oM",
  authDomain: "i4h-hicare.firebaseapp.com",
  databaseURL: "https://i4h-hicare.firebaseapp.com",
  projectId: "i4h-hicare",
  storageBucket: "i4h-hicare.appspot.com",
  messagingSenderId: "575076484827",
  appId: "1:575076484827:web:b15851500503c4c2432efe",
  measurementId: "G-5H09HRTQQT",
};

// firebase.initializeApp(config);
// const messaging = firebase.messaging();

// messaging.usePublicVapidKey("BL0eTL3wIbAxmATwORsjQ-pNPCQBYrFNofCAr1xnArzbBjkRDreJLmiXYd-ySpazU-GTEAhtThWIhCLxYLvTGvY");

// //허가를 요청합니다!
// Notification.requestPermission()
// .then(function() {
//   console.log('허가!');
//   return messaging.getToken();
// })

// .then(token => {
//   console.log(token); //토큰을 출력!
//   // this.setState({tokendata:token})
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('firebase-messaging-sw.js')
//     .then(handleSWRegistration);
//   }

//   function handleSWRegistration(reg) {
//     if (reg.installing) {
//         console.log('Service worker installing');
//     } else if (reg.waiting) {
//         console.log('Service worker installed');
//     } else if (reg.active) {
//         console.log('Service worker active');
//     }

//   }
// })

// .catch(function(err) {
//   console.log('fcm에러 : ', err);
// })

// messaging.onMessage(function(payload){
//   console.log(payload);
// })

class LoginJWT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.values.email,
      password: "",
      tokendata: "",
      devicekind: "W",
      remember: false,
      doctername: "",
    };
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
      const messaging = firebase.messaging();

      messaging.usePublicVapidKey(
        "BL0eTL3wIbAxmATwORsjQ-pNPCQBYrFNofCAr1xnArzbBjkRDreJLmiXYd-ySpazU-GTEAhtThWIhCLxYLvTGvY"
      );

      //허가를 요청합니다!
      Notification.requestPermission()
        .then(function () {
          console.log("허가!");
          return messaging.getToken();
        })

        .then((token) => {
          console.log(token); //토큰을 출력!
          this.setState({ tokendata: token });
          if ("serviceWorker" in navigator) {
            navigator.serviceWorker
              .register("firebase-messaging-sw.js")
              .then(handleSWRegistration);
          }

          function handleSWRegistration(reg) {
            if (reg.installing) {
              console.log("Service worker installing");
            } else if (reg.waiting) {
              console.log("Service worker installed");
            } else if (reg.active) {
              console.log("Service worker active");
            }
          }
        })

        .catch(function (err) {
          console.log("fcm에러 : ", err);
        });

      messaging.onMessage(function (payload) {
        let strDT = payload.data["gcm.notification.doctor_id"];

        console.log("닥터아이디 :", strDT);
        alert(
          strDT +
            "님 진료시작까지 5분 남았습니다.\n진료실로 입장해주시기 바랍니다."
        );
      });
    } else {
      firebase.app();
    }
  }

  // componentWillMount() {
  //   const messaging = firebase.messaging();
  //   messaging.onMessage(function(payload){
  //     console.log(payload.notification);
  //   })
  // }

  handleLogin = (e) => {
    e.preventDefault();
    if (this.state.email.length >= 6) {
      this.props.loginWithJWT(this.state);
      this.props.saveemail(this.state.email);
    } else {
      alert("아이디는 최소 6자 이상입니다.");
    }
  };

  handleRemember = (e) => {
    this.setState(
      {
        remember: e.target.checked,
      },
      () => {
        if (this.state.remember === true) {
          this.props.saveemail(this.state.email);
        } else {
          this.props.delemail();
        }
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative">
              <FormattedMessage id="emailid">
                {(emailid) => (
                  <Input
                    placeholder={emailid}
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    required
                    invalid={
                      this.state.email.length >= 6 ||
                      this.state.email.length === 0
                        ? false
                        : true
                    }
                  />
                )}
              </FormattedMessage>
              <FormFeedback>
                {this.state.email.length >= 6
                  ? ""
                  : "아이디를 6자 이상 입력하십시오"}
              </FormFeedback>
              {/* <div className="form-control-position">
                <Mail size={15} />
              </div> */}
              {/* <Label>아이디</Label> */}
            </FormGroup>
            <FormGroup className="form-label-group position-relative ==">
              <FormattedMessage id="Password">
                {(Password) => (
                  <Input
                    type="password"
                    placeholder={Password}
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    required
                    invalid={
                      this.state.password.length >= 6 ||
                      this.state.password.length === 0
                        ? false
                        : true
                    }
                  />
                )}
              </FormattedMessage>
              <FormFeedback>
                {this.state.password.length >= 6 ? (
                  ""
                ) : (
                  <FormattedMessage id="비밀번호6자" />
                )}
              </FormFeedback>
              {/* <div className="form-control-position">
                <Lock size={15} />
              </div> */}
              {/* <Label>비밀번호</Label> */}
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              <FormattedMessage id="saveID">
                {(saveID) => (
                  <Checkbox
                    color="primary"
                    icon={<Check className="vx-icon" size={16} />}
                    label={saveID}
                    defaultChecked={this.state.email === "" ? false : true}
                    onChange={this.handleRemember}
                  />
                )}
              </FormattedMessage>
            </FormGroup>
            <div className="d-flex justify-content-center pb-1">
              <Button color="primary" type="submit" size="lg" block>
                <FormattedMessage id="Login" />
              </Button>
            </div>

            <div className="d-flex justify-content-center pb-1">
              <Link to="/pages/finduser" style={{ color: "#615e6f" }}>
                <FormattedMessage id="Find ID" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <FormattedMessage id="Find Password" />
              </Link>
            </div>

            {/* <div className="d-flex justify-content-center">
              <Button
                  color="light"
                  size="lg" 
                  block
                  onClick={() => {
                    history.push("/pages/register1")
                    this.props.resetCookie()
                  }}
                  // onClick={this.startarchiveVideo}
                >
                  <FormattedMessage id="Sign In"/>
              </Button>
            </div> */}
          </Form>
        </CardBody>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    values: state.cookies,
  };
};
export default connect(mapStateToProps, {
  loginWithJWT,
  saveemail,
  delemail,
  resetCookie,
})(LoginJWT);
