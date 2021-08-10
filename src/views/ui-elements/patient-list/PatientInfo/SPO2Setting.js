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
      normalspo2: props.vitaldata.SPO2_VAL1,
      dangerapo2: props.vitaldata.SPO2_VAL2,
      edit: false
    }
  }


  edit = e => {
    e.preventDefault()
    this.setState(prevState =>({
      edit: !prevState.edit
    }))
  }


  putSPO2 = e => {
    e.preventDefault()
    
    axios
    .put("https://health.iot4health.co.kr:9300/v1/doctor/vital/base-spo2", {
        patient_id: this.props.vitaldata.USER_ID,
        spo2_val1 : Number(this.state.normalspo2),
        spo2_val2 : Number(this.state.dangerapo2),
    })
    .then(response => {
      if(response.data.status==="200") {
        alert("혈압데이터 세팅이 저장되었습니다.")
      } else if(response.data.status==="400") {
        alert("적정값을 입력하여 주십시오\n값이 올바르지 않거나 너무 크거나 작습니다.")
      } else{
        alert("저장도중 문제가 발생하였습니다.")
      }
    })
  }
 
  render() {
    return (
      <Fragment>
        <Form className="col-12 m-0 p-0" onSubmit={this.putSPO2}>
        <Row className="col-12">
          <Table borderless className="m-0 col-12 shadow">
              <thead className="table-primary">
                <tr>
                  <th id="vitalritopth" width={'30%'} ></th>
                  <th id="vitalletopth"><h5 className="pl-2">%</h5></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><h5 className="pl-4">정상</h5></th>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 pl-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.normalspo2}
                        onChange={e => this.setState({ normalspo2: e.target.value })}
                      />  
                    </FormGroup>
                    <h1 className= "align-self-center ml-2">&#8804;</h1>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h5 className="pl-4">주의</h5>
                  </th>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.dangerapo2}
                        onChange={e => this.setState({ dangerapo2: e.target.value })} 
                      />
                    </FormGroup>
                    <h5 className="align-self-center ml-2">&#8764;</h5>
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                         
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.normalspo2}
                        onChange={e => this.setState({ normalspo2: e.target.value })}
                      />
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h5 className="pl-4">위험</h5>
                  </th>
                  <td className="d-flex align-self-center">
                    <h5 className= "align-self-center pl-2">	&lsaquo;</h5>
                      <FormGroup className="pt-1 ml-2">
                        <Input 
                          type="number" 
                           
                          disabled={this.state.edit===true?false:true} 
                          value={this.state.dangerapo2}
                          onChange={e => this.setState({ dangerapo2: e.target.value })}
                        />  
                      </FormGroup>
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
