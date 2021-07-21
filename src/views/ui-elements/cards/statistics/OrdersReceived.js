import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import CountMonth from "../../../../assets/img/dashboard/ID9_07_btn_count_month.png"

class OrdersReceived extends React.Component {
  render() {
    return (
      <StatisticsCard
        icon={<img src={CountMonth} alt="CountMonth" />}
        iconBg="warning"
        stat={this.props.countm}
        statTitle="이번달 예약 환자"
        type="area"
      />
    )
  }
}

export default OrdersReceived
