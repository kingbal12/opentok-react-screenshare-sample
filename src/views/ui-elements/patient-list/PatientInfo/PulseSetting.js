import React from "react"
import {Form, FormGroup, Button,
  InputGroup, InputGroupAddon,Input,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  ButtonGroup,
  Table
} from "reactstrap"
import {getPastConulstList} from "../../../../redux/actions/data-list"
import { history } from "../../../../history"
import "../../../../assets/scss/pages/authentication.scss"
import {connect} from "react-redux"
import { Fragment } from "react"
import classnames from "classnames"



class VitalDataSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      lownormalBPM: "",
      topnormalBPM: "",
      dangerBPM: ""   
    }
  }

  componentDidMount() {
    console.log(this.props.user)
    console.log(this.props.dataList)
  }
 
  render() {
    return (
      <Row className="col-12">
        <Form action="/" className="col-12 m-0 p-0" onSubmit={this.handleLogin}>      
          <Table className="m-0 col-12">
            <thead className="table-primary">
              <tr>
                <th></th>
                <th><h3>BPM</h3></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="text-center"><h3>정상</h3></th>
                <td className="d-flex align-self-center">
                  <FormGroup className="pt-1 ml-2">
                    <Input 
                      type="text" 
                      bsSize="lg" 
                      value={this.state.lownormalBPM}
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </FormGroup>
                  <h3 className="align-self-center ml-2">&mdash;</h3>
                  <FormGroup className="pt-1 ml-2">
                    <Input 
                      type="text" 
                      bsSize="lg" 
                      value={this.state.topnormalBPM}
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </FormGroup>
                  
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-center"><h3>위험</h3></th>
                <td className="d-flex align-self-center">
                  <FormGroup className="pt-1">
                    <Input 
                      type="text" 
                      bsSize="lg" 
                      value={this.state.dangerBPM}
                      onChange={e => this.setState({ name: e.target.value })} 
                    />
                  </FormGroup>
                  <h3 className= "align-self-center ml-2">	&lsaquo;</h3>
                </td>
              </tr>
            </tbody>
          </Table>
        </Form>
      </Row>


    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    dataList: state.dataList,
    appo: state.dataList.appointment,
    pinfo: state.dataList.patient,
    cslist: state.dataList.csdata,
    bpdata: state.dataList.BP,
    pulstdata: state.dataList.PULSE,
    tempdata: state.dataList.TEMP,
    bsdata : state.dataList.BS,
    wedata : state.dataList.WE,
    spo2data : state.dataList.SPO2

  }
}

export default connect(mapStateToProps, {getPastConulstList}) (VitalDataSetting)
