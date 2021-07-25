import React from "react"
import { Link } from "react-router-dom"
import { CardBody, FormGroup, Form, Input, Button, FormFeedback } from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Mail, Lock, Check } from "react-feather"
import { loginWithJWT} from "../../../../redux/actions/auth/loginActions"
import { saveemail, delemail} from "../../../../redux/actions/cookies"
import { connect } from "react-redux"
import { history } from "../../../../history"
// import firebase from 'firebase'; 


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
    // if (!firebase.apps.length) {

    //   firebase.initializeApp(config);  
    //   const messaging = firebase.messaging();

    //   messaging.usePublicVapidKey("BL0eTL3wIbAxmATwORsjQ-pNPCQBYrFNofCAr1xnArzbBjkRDreJLmiXYd-ySpazU-GTEAhtThWIhCLxYLvTGvY");

    //   //허가를 요청합니다!
    //   Notification.requestPermission()
    //   .then(function() {
    //     console.log('허가!');
    //     return messaging.getToken();
    //   })

    //   .then(token => {
    //     console.log(token); //토큰을 출력!
    //     this.setState({tokendata:token})
    //   })

    //   .catch(function(err) {
    //     console.log('fcm에러 : ', err);
    //   })
    
    // } else {
    
    //   firebase.app();
    
    // }

    
  }
  
  
  

  handleLogin = e => {
    e.preventDefault()
    if(this.state.email.length >=6) {
      this.props.loginWithJWT(this.state)
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
              <FormFeedback>{this.state.email.length >= 6 ? "" : "아이디를 6자 이상입력하십시오"}</FormFeedback>
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
                invalid={this.state.password.length >= 4 ||this.state.password.length === 0 ? false : true}
              />
              <FormFeedback>{this.state.password.length >= 4 ? "" : "비밀번호를 4자 이상입력하십시오"}</FormFeedback>
              {/* <div className="form-control-position">
                <Lock size={15} />
              </div> */}
              {/* <Label>비밀번호</Label> */}
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="아이디 기억"
                defaultChecked={this.state.email===""?false:true}
                onChange={this.handleRemember}
              />
              
            </FormGroup>
            <div className="d-flex justify-content-center pb-1">
              <Button color="primary" type="submit" size="lg" block>
                로그인
              </Button>
            </div>
            
            
            <div className="d-flex justify-content-center pb-1">
              <Link to="/pages/finduser" style={{color:"#615e6f"}}>
                아이디찾기 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 비밀번호 찾기
                </Link>
            </div>
            
            <div className="d-flex justify-content-center">
              <Button
                  color="light"
                  size="lg" 
                  block
                  onClick={() => {
                    history.push("/pages/register1")
                  }}
                >
                  회원가입
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
export default connect(mapStateToProps, { loginWithJWT, saveemail, delemail })(LoginJWT)
