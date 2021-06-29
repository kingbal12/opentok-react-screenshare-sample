import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import { Users } from "react-feather"
// import { subscribersGained, subscribersGainedSeries } from "./StatisticsData"
import { Fragment } from "react"


class SubscriberGained extends React.Component {
  render() {
    return (
      <Fragment>
        <StatisticsCard
          icon={<Users className="primary" size={22} />}
          statTitle="오늘 예약 환자"
          stat={this.props.countd}  
          // options={subscribersGained}
          // series={subscribersGainedSeries}
          type="area"
        />
      </Fragment>

    )
  }
}

 
export default SubscriberGained
