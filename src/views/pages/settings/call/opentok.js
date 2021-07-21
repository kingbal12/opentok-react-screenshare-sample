import React from "react"
import { OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } from 'opentok-react';
import "../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import "../../../../assets/scss/plugins/extensions/recharts.scss"




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
      <OTSession apiKey="47274054" sessionId="2_MX40NzI3NDA1NH5-MTYyNjgzMTI5Mjc4MX41bzh1SC80WkZGVHhuS3pLek80MUhDRnB-UH4" token= "T1==cGFydG5lcl9pZD00NzI3NDA1NCZzaWc9MjAzZmZmNWQ5YzA1ZWI0NTZiOTgzNmEzZmYwYTVjNDQ2OGM0ZWNmMTpzZXNzaW9uX2lkPTJfTVg0ME56STNOREExTkg1LU1UWXlOamd6TVRJNU1qYzRNWDQxYnpoMVNDODBXa1pHVkhodVMzcExlazgwTVVoRFJuQi1VSDQmY3JlYXRlX3RpbWU9MTYyNjgzMTI5MiZub25jZT0tMjM4NTk2MzgzJnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2MjY5MTc2OTI=">
        <OTPublisher />
        <OTStreams>
          <OTSubscriber  />
        </OTStreams>
      </OTSession>
    )
  }
}



export default preloadScript (ConsultingRoom)
