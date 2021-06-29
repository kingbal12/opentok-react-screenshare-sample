import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import { Package } from "react-feather"
// import { ordersReceived, ordersReceivedSeries } from "./StatisticsData"

class OrdersReceived extends React.Component {
  render() {
    return (
      <StatisticsCard
        icon={<Package className="warning" size={22} />}
        iconBg="warning"
        stat={this.props.countm}
        statTitle="이번달 예약 환자"
        // options={ordersReceived}
        // series={ordersReceivedSeries}
        type="area"
      />
    )
  }
}

export default OrdersReceived
