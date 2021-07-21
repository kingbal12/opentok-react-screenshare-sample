import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import { Fragment } from "react"
import CountToday from "../../../../assets/img/dashboard/ID9_07_btn_count_today.png"



class SubscriberGained extends React.Component {
  render() {
    return (
      <Fragment>
        <StatisticsCard
          icon={<img src={CountToday} alt="CountToday" />}
          statTitle="오늘 예약 환자"
          stat={this.props.countd}  
          type="area"
        />
      </Fragment>

    )
  }
}

 
export default SubscriberGained
