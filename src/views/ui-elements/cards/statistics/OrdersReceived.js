import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import CountMonth from "../../../../assets/img/dashboard/ID9_07_btn_count_month.png"
import { FormattedMessage } from "react-intl"

class OrdersReceived extends React.Component {
  render() {
    return (
      <FormattedMessage id = "monthapp" >
        {(monthapp) =>
        <StatisticsCard
          icon={<img src={CountMonth} alt="CountMonth" />}
          iconBg="warning"
          stat={this.props.countm}
          statTitle={monthapp}
          type="area"
        />
        }
      </FormattedMessage>
    )
  }
}

export default OrdersReceived
