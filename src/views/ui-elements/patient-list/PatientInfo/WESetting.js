import React from "react"
import {
  Form, 
  FormGroup, 
  Button,
  Input,
  Row,
  Col,
  Table
} from "reactstrap"
import "../../../../assets/scss/pages/authentication.scss"
import {connect} from "react-redux"
import { Fragment } from "react"
import axios from "axios"


class VitalDataSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      normalBMI: props.vitaldata.BMI_VAL1,
      alertBMI: props.vitaldata.BMI_VAL2,
      dangerBMI: props.vitaldata.BMI_VAL3,
      edit: false 
    }
  }


  edit = e => {
    e.preventDefault()
    this.setState(prevState =>({
      edit: !prevState.edit
    }))
  }

  putWE = e => {
    e.preventDefault()
    
    axios
    .put("http://203.251.135.81:9300/v1/doctor/vital/base-weight", {
        patient_id: this.props.vitaldata.USER_ID,
        bmi_val1 : Number(this.state.normalBMI),
        bmi_val2 : Number(this.state.alertBMI),
        bmi_val3 : Number(this.state.dangerBMI)
    })
    .then(response => {
      if(response.data.status==="200") {
        alert("체중데이터 세팅이 저장되었습니다.")
      } else {
        alert("저장도중 문제가 발생하였습니다.")
      }
    })
  }
 
  render() {
    return (
      <Fragment>
        <Form action="/" className="col-12 m-0 p-0" onSubmit={this.putWE}>
        <Row className="col-12">
            <Table className="m-0 col-12">
              <thead className="table-primary">
                <tr>
                  <th width={'30%'} ></th>
                  <th><h3 className="pl-1">BMI&nbsp;(%)</h3></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><h3 className="pl-4">정상</h3></th>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.normalBMI}
                        onChange={e => this.setState({ normalBMI: e.target.value })} 
                      />
                    </FormGroup>
                    <h3 className="align-self-center ml-2">&#8764;</h3>
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.alertBMI}
                        onChange={e => this.setState({ alertBMI: e.target.value })}
                      />
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h3 className="pl-4">주의</h3>
                  </th>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.alertBMI}
                        onChange={e => this.setState({ alertBMI: e.target.value })} 
                      />
                    </FormGroup>
                    <h3 className="align-self-center ml-2">&#8764;</h3>
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.dangerBMI}
                        onChange={e => this.setState({ dangerBMI: e.target.value })}
                      />
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td className="d-flex align-self-center">
                    <h3 className= "align-self-center pl-2">	&lsaquo;</h3>
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.normalBMI}
                        onChange={e => this.setState({ normalBMI: e.target.value })}
                      />  
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h3 className="pl-4">위험</h3>
                  </th>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 pl-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.dangerBMI}
                        onChange={e => this.setState({ dangerBMI: e.target.value })}
                      />  
                    </FormGroup>
                    <h1 className= "align-self-center ml-2">&#8804;</h1>
                  </td>
                </tr>
              </tbody>
            </Table>
          
        </Row>
        <Row>
          <Col md="12" className="pr-3 d-flex flex-row-reverse">
            <Button.Ripple 
              color="primary"
              type="submit"
            >
              Save
            </Button.Ripple>
            <Button.Ripple
              outline={this.state.edit===true?false:true} 
              color="primary"
              className="mr-1"
              onClick={this.edit}
            >
              Edit
            </Button.Ripple>
          </Col>
          
        </Row>
        </Form>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    dataList: state.dataList,
    appo: state.dataList.appointment,
    pinfo: state.dataList.patient,
    vitaldata: state.dataList.vitaldata
  }
}

export default connect(mapStateToProps) (VitalDataSetting)
