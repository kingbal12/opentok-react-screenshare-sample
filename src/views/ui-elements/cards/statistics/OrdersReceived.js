import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import { Package } from "react-feather"
// import { ordersReceived, ordersReceivedSeries } from "./StatisticsData"
import {connect} from "react-redux"

class OrdersReceived extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      mon : props.app
    }

    
  }
  render() {
    return (
      <StatisticsCard
        icon={<Package className="warning" size={22} />}
        iconBg="warning"
        stat={this.state.mon}
        statTitle="이번달 예약 환자"
        // options={ordersReceived}
        // series={ordersReceivedSeries}
        type="area"
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    app: state.appoints.appoints.COUNT_MON
  }
}
export default connect(mapStateToProps) (OrdersReceived)
