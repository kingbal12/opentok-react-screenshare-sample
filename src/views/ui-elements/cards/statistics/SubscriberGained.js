import React from "react";
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard";
import { Fragment } from "react";
import CountToday from "../../../../assets/img/dashboard/ID9_07_btn_count_today.png";
import { FormattedMessage } from "react-intl";

class SubscriberGained extends React.Component {
  render() {
    return (
      <Fragment>
        <FormattedMessage id="todayapp">
          {(todayapp) => (
            <StatisticsCard
              icon={<img src={CountToday} alt="CountToday" />}
              statTitle={todayapp}
              stat={this.props.countd}
              type="area"
            />
          )}
        </FormattedMessage>
      </Fragment>
    );
  }
}

export default SubscriberGained;
