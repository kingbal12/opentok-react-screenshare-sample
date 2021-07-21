import React from "react"
import { Row, Col } from "reactstrap"
import SalesCard from "./SalesCard"
import SuberscribersGained from "../../ui-elements/cards/statistics/SubscriberGained"
import OrdersReceived from "../../ui-elements/cards/statistics/OrdersReceived"
// import AvgSession from "../../ui-elements/cards/analytics/AvgSessions"
// import SupportTracker from "../../ui-elements/cards/analytics/SupportTracker"
// import ProductOrders from "../../ui-elements/cards/analytics/ProductOrders"
// import SalesStat from "../../ui-elements/cards/analytics/Sales"
// import ActivityTimeline from "./ActivityTimeline"
// import DispatchedOrders from "./DispatchedOrders"
import "../../../assets/scss/pages/dashboard-analytics.scss"
import DataTableCustom from "./DataTableCustom"
// import { UserX } from "react-feather"
import { connect } from "react-redux"
import { getappoints } from "../../../redux/actions/appoint"
import axios from "axios"
import ListViewConfig from "./DataListConfig"
import queryString from "query-string"


 
class AnalyticsDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userid: props.user.login.values.loggedInUser.username,
      startdate: "20210101",
      pageamount: 5,
      pagenum: 1,
      countday: 0,
      countmon: 0
    }
  }

  componentDidMount() {
        axios
          .get("http://203.251.135.81:9300/v1/doctor/appointment/dashboard", {
            params: {
              user_id: this.state.userid,
              start_date: new Date(),
              page_amount: 5,
              page_num: 1
            }
          })
          .then(response => {
            let appoints;
            if (response.data.status==="200") {
              appoints=response.data.data
              this.setState({
                countday: appoints.COUNT_DAY,
                countmon: appoints.COUNT_MON
              })     
            }
          })
          .catch(err => console.log(err))
  } 

  render() {
    return (
      <React.Fragment>
        <Row className="match-height row">
          <Col sm="6">
            <SalesCard/>
          </Col>
          <Col sm="3">
            <SuberscribersGained
            countd={this.state.countday}  />
          </Col>
          <Col sm="3">
            <OrdersReceived
            countm={this.state.countmon}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <ListViewConfig parsedFilter={queryString.parse(this.props.location.search)}/>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            {/* <DataTableCustom/> */}
            {/* <ListViewConfig parsedFilter={queryString.parse(this.props.location.search)}/> */}
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps,{getappoints})(AnalyticsDashboard)
