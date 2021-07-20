import React from "react"
import {FormGroup, Button,
  InputGroup,Input,
  CustomInput,
  Card,
  CardTitle,
  CardBody,
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import {
  getPastConulstList,
  resetVitalData,
  postMDNoteData,
  postPrescriptionData
} from "../../../../redux/actions/data-list"
import { Check } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import "../../../../assets/scss/pages/authentication.scss"
import {connect} from "react-redux"
import userImg from "../../../../assets/img/portrait/small/avatar-s-11.jpg"
import SliderBasic from "./SliderBasic"
import { ContextLayout } from "../../../../utility/context/Layout"
import { Fragment } from "react"
import { OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } from 'opentok-react';
import {Helmet} from "react-helmet";
import { Menu } from "react-feather"
import axios from "axios"
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
      <OTSession apiKey="47274054" sessionId="2_MX40NzI3NDA1NH5-MTYyNjMzNzUwMTUxMX5iR2UyYUt3b2UvREtLRnBUOXhKTTlwUDF-UH4" token= "T1==cGFydG5lcl9pZD00NzI3NDA1NCZzaWc9MTQ3Mjc2N2UxOGJhYWFiOTAwNmNiYzBiZjNmMGVhYWE0MTNkMDVmMjpzZXNzaW9uX2lkPTJfTVg0ME56STNOREExTkg1LU1UWXlOak16TnpVd01UVXhNWDVpUjJVeVlVdDNiMlV2UkV0TFJuQlVPWGhLVFRsd1VERi1VSDQmY3JlYXRlX3RpbWU9MTYyNjMzNzUwMSZub25jZT0tMTQwMjczNDgxMyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjI2NDIzOTAx">
        <OTPublisher />
        <OTStreams>
          <OTSubscriber />
        </OTStreams>
      </OTSession>
    )
  }
}



export default preloadScript (ConsultingRoom)
