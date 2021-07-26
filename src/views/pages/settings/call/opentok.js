import React from "react"
import { OTSession,OTStreams,preloadScript } from 'opentok-react';
import "../../../../assets/scss/plugins/extensions/opentok.scss"
import ConnectionStatus from "./ConnectionStatus";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";
import { connect } from "react-redux";
import { Button } from "bootstrap";




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
      App: false,
      error: null,
      connected: false,
      camerastate: true

    }
    this.sessionEvents = {
      sessionConnected: () => {
        this.setState({ connected: true });
      },
      sessionDisconnected: () => {
        this.setState({ connected: false });
      }
    };
  }


  cameraState = () => {
    this.setState(prevState => ({
      camerastate: !prevState.camerastate
    }))
  }

  // micState = () => {
  //   this.setState(prevState => ({
  //     camerastate: !prevState.camerastate
  //   }))
  // }
  onError = (err) => {
    this.setState({ error: `Failed to connect: ${err.message}` });
  }
 
  render() {
    return (
      <OTSession 
      className="col-12 m-0 p-0"
      apiKey={this.props.apikey} sessionId={this.props.session} token={this.props.token} onError={this.onError} eventHandlers={this.sessionEvents}>
        {/* <ConnectionStatus /> */}
        <Publisher camerastate={this.state.camerastate} />
        <OTStreams>
          <Subscriber/>
        </OTStreams>
        <div className="buttons" ><button>마이크 크기켜기</button><button onClick={this.cameraState}>카메라 크기켜기</button><button>끊기</button></div>
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
