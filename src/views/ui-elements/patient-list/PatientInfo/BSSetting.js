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
 
  render() {
    return (
      <Fragment>
        <Row className="col-12">
          <Form action="/" className="col-12 m-0 p-0" onSubmit={this.handleLogin}>      
            <Table className="m-0 col-12">
              <thead className="table-primary">
                <tr>
                  <th width={'15%'}></th>
                  <th width={'15%'}><h3>분류</h3></th>
                  <th><h3 className="pl-2">mg/dl</h3></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="text-center">
                    <h3>정상</h3>
                  </th>
                  <td className="align-self-center">
                    <h3 className= "align-self-center">Fasting</h3>
                  </td>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.normalfasting}
                        onChange={e => this.setState({ normalfasting: e.target.value })}
                      />  
                    </FormGroup>
                    <h3 className="align-self-center ml-2">&#8764;</h3>
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
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
                    <h3 className= "align-self-center">PP2</h3>
                  </td>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.normalpp2}
                        onChange={e => this.setState({ normalpp2: e.target.value })}
                      />
                    </FormGroup>
                    <h3 className="align-self-center ml-2">&#8764;</h3>
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.dagnerpp2}
                        onChange={e => this.setState({ dagnerpp2: e.target.value })}
                      />
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-center"><h3>주의</h3></th>
                  <td className="align-self-center">
                    <h3 className= "align-self-center">Fasting</h3>
                  </td>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
                        disabled={this.state.edit===true?false:true} 
                        value={this.state.alertfasting}
                        onChange={e => this.setState({ r: e.target.value })}
                      />  
                    </FormGroup>
                    <h3 className="align-self-center ml-2">&#8764;</h3>
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
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
                    <h3 className= "align-self-center">PP2</h3>
                  </td>
                  <td className="d-flex align-self-center">
                    <h3 className= "align-self-center pl-2">&mdash;</h3>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-center"><h3>위험</h3></th>
                  <td className="align-self-center">
                    <h3 className= "align-self-center">Fasting</h3>
                  </td>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
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
                    <h3 className= "align-self-center">PP2</h3>
                  </td>
                  <td className="d-flex align-self-center">
                    <FormGroup className="pt-1 ml-2">
                      <Input 
                        type="number" 
                        bsSize="lg" 
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
