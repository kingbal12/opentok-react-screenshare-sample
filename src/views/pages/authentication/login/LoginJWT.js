import React from "react"
import { Link } from "react-router-dom"
import { CardBody, FormGroup, Form, Input, Button, FormFeedback } from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"
import { loginWithJWT} from "../../../../redux/actions/auth/loginActions"
import { saveemail, delemail} from "../../../../redux/actions/idaction"
import { connect } from "react-redux"
import { history } from "../../../../history"
import firebase from 'firebase'; 
import { FormattedMessage } from "react-intl"
import axios from "axios"
import { resetCookie } from "../../../../redux/actions/cookies"


const config =  { 
  apiKey: "AIzaSyAMiyzuGLBHAk4K18Q4Bla4ljA4cfUf-oM"
	, authDomain: "i4h-hicare.firebaseapp.com"
	, databaseURL: "https://i4h-hicare.firebaseapp.com"
	, projectId: "i4h-hicare"
	, storageBucket: "i4h-hicare.appspot.com"
	, messagingSenderId: "575076484827"
	, appId: "1:575076484827:web:b15851500503c4c2432efe" 
	, measurementId: "G-5H09HRTQQT"  
}; 


class LoginJWT extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: props.values.email,
      password: "",
      tokendata: "",
      devicekind: "W",
      remember: false
    }
  }



  componentDidMount() {
    if (!firebase.apps.length) {

      firebase.initializeApp(config);  
      const messaging = firebase.messaging();

      messaging.usePublicVapidKey("BL0eTL3wIbAxmATwORsjQ-pNPCQBYrFNofCAr1xnArzbBjkRDreJLmiXYd-ySpazU-GTEAhtThWIhCLxYLvTGvY");

      //허가를 요청합니다!
      Notification.requestPermission()
      .then(function() {
        console.log('허가!');
        return messaging.getToken();
      })

      .then(token => {
        console.log(token); //토큰을 출력!
        this.setState({tokendata:token})
      })

      .catch(function(err) {
        console.log('fcm에러 : ', err);
      })
    
    } else {
    
      firebase.app();
    
    }

    
  }
  
  startarchiveVideo() {
    axios
      .post("https://api.opentok.com/v2/project/<47274054>/archive", 
      {
        sessionId : "1_MX40NzI3NDA1NH5-MTYyNzUyMTEzNDA5NH5MYTRBV05oWTlsaXhVNWU1RjhWbTM4QjZ-UH4",
        hasAudio : true,
        hasVideo : true,
        layout : {
          type: "bestFit"
        },
        name : "test",
        outputMode : "composed",
        resolution : "640x480",
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }
      )
      .then(response => {
        console.log(response);
      })
  }
  

  handleLogin = e => {
    e.preventDefault()
    if(this.state.email.length >=6) {
      this.props.loginWithJWT(this.state)
      this.props.saveemail(this.state.email)
    } else {
      alert("아이디는 최소 6자 이상입니다.")
    }
    
  }

  handleRemember = e => {
    this.setState({
      remember: e.target.checked
    },() => {
      if(this.state.remember===true){
        this.props.saveemail(this.state.email)
      } else {
       this.props.delemail()
      }
      })
  }

  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative">
              <Input
                placeholder="이메일 아이디"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                required
                invalid={this.state.email.length >= 6 || this.state.email.length === 0 ? false : true}
              />
              <FormFeedback>{this.state.email.length >= 6 ? "" : "아이디를 6자 이상 입력하십시오"}</FormFeedback>
              {/* <div className="form-control-position">
                <Mail size={15} />
              </div> */}
              {/* <Label>아이디</Label> */}
            </FormGroup>
            <FormGroup className="form-label-group position-relative ==">
              <Input
                type="password"
                placeholder="비밀번호"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                required
                invalid={this.state.password.length >= 6 ||this.state.password.length === 0 ? false : true}
              />
              <FormFeedback>{this.state.password.length >= 6 ? "" : "비밀번호를 6자 이상 입력하십시오"}</FormFeedback>
              {/* <div className="form-control-position">
                <Lock size={15} />
              </div> */}
              {/* <Label>비밀번호</Label> */}
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="아이디 저장"
                defaultChecked={this.state.email===""?false:true}
                onChange={this.handleRemember}
              />
              
            </FormGroup>
            <div className="d-flex justify-content-center pb-1">
              <Button color="primary" type="submit" size="lg" block>
               <FormattedMessage id="Login"/>
              </Button>
            </div>
            
            
            <div className="d-flex justify-content-center pb-1">
              <Link to="/pages/finduser" style={{color:"#615e6f"}}>
                <FormattedMessage id="Find ID"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <FormattedMessage id="Find Password"/>
              </Link>
            </div>
            
            <div className="d-flex justify-content-center">
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
            </div>
          </Form>
        </CardBody>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    values: state.cookies
  }
}
export default connect(mapStateToProps, { loginWithJWT, saveemail, delemail, resetCookie})(LoginJWT)
