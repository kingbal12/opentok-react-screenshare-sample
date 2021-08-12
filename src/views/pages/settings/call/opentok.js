import React from "react"
import { OTSession,OTStreams,preloadScript,  OTSubscriber, OTPublisher } from 'opentok-react';
import "../../../../assets/scss/plugins/extensions/opentok.scss"
import ConnectionStatus from "./ConnectionStatus";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";
import ScreenShare from "./ScreenShare"
import { connect } from "react-redux";
import { Button } from "bootstrap";
import video from "../../../../assets/img/call/ID25_14_btn_op_video.png"
import mic from "../../../../assets/img/call/ID25_14_btn_op_mic.png"
import video_off from "../../../../assets/img/call/ID25_14_btn_op_video_off.png"
import mic_off from "../../../../assets/img/call/ID25_14_btn_op_mic_off.png"
import call from "../../../../assets/img/call/ID25_14_btn_op_end-call.png"
import ScreenSharingAccPack from "opentok-screen-sharing"
import { Fragment } from "react";


class ConsultingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      streams: [],
      error: null,
      connected: false,
      camerastate: true,
      micstate: true,
      disconnect: false,
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
    this.setState({connected: false})
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
    
  
  onError2 = (err) => {
    this.setState({ error: `Failed to publish: ${err.message}` });
    alert("인터넷 상태로 인해 화면공유에 오류가 발생하였습니다\n화면공유를 다시 시도해 주십시오")
    window.location.reload()
  }


 
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

          {this.state.error ? <div id="error">{this.state.error}</div> : null}
              <OTPublisher
                properties={{
                    showControls: false,
                    publishAudio: this.state.micstate,
                    publishVideo: this.state.camerastate,
                    // videoSource: this.props.togglescreenshare === true ? 'screen' : '1de715565c9317a8505cd4ef34943cd87f98165c164b3968f738e0740caf5ea3'

                    // deviceid로 작동
                    // videoSource: this.props.togglescreenshare === true ? 'screen' : undefined
                    videoSource: undefined
                }}
                onError={this.onError1}
              />

            
            {this.props.toglescreenshare !== false ?
              <OTPublisher
                properties={{
                    showControls: false,
                    publishAudio: this.state.micstate,
                    publishVideo: this.state.camerastate,
                    // videoSource: this.props.togglescreenshare === true ? 'screen' : '1de715565c9317a8505cd4ef34943cd87f98165c164b3968f738e0740caf5ea3'

                    // deviceid로 작동
                    // videoSource: this.props.togglescreenshare === true ? 'screen' : undefined
                    videoSource: 'screen'
                }}
                onError={this.onError2}
              />
               : null
            }
        <OTStreams>
          <OTSubscriber
            className="otsubscriber"
            properties={{
              showControls: false,
              subscribeToAudio: this.state.audio,
              subscribeToVideo: this.state.video
            }}
            onSubscribe={this.onSubscribe}
            onError={this.onError}
          />
        </OTStreams>
    <div className="buttons">
          <img src={this.state.micstate===true?mic:mic_off} onClick={this.micState} style={{cursor:"pointer", width: "40px"}} />
          <img src={this.state.camerastate===true?video:video_off} onClick={this.cameraState} style={{cursor:"pointer",  width: "40px"}} className="mr-2"/>
          <img src={call} onClick={this.sessionEvents.sessionDisconnected} style={{cursor:"pointer",  width: "40px"}}/>
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
