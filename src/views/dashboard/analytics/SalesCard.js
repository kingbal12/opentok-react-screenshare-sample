import React from "react"
import { Card, CardBody } from "reactstrap"
import { Award } from "react-feather"

import decorLeft from "../../../assets/img/elements/decore-left.png"
import decorRight from "../../../assets/img/elements/decore-right.png"
import DisplayName from "./DisplayName";
import { connect } from "react-redux";
import moment from 'moment'
import { FormattedMessage } from "react-intl"

const today = moment().format("YYYY년 M월 DD일 입니다.")
const entoday = moment().format("this is M DD, YYYY")

class SalesCard extends React.Component {
  render() {
    return (
      <Card className="bg-analytics text-white sales-card">
        <CardBody className="text-center">
          <img src={decorLeft} alt="card-img-left" className="img-left" />
          <img src={decorRight} alt="card-img-right" className="img-right" />
          <div className="avatar avatar-xl bg-primary shadow avatar-dashboard mt-0">
            <div className="avatar-content">
              <Award className="text-white" size={28} />
            </div>
          </div>
          <div className="award-info text-center w-125">
            <h1 className="mb-2 text-white"><FormattedMessage id="hello"/><DisplayName /><FormattedMessage id="님"/></h1>
            <h1 className="m-auto mb-0 w-75 text-white">
              {today}
            </h1>
          </div>
        </CardBody>
      </Card>
    )
  }
}


export default SalesCard
