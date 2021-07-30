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
      normalfasting: props.vitaldata.FAST_VAL1,
      normalpp2: props.vitaldata.PP2_VAL1,
      alertfasting: props.vitaldata.FAST_VAL2,
      dangerfasting: props.vitaldata.FAST_VAL3,
      dagnerpp2: props.vitaldata.PP2_VAL2,
      edit: false
    }
  }


  edit = e => {
    e.preventDefault()
    this.setState(prevState =>({
      edit: !prevState.edit
    }))
  }

  putBS = e => {
    e.preventDefault()
    
    axios
    .put("https://health.iot4health.co.kr:9300/v1/doctor/vital/base-glucose", {
        patient_id: this.props.vitaldata.USER_ID,
        fast_val1 : Number(this.state.normalfasting),
        fast_val2 : Number(this.state.alertfasting),
        fast_val3 : Number(this.state.dangerfasting),
        pp2_val1 : Number(this.state.normalpp2),
        pp2_val2 : Number(this.state.dagnerpp2)
    })
    .then(response => {
      if(response.data.status==="200") {
        alert("혈당데이터 세팅이 저장되었습니다.")
      } else {
        alert("저장도중 문제가 발생하였습니다.")
      }
    })
  }
 
  render() {
    return (
      <Fragment>
        <Form action="/" className="col-12 m-0 p-0" onSubmit={this.putBS}> 
        <Row className="col-12">    
          <Table borderless className="m-0 col-12 shadow">
              <thead className="table-primary">
                <tr>
                  <th id="vitalritopth" width={'15%'}></th>
                  <th width={'15%'}><h5>분류</h5></th>
                  <th id="vitalletopth"><h5 className="pl-2">mg/dl</h5></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="text-center">
                    <h5>정상</h5>
                  </th>
                  <td className="align-self-center">
                    <h5 className= "align-self-center">Fasting</h5>
                  </td>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.normalfasting}
                        onChange={e => this.setState({ normalfasting: e.target.value })}
                      />  
                    </FormGroup>
                    <h5 className="align-self-center ml-2">&#8764;</h5>
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.alertfasting}
                        onChange={e => this.setState({ alertfasting: e.target.value })}
                      />  
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-center"></th>
                  <td className="align-self-center">
                    <h5 className= "align-self-center">PP2</h5>
                  </td>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.normalpp2}
                        onChange={e => this.setState({ normalpp2: e.target.value })}
                      />
                    </FormGroup>
                    <h5 className="align-self-center ml-2">&#8764;</h5>
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.dagnerpp2}
                        onChange={e => this.setState({ dagnerpp2: e.target.value })}
                      />
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-center"><h5>주의</h5></th>
                  <td className="align-self-center">
                    <h5 className= "align-self-center">Fasting</h5>
                  </td>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.alertfasting}
                        onChange={e => this.setState({ r: e.target.value })}
                      />  
                    </FormGroup>
                    <h5 className="align-self-center ml-2">&#8764;</h5>
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.dangerfasting}
                        onChange={e => this.setState({ dangerfasting: e.target.value })}
                      />  
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td className="align-self-center">
                    <h5 className= "align-self-center">PP2</h5>
                  </td>
                  <td className="d-flex align-self-center">
                    <h5 className= "align-self-center pl-2">&mdash;</h5>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-center"><h5>위험</h5></th>
                  <td className="align-self-center">
                    <h5 className= "align-self-center">Fasting</h5>
                  </td>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.dangerfasting}
                        onChange={e => this.setState({ dangerfasting: e.target.value })}
                      />  
                    </FormGroup>
                    <h1 className="align-self-center ml-2">&#8804;</h1>
                  </td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td className="align-self-center">
                    <h5 className= "align-self-center">PP2</h5>
                  </td>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.dagnerpp2}
                        onChange={e => this.setState({ dagnerpp2: e.target.value })}
                      />  
                    </FormGroup>
                    <h1 className="align-self-center ml-2">&#8804;</h1>
                  </td>
                </tr>
              </tbody>
            </Table>
        </Row>
        <Row className="mt-3">
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
