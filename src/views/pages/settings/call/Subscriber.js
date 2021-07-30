// src/components/Subscriber.js
import React from 'react';
import { OTSubscriber } from 'opentok-react';
import { Button } from 'bootstrap';
// import CheckBox from './CheckBox';

class Subscriber extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      audio: true,
      video: true,
      onsubscribe: false
    };
  }

  setAudio = (audio) => {
    this.setState({ audio });
  }

  setVideo = (video) => {
    this.setState({ video });
  }

  onError = (err) => {
    this.setState({ error: `Failed to subscribe: ${err.message}` });
  }

  onSubscribe = () => {
    this.setState(prevState => ({
      onsubscribe: !prevState.onsubscribe
    }))
  }

  render() {
    return (
      <div className="subscriber">
        {this.state.error ? <div id="error">{this.state.error}</div> : null}
        <OTSubscriber
          className="otsubscriber"
          properties={{
            subscribeToAudio: this.state.audio,
            subscribeToVideo: this.state.video
          }}
          onSubscribe={this.onSubscribe}
          onError={this.onError}
        />
      </div>
    );
  }
}
export default Subscriber;