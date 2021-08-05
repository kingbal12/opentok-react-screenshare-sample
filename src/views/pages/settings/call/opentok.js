import React from "react"
import { OTSession,OTStreams,preloadScript,  OTSubscriber } from 'opentok-react';
import "../../../../assets/scss/plugins/extensions/opentok.scss"
import ConnectionStatus from "./ConnectionStatus";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";
import ScreenShare from "./ScreenShare"
import { connect } from "react-redux";
import { Button } from "bootstrap";
import video from "../../../../assets/img/call/ID25_14_btn_op_video.png"
import mic from "../../../../assets/img/call/ID25_14_btn_op_mic.png"
import call from "../../../../assets/img/call/ID25_14_btn_op_end-call.png"
import ScreenSharingAccPack from "opentok-screen-sharing"
import { Fragment } from "react";


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
      camerastate: true,
      micstate: true,
      disconnect: "N",
      onsubscribe: false
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

  micState = () => {
    this.setState(prevState => ({
      micstate: !prevState.micstate
    }))
  }
  onError = (err) => {
    this.setState({ error: `Failed to connect: ${err.message}` });
  }

  check = () => {
    console.log(this.state)
  }

  disconnectSession = () => {
    this.setState({disconnect: true})
  }

  childFunction = () => {
    this.props.parentFunction(this.state.onsubscribe); 
  }

  onSubscribe = () => {
    this.setState({
      onsubscribe: "Y"
    })
    this.childFunction()
  }

  childText = 'childText';
    
  

 
  render() {
    return (       
      <OTSession 
        className="col-12 m-0 p-0"
        apiKey={this.props.apikey} 
        sessionId={this.props.session} 
        token={this.props.token} 
        onError={this.onError} 
        eventHandlers={this.sessionEvents}
      >
        {/* <ConnectionStatus /> */}
        <Publisher togglescreenshare={this.props.toglescreenshare} micstate={this.state.micstate} camerastate={this.state.camerastate} />
        <OTStreams>
          <OTSubscriber
            className="otsubscriber"
            properties={{
              subscribeToAudio: this.state.audio,
              subscribeToVideo: this.state.video
            }}
            onSubscribe={this.onSubscribe}
            onError={this.onError}
          />
        </OTStreams>
    <div className="buttons">
          <img src={mic} onClick={this.micState} style={{cursor:"pointer", width: "40px"}} />
          <img src={video} onClick={this.cameraState} style={{cursor:"pointer",  width: "40px"}} className="mr-2"/>
          <img src={call} onClick={this.disconnectSession} style={{cursor:"pointer",  width: "40px"}}/>
          {/* <button onClick={this.check}>확인용</button> */}
          {/* <button onClick={this.childFunction}>Click</button> */}
        </div>
        
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
