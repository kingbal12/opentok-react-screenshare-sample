import React from "react"
import axios from "axios"
import {
  Card,
  CardBody,
  Badge
} from "reactstrap"
import DataTable from "react-data-table-component"
import { Star, Search } from "react-feather"



class DataTableCustom extends React.Component {
  state = {
    columns: [
      {
        name: "예약시간",
        selector: "date",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.date}</p>
        )
      },
      {
        name: "진료수단",
        // selector: "date",
        // sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{}</p>
        )
      },
      
      {
        name: "이름",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            {/* <div className="user-img ml-xl-0 ml-2">
              <img
                className="img-fluid rounded-circle"
                height="36"
                width="36"
                src={row.image}
                alt={row.name}
              />
            </div> */}
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.name}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.name}
              </span>
              {/* <small title={row.email}>{row.email}</small> */}
            </div>
          </div>
        )
      },
      
      {
        name: "성별",
        selector: "sex",
        sortable: true,
        cell: row => (
          <Badge
            color={row.status === "inactive" ? "light-danger" : "light-success"}
            pill>
            {row.status}
          </Badge>
        )
      },
      {
        name: "나이",
        selector: "age",
        sortable: true,
        cell: row => <p className="text-bold-500 mb-0">{row.revenue}</p>
      },
      {
        name: "생년월일",
        selector: "birthday",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.date}</p>
        )
      },
      {
        name: "진단명",
        // selector: "date",
        // sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{}</p>
        )
      },
      {
        name: "초진/재진",
        // selector: "date",
        // sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{}</p>
        )
      },
      {
        name: "주된 증상",
        // selector: "date",
        // sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{}</p>
        )
      },
      {
        name: "VitalData",
        selector: "",
        sortable: true,
        cell: row => {
          return (
            <div className="d-flex flex-column align-items-center">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <Star size="20" className="text-warning" />
                </li>
                <li className="list-inline-item">
                  <Star size="20" className="text-warning" />
                </li>
                <li className="list-inline-item">
                  <Star
                    size="20"
                    className={
                      row.ratings === "good" || row.ratings === "average"
                        ? "text-warning"
                        : "text-muted"
                    }
                  />
                </li>
                <li className="list-inline-item">
                  <Star
                    size="20"
                    className={
                      row.ratings === "good" ? "text-warning" : "text-muted"
                    }
                  />
                </li>
                <li className="list-inline-item">
                  <Star
                    size="20"
                    className={
                      row.ratings === "good" ? "text-warning" : "text-muted"
                    }
                  />
                </li>
              </ul>
            </div>
          )
        }
      },
      {
        name: "차트보기",
        // selector: "date",
        // sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{}</p>
        )
      },
    ],
    data: [     
      // {
      //   image: require("../../../assets/img/portrait/small/avatar-s-2.jpg"),
      //   name: "Alyss Lillecrop",
      //   email: "alillecrop0@twitpic.com",
      //   date: "May 13, 2018",
      //   status: "active",
      //   revenue: "$32,000",
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

