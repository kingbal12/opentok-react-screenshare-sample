import React from 'react';
import { OTPublisher } from 'opentok-react';
// import CheckBox from './CheckBox';

class Publisher extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        audio: true,
        video: true,
        videoSource: '1de715565c9317a8505cd4ef34943cd87f98165c164b3968f738e0740caf5ea3',
        togglescreenshare: false
      };
    }

    // componentDidMount() {
    //   this.setState({videoSource:this.props.togglescreenshare === false ? undefined : 'screen'})
    // }

    static getDerivedStateFromProps(props, state) {
      if (
        props.togglescreenshare !== state.togglescreenshare
      ) {console.log("화면공유")
        return {
          videoSource:props.togglescreenshare === false ? '1de715565c9317a8505cd4ef34943cd87f98165c164b3968f738e0740caf5ea3' : 'screen'
        }
        
      }
  
      // Return null if the state hasn't changed
      return {videoSource: state.videoSource}
    }

    // componentDidUpdate() {
    //   this.setState({videoSource:this.props.togglescreenshare === false ? undefined : 'screen'})
    // }


    setAudio = (audio) => {
        this.setState({ audio });
    }

    setVideo = (video) => {
        this.setState({ video });
    }

    changeVideoSource = (videoSource) => {
        (this.state.videoSource !== 'camera') ? this.setState({videoSource: 'camera'}) : this.setState({ videoSource: 'screen' })
    }

    onError = (err) => {
        this.setState({ error: `Failed to publish: ${err.message}` });
    }

  

    render() {
      return (
        <div className="publisher">
            {this.state.error ? <div id="error">{this.state.error}</div> : null}
            <OTPublisher
              // properties={{
              //     showControls: false,
              //     publishAudio: this.props.micstate,
              //     publishVideo: this.props.camerastate,
              //     // videoSource: this.props.togglescreenshare === true ? 'screen' : '1de715565c9317a8505cd4ef34943cd87f98165c164b3968f738e0740caf5ea3'

              //     // deviceid로 작동
              //     videoSource: this.props.togglescreenshare === true ? 'screen' : undefined
              // }}

              properties={{
                showControls: false,
                publishAudio: this.props.micstate,
                publishVideo: this.props.camerastate,
                videoSource: this.state.videoSource
              }}
            onError={this.onError}
            />
      </div>
      );
    }
  }
  export default Publisher;