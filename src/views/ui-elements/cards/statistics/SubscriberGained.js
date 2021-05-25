import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import { Users } from "react-feather"
import { subscribersGained, subscribersGainedSeries } from "./StatisticsData"
import { connect } from "react-redux"
import { Fragment } from "react"

class SubscriberGained extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      day:props.appointsday
    }
  }
  render() {
    return (
      <Fragment>
        <StatisticsCard
          icon={<Users className="primary" size={22} />}
          stat="92.6k"
          statTitle="오늘 예약 환자"
          // options={subscribersGained}
          // series={subscribersGainedSeries}
          type="area"
        />
        {/* <div><h2>{this.state.day}</h2></div> */}
      </Fragment>

    )
  }
}
const mapStateToProps = state => {
  return {
    appointsday: state.appoints
  }
}
export default connect(mapStateToProps)(SubscriberGained)
