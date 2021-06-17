import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import { Users } from "react-feather"
// import { subscribersGained, subscribersGainedSeries } from "./StatisticsData"
import { connect } from "react-redux"
import { Fragment } from "react"


class SubscriberGained extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      todayappoints: props.ap
  }


}

  render() {
    return (
      <Fragment>
        <StatisticsCard
          icon={<Users className="primary" size={22} />}
          statTitle="오늘 예약 환자"
          stat={this.state.todayappoints}  
          // options={subscribersGained}
          // series={subscribersGainedSeries}
          type="area"
        />
      </Fragment>

    )
  }
}
const mapStateToProps = state => {
  return {
    ap: state.appoints.appoints.COUNT_DAY
  }
}
 
export default connect(mapStateToProps)(SubscriberGained)
