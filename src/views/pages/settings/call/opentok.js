import React from "react"
import { OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } from 'opentok-react';
import "../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import "../../../../assets/scss/plugins/extensions/recharts.scss"
import { connect } from "react-redux";




class ConsultingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      streams: [],
      cc: "",
      diagnosis: "",
      txrx: "",
      recommendation: "",
      pcode: "",
      pname: "",
      paddress: "",
      telnum: "", 
      faxnum: "",
      filename: "",
      file : "",
      mdnotemodal: false,
      presmodal: false,
      paymodal: false,
      pharmacy: false,
      App: false

    }
  }


 
  render() {
    return (
      <OTSession iapiKey={this.props.key} sessionId={this.props.session} token={this.props.token}>
        <OTPublisher />
        <OTStreams>
          <OTSubscriber  />
        </OTStreams>
      </OTSession>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    dataList: state.dataList,
    appo: state.dataList.appointment,
    pinfo: state.dataList.patient,
    cslist: state.dataList.csdata,
    bpdata: state.dataList.BP,
    pulstdata: state.dataList.PULSE,
    tempdata: state.dataList.TEMP,
    bsdata : state.dataList.BS,
    wedata : state.dataList.WE,
    spo2data : state.dataList.SPO2

  }
}

export default preloadScript (ConsultingRoom)
