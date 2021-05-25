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
import {getappoints} from "../../../redux/actions/appoint/index"
import axios from "axios"
// let $primary = "#7367F0",
//   $danger = "#EA5455",
//   $warning = "#FF9F43",
//   $info = "#00cfe8",
//   $primary_light = "#9c8cfc",
//   $warning_light = "#FFC085",
//   $danger_light = "#f29292",
//   $info_light = "#1edec5",
//   $stroke_color = "#e8e8e8",
//   $label_color = "#e7eef7",
//   $white = "#fff"

 
class AnalyticsDashboard extends React.Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     userid: props.user.login.values.loggedInUser.username,
  //     startdate: "20210101",
  //     appoints: props.appoints
  //   }
  // }
  async componentDidMount() {
    await this.props.getappoints(this.props.user.login.values.loggedInUser.username,"20210101")

    console.log(this.props.appoints.appoints.values)
  }

  render() {
    return (
      <React.Fragment>
        <Row className="match-height row">
          <Col sm="6">
            <SalesCard />
          </Col>
          <Col sm="3">
            <SuberscribersGained />
          </Col>
          <Col sm="3">
            <OrdersReceived />
          </Col>
        </Row>
        <Row>
          {/* {this.props.appoints} */}
          <Col sm="12">
            <DataTableCustom />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth,
    appoints: state.appoints
  }
}
export default connect(mapStateToProps,{getappoints})(AnalyticsDashboard)
