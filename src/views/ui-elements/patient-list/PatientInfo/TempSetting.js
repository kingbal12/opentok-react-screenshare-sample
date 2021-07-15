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
      normaltemp: props.vitaldata.TEMP_VAL1,
      alerttemp: props.vitaldata.TEMP_VAL2,
      dangertemp: props.vitaldata.TEMP_VAL3,
      edit: false
    }
  }



  edit = e => {
    e.preventDefault()
    this.setState(prevState =>({
      edit: !prevState.edit
    }))
  }
 
  render() {
    return (
      <Fragment>
        <Row className="col-12">
          <Form action="/" className="col-12 m-0 p-0" onSubmit={this.handleLogin}>      
            <Table className="m-0 col-12">
              <thead className="table-primary">
                <tr>
                  <th width={'30%'}></th>
                  <th><h3 className="pl-2">&#8451;</h3></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <h3 className="pl-4">정상</h3>
                  </th>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.normaltemp}
                        onChange={e => this.setState({ normaltemp: e.target.value })} 
                      />
                    </FormGroup>
                    <h3 className="align-self-center ml-2">&#8764;</h3>
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.alerttemp}
                        onChange={e => this.setState({ alerttemp: e.target.value })}
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
                        value={this.state.alerttemp}
                        onChange={e => this.setState({ alerttemp: e.target.value })} 
                      />
                    </FormGroup>
                    <h3 className="align-self-center ml-2">&#8764;</h3>
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.dangertemp}
                        onChange={e => this.setState({ dangertemp: e.target.value })}
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
                        value={this.state.dangertemp}
                        onChange={e => this.setState({ dangertemp: e.target.value })}
                      />  
                    </FormGroup>
                    <h3 className= "align-self-center ml-2">&lsaquo;</h3>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form>
        </Row>
        <Row>
          <Col md="12" className="pr-3 d-flex flex-row-reverse">
            <Button.Ripple 
              color="primary"
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
