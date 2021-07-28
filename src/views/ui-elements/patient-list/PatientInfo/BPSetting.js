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
import {getPastConulstList} from "../../../../redux/actions/data-list"
import "../../../../assets/scss/pages/authentication.scss"
import {connect} from "react-redux"
import { Fragment } from "react"
import axios from "axios"



class VitalDataSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      normalsys_val : props.vitaldata.SYS_VAL1,
      normaldia_val : props.vitaldata.DIA_VAL1,
      dangersys_val : props.vitaldata.SYS_VAL2,
      dangerdia_val : props.vitaldata.DIA_VAL2,
      edit: false
    }
  }


  edit = e => {
    e.preventDefault()
    this.setState(prevState =>({
      edit: !prevState.edit
    }))
  }

  putBP = e => {
    e.preventDefault()

    axios
    .put("http://203.251.135.81:9300/v1/doctor/vital/base-pressure", {
        patient_id: this.props.vitaldata.USER_ID,
        sys_val1 : Number(this.state.normalsys_val),
        sys_val2 : Number(this.state.dangersys_val),
        dia_val1 : Number(this.state.normaldia_val),
        dia_val2 : Number(this.state.dangerdia_val),
    })
    .then(response => {
      if(response.data.status==="200") {
        alert("혈압데이터 세팅이 저장되었습니다.")
      } else {
        alert("저장도중 문제가 발생하였습니다.")
      }
    })
  }
  
 
  render() {
    return (
      <Fragment>
        <Form  className="col-12 m-0 p-0" onSubmit={this.putBP}>      
        <Row className="col-12">
            <Table className="m-0 col-12">
              <thead className="table-primary">
                <tr>
                  <th width={'15%'}></th>
                  <th><h5 className="pl-2">Systolic</h5></th>
                  <th width={'15%'}></th>
                  <th><h5 className="pl-2">Diastolic</h5></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="text-center"><h5>정상</h5></th>
                  <td className="d-flex align-self-center">
                    <h5 className= "align-self-center pl-2">	&lsaquo;</h5>
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.normalsys_val}
                        onChange={e => this.setState({ normalsys_val: e.target.value })} 
                      />
                    </FormGroup>
                  </td>
                  <td className="text-center"><h5>and</h5></td>
                  <td className="d-flex align-self-center">
                    <h5 className= "align-self-center pl-2">	&lsaquo;</h5>
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        
                        disabled={this.state.edit===true?false:true}  
                        value={this.state.normaldia_val}
                        onChange={e => this.setState({ normaldia_val: e.target.value })} 
                      />
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-center"><h5>주의</h5></th>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.normalsys_val}
                        onChange={e => this.setState({ normalsys_val: e.target.value })} 
                      />
                    </FormGroup>
                    <h5 className="align-self-center ml-2">&#8764;</h5>
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.dangersys_val}
                        onChange={e => this.setState({ dangersys_val: e.target.value })}
                      />
                    </FormGroup>
                  </td>
                  <td className="text-center"><h5>or</h5></td>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.normaldia_val}
                        onChange={e => this.setState({ normaldia_val: e.target.value })}
                      />
                    </FormGroup>
                    <h5 className="align-self-center ml-2">&#8764;</h5>
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.dangerdia_val}
                        onChange={e => this.setState({ dangerdia_val: e.target.value })}
                      />
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-center"><h5>위험</h5></th>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.dangersys_val}
                        onChange={e => this.setState({ dangersys_val: e.target.value })}
                      />  
                    </FormGroup>
                    <h1 className="align-self-center ml-2">&#8804;</h1>
                  </td>
                  <td className="text-center"><h5>or</h5></td>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.dangerdia_val}
                        onChange={e => this.setState({ dangerdia_val: e.target.value })}
                      />  
                    </FormGroup>
                    <h1 className="align-self-center ml-2">&#8804;</h1>
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

export default connect(mapStateToProps, {getPastConulstList}) (VitalDataSetting)
