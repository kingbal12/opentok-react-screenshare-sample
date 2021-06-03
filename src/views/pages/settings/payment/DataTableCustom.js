import React from "react"
import axios from "axios"
import {
  Card,
  CardBody,
  Badge
} from "reactstrap"
import DataTable from "react-data-table-component"
import { Star, Search } from "react-feather"
import {
  Edit,
  Link,
  Trash,
  ChevronDown,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight
} from "react-feather"

const ActionsComponent = props => {
  return (
    <div className="data-list-action">
      <Edit
        className="cursor-pointer mr-1"
        size={20}
        // onClick={() => {
        //   return props.currentData(props.row)
        // }}
      />
      {/* <Trash
        className="cursor-pointer"
        size={20}
        onClick={() => {
          props.deleteRow(props.row)
        }}
      /> */}
    </div>
  )
}

class DataTableCustom extends React.Component {
  state = {
    columns: [
      {
        name: "No.",
        selector: "No",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.number}</p>
        )
      },
      {
        name: "진료날짜",
        selector: "date",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.date}</p>
        )
      },
      
      {
        name: "환자명",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: row => <p className="text-bold-500 mb-0">{row.F_NAME}</p>
      },
      
      {
        name: "진료수단",
        selector: "treatment",
        sortable: true,
        cell: row => <p className="text-bold-500 mb-0">{row.treatment}</p>
      },
      {
        name: "금액",
        selector: "price",
        sortable: true,
        cell: row => <p className="text-bold-500 mb-0">{row.price}</p>
      }
    ],
    data: [     
      // {
      //   APPOINT_TIME: "09:00",
      //   F_NAME: "김지선",
      //   email: "alillecrop0@twitpic.com",
      //   GENDER: "F",
      //   AGE: "29",
      //   BIRTH_DT:"1993.04.22",
      //   NOTE_DX:"-",
      //   FIRST_YN:"초진",
      //   SYMPTOM:"눈이 아파요",
      //   ratings: "good"
      // },
      // {
      //   image: require("../../../assets/img/portrait/small/avatar-s-1.jpg"),
      //   name: "Shep Pentlow",
      //   email: "spentlow1@home.pl",
      //   date: "June 5, 2019",
      //   status: "active",
      //   revenue: "$50,000",
      //   ratings: "good"
      // },
      // {
      //   image: require("../../../assets/img/portrait/small/avatar-s-3.jpg"),
      //   name: "Gasper Morley",
      //   email: "gmorley2@chronoengine.com",
      //   date: "December 24, 2019",
      //   status: "active",
      //   revenue: "$78,000",
      //   ratings: "average"
      // },
      // {
      //   image: require("../../../assets/img/portrait/small/avatar-s-4.jpg"),
      //   name: "Phaedra Jerrard",
      //   email: "pjerrard3@blogs.com",
      //   date: "November 30, 2018",
      //   status: "inactive",
      //   revenue: "$10,000",
      //   ratings: "bad"
      // },
      // {
      //   image: require("../../../assets/img/portrait/small/avatar-s-5.jpg"),
      //   name: "Conn Plose",
      //   email: "cplose4@geocities.com",
      //   date: "April 8, 2017",
      //   status: "active",
      //   revenue: "$22,000",
      //   ratings: "average"
      // },
      // {
      //   image: require("../../../assets/img/portrait/small/avatar-s-6.jpg"),
      //   name: "Tootsie Brandsma",
      //   email: "tbrandsma5@theatlantic.com",
      //   date: "August 12, 2019",
      //   status: "inactive",
      //   revenue: "$49,000",
      //   ratings: "bad"
      // }
    ],
    filteredData: [],
    value: ""
  }

  handleFilter = e => {
    let value = e.target.value
    let data = this.state.data
    let filteredData = this.state.filteredData
    this.setState({ value })

    if (value.length) {
      filteredData = data.filter(item => {
        let startsWithCondition =
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.date.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.revenue.toLowerCase().startsWith(value.toLowerCase()) ||
          item.status.toLowerCase().startsWith(value.toLowerCase())
        let includesCondition =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.date.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.revenue.toLowerCase().includes(value.toLowerCase()) ||
          item.status.toLowerCase().includes(value.toLowerCase())

        if (startsWithCondition) {
          return startsWithCondition
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition
        } else return null
      })
      this.setState({ filteredData })
    }
  }

  render() {
    let { data, columns, value, filteredData } = this.state
    return (
      <Card>
        <CardBody className="rdt_Wrapper">
          <DataTable
            className="dataTable-custom"
            data={value.length ? filteredData : data}
            columns={columns}
            noHeader
            pagination
          />
        </CardBody>
      </Card>
    )
  }
}

export default DataTableCustom

