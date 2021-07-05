import React, { Component } from "react"
import {
  Button,
  Progress,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input
} from "reactstrap"
import DataTable from "react-data-table-component"
import classnames from "classnames"
import ReactPaginate from "react-paginate"
import { history } from "../../../history"
import {
  Edit,
  Trash,
  Droplet,
  Activity,
  Thermometer,
  Compass,
  Inbox,
  ChevronDown,
  Plus,
  Check,
  Link,
  
  ChevronLeft,
  ChevronRight
} from "react-feather"
import { connect } from "react-redux"
import {
  getData,
  getNameData,
  getInitialData,
  deleteData,
  updateData,
  addData,
  filterData
} from "../../../redux/actions/data-list/"
import Sidebar from "./DataListSidebar"
import Chip from "../../../components/@vuexy/chips/ChipComponent"
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"

import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../assets/scss/pages/data-list.scss"
import { Fragment } from "react"

const chipColors = {
  "on hold": "warning",
  delivered: "success",
  pending: "primary",
  canceled: "danger"
}

const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: "rgba(115,103,240,.05)",
      color: "#7367F0 !important",
      boxShadow: "0 0 1px 0 #7367F0 !important",
      "&:hover": {
        transform: "translateY(0px) !important"
      }
    }
  }
}

const ActionsComponent = props => {
  return (
    <div className="data-list-action">
      <Edit
        className="cursor-pointer mr-1"
        size={20}
        onClick={() => {
          return props.currentData(props.row)
        }}
      />
      <Trash
        className="cursor-pointer"
        size={20}
        onClick={() => {
          props.deleteRow(props.row)
        }}
      />
    </div>
  )
}

const CustomHeader = props => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      {/* <div className="actions-left d-flex flex-wrap">
        <UncontrolledDropdown className="data-list-dropdown mr-1">
          <DropdownToggle className="p-1" color="primary">
            <span className="align-middle mr-1">Actions</span>
            <ChevronDown size={15} />
          </DropdownToggle>
          <DropdownMenu tag="div" right>
            <DropdownItem tag="a">Delete</DropdownItem>
            <DropdownItem tag="a">Archive</DropdownItem>
            <DropdownItem tag="a">Print</DropdownItem>
            <DropdownItem tag="a">Export</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <Button
          className="add-new-btn"
          color="primary"
          onClick={() => props.handleSidebar(true, true)}
          outline>
          <Plus size={15} />
          <span className="align-middle">Add New</span>
        </Button>
      </div> */}
      <div className="actions-right d-flex flex-wrap mt-sm-0 mt-2 col-8">
        <UncontrolledDropdown className="data-list-rows-dropdown mr-1 d-md-block d-none">
          <DropdownToggle color="" className="sort-dropdown">
            <span className="align-middle mx-50">
              {`${props.index[0]} - ${props.index[1]} of ${props.total}`}
            </span>
            <ChevronDown size={15} />
          </DropdownToggle>
          <DropdownMenu tag="div" right>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(5)}>
              5
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(10)}>
              10
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(15)}>
              15
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(20)}>
              20
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div className="filter-section col-5">
          <Input type="text" placeholder="Search" onChange={e => props.handleFilter(e)} />
        </div>
        <Button className="ml-2" color='primary' outline onClick={e => props.search(e)}>검색</Button>
      </div>
    </div>
  )
}

class DataListConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.data,
        allData: props.dataList.filteredData,
        totalPages: props.dataList.totalPages,
        currentPage: parseInt(props.parsedFilter.page) - 1,
        rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.dataList.totalRecords,
        sortIndex: props.dataList.sortIndex
      }
    }

    // Return null if the state hasn't changed
    return null
  }

  state = {
    user: this.props.user.login.values.loggedInUser.username,
    data: [],
    totalPages: 0,
    currentPage: 0,
    columns: [
      // {
      //   name: "Name",
      //   selector: "name",
      //   sortable: true,
      //   minWidth: "300px",
      //   cell: row => (
      //     <p title={row.name} className="text-truncate text-bold-500 mb-0">
      //       {row.name}
      //     </p>
      //   )
      // },
      // {
      //   name: "Category",
      //   selector: "category",
      //   sortable: true
      // },
      // {
      //   name: "Popularity",
      //   selector: "popularity",
      //   sortable: true,
      //   cell: row => (
      //     <Progress
      //       className="w-100 mb-0"
      //       color={row.popularity.color}
      //       value={row.popularity.popValue}
      //     />
      //   )
      // },
      // {
      //   name: "Order Status",
      //   selector: "order_status",
      //   sortable: true,
      //   cell: row => (
      //     <Chip
      //       className="m-0"
      //       color={chipColors[row.order_status]}
      //       text={row.order_status}
      //     />
      //   )
      // },
      // {
      //   name: "Price",
      //   selector: "price",
      //   sortable: true,
      //   cell: row => `$${row.price}`
      // },
      // {
      //   name: "Actions",
      //   sortable: true,
      //   cell: row => (
      //     <ActionsComponent
      //       row={row}
      //       getData={this.props.getData}
      //       parsedFilter={this.props.parsedFilter}
      //       currentData={this.handleCurrentData}
      //       deleteRow={this.handleDelete}
      //     />
      //   )
      // }   
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
                title={row.F_NAME}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.F_NAME}
              </span>
              {/* <small title={row.email}>{row.email}</small> */}
            </div>
          </div>
        )
      },
      
      {
        name: "성별",
        selector: "gender",
        sortable: true,
        cell: row => <p className="text-bold-500 mb-0">{row.GENDER==="1"||row.GENDER==="3"?"M":"F"}</p>
      },
      {
        name: "나이",
        selector: "age",
        sortable: true,
        cell: row => <p className="text-bold-500 mb-0">{row.AGE}</p>
      },
      {
        name: "생년월일",
        selector: "birthday",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.BIRTH_DT}</p>
        )
      },
      {
        name: "진단명",
        // selector: "date",
        // sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.NOTE_DX}</p>
        )
      },
      {
        name: "초진/재진",
        // selector: "date",
        // sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.FIRST_YN}</p>
        )
      },
      {
        name: "VitalData",
        // selector: "",
        // sortable: true,
        cell: row => (
          <Fragment>
            <Droplet stroke={row.BP==="00"?"silver":row.BP==="01"?"white":row.BP==="02"?"green":row.BP==="03"?"yellow":row.BP==="04"?"red":""}></Droplet>
            <Activity stroke={row.PULSE==="00"?"silver":row.PULSE==="01"?"white":row.PULSE==="02"?"green":row.PULSE==="03"?"yellow":row.PULSE==="04"?"red":""}></Activity>
            <Thermometer stroke={row.TEMPERATURE==="00"?"silver":row.TEMPERATURE==="01"?"white":row.TEMPERATURE==="02"?"green":row.TEMPERATURE==="03"?"yellow":row.TEMPERATURE==="04"?"red":""}></Thermometer>
            <Droplet stroke={row.BS==="00"?"silver":row.BS==="01"?"white":row.BS==="02"?"green":row.BS==="03"?"yellow":row.BS==="04"?"red":""}></Droplet>
            <Compass stroke={row.SPO2==="00"?"silver":row.SPO2==="01"?"white":row.SPO2==="02"?"green":row.SPO2==="03"?"yellow":row.SPO2==="04"?"red":""}></Compass>
            <Inbox stroke={row.BW==="00"?"silver":row.BW==="01"?"white":row.BW==="02"?"green":row.BW==="03"?"yellow":row.BW==="04"?"red":""}></Inbox>
          </Fragment>

          // 가운데로 옮길것
          
        )
        // cell: row => {
        //   return (
        //     <div className="d-flex flex-column align-items-center">
        //       <ul className="list-inline mb-0">
        //         <li className="list-inline-item">
        //           <Star size="20" className="text-warning" />
        //         </li>
        //         <li className="list-inline-item">
        //           <Star size="20" className="text-warning" />
        //         </li>
        //         <li className="list-inline-item">
        //           <Star
        //             size="20"
        //             className={
        //               row.ratings === "good" || row.ratings === "average"
        //                 ? "text-warning"
        //                 : "text-muted"
        //             }
        //           />
        //         </li>
        //         <li className="list-inline-item">
        //           <Star
        //             size="20"
        //             className={
        //               row.ratings === "good" ? "text-warning" : "text-muted"
        //             }
        //           />
        //         </li>
        //         <li className="list-inline-item">
        //           <Star
        //             size="20"
        //             className={
        //               row.ratings === "good" ? "text-warning" : "text-muted"
        //             }
        //           />
        //         </li>
        //       </ul>
        //     </div>
        //   )
        // }
      },
      {
        name: "차트보기",
        // selector: "date",
        // sortable: true,
        cell: row => (
          <Edit></Edit>
          // 가운데로 옮길것
          // <ActionsComponent
          //   row={row}
          //   getData={this.props.getData}
          //   parsedFilter={this.props.parsedFilter}
          //   currentData={this.handleCurrentData}
          // />
        )
      }
    ],
    allData: [],
    value: "",
    rowsPerPage: 5,
    sidebar: false,
    currentData: null,
    selected: [],
    totalRecords: 0,
    sortIndex: [],
    addNew: ""
  }

  thumbView = this.props.thumbView

  componentDidMount() {
    // this.props.getData(this.props.parsedFilter)
    this.props.getData(this.state.user,5,1)
    // this.props.getInitialData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.thumbView) {
      this.thumbView = false
      let columns = [
        {
          name: "Image",
          selector: "img",
          minWidth: "220px",
          cell: row => <img src={row.img} height="100" alt={row.name} />
        },
        {
          name: "Name",
          selector: "name",
          sortable: true,
          minWidth: "250px",
          cell: row => (
            <p title={row.name} className="text-truncate text-bold-500 mb-0">
              {row.name}
            </p>
          )
        },
        {
          name: "Category",
          selector: "category",
          sortable: true
        },
        {
          name: "Popularity",
          selector: "popularity",
          sortable: true,
          cell: row => (
            <Progress
              className="w-100 mb-0"
              color={row.popularity.color}
              value={row.popularity.popValue}
            />
          )
        },
        {
          name: "Order Status",
          selector: "order_status",
          sortable: true,
          cell: row => (
            <Chip
              className="m-0"
              color={chipColors[row.order_status]}
              text={row.order_status}
            />
          )
        },
        {
          name: "Price",
          selector: "price",
          sortable: true,
          cell: row => `$${row.price}`
        },
        {
          name: "Actions",
          sortable: true,
          cell: row => (
            <ActionsComponent
              row={row}
              getData={this.props.getData}
              parsedFilter={this.props.parsedFilter}
              currentData={this.handleCurrentData}
              deleteRow={this.handleDelete}
            />
          )
        }
      ]
      this.setState({ columns })
    }
  }

  
  handleFilter = e => {
    this.setState({ value: e.target.value })
    // this.props.filterData(e.target.value)
  }

  search = e => {
    e.preventDefault()
    this.props.getNameData(this.state.user,5,1,this.state.value)
  }


  handleRowsPerPage = value => {
    let { parsedFilter, getData } = this.props
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
    history.push(`/patients-list?page=${page}&perPage=${value}`)
    this.setState({ rowsPerPage: value })
    // getData({ page: parsedFilter.page, perPage: value })
    getData({ user_id: this.state.user, page_num: parsedFilter.page, page_amount: value })
  }

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean })
    if (addNew === true) this.setState({ currentData: null, addNew: true })
  }

  handleDelete = row => {
    this.props.deleteData(row)
    this.props.getData(this.props.parsedFilter)
    if (this.state.data.length - 1 === 0) {
      let urlPrefix = this.props.thumbView
        ? "/data-list/thumb-view/"
        : "/patients-list"
      history.push(
        `${urlPrefix}list-view?page=${parseInt(
          this.props.parsedFilter.page - 1
        )}&perPage=${this.props.parsedFilter.perPage}`
      )
      this.props.getData({
        page: this.props.parsedFilter.page - 1,
        perPage: this.props.parsedFilter.perPage
      })
    }
  }

  handleCurrentData = obj => {
    this.setState({ currentData: obj })
    this.handleSidebar(true)
  }

  handlePagination = page => {
    let { parsedFilter, getData } = this.props
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 5
    let urlPrefix = this.props.thumbView
      ? "/data-list/thumb-view/"
      : "/patients-list/"
    history.push(
      `${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`
    )
    // getData({ page: page.selected + 1, perPage: perPage })
    this.props.getData(this.state.user, page.selected + 1, perPage )
    this.setState({ currentPage: page.selected })
  }

  render() {
    let {
      columns,
      data,
      allData,
      totalPages,
      value,
      rowsPerPage,
      currentData,
      sidebar,
      totalRecords,
      sortIndex
    } = this.state
    return (
      <div
        className={`data-list ${
          this.props.thumbView ? "thumb-view" : "list-view"
        }`}>
          {/* <Button className="ml-2" color='primary' outline onClick={this.seeState}>검색</Button> */}
        <DataTable
          columns={columns}
          data={value.length ? allData : data}
          pagination
          paginationServer
          paginationComponent={() => (
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={totalPages}
              containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
              activeClassName="active"
              forcePage={
                this.props.parsedFilter.page
                  ? parseInt(this.props.parsedFilter.page - 1)
                  : 0
              }
              onPageChange={page => this.handlePagination(page)}
            />
          )}
          noHeader
          subHeader
          // selectableRows
          responsive
          pointerOnHover
          selectableRowsHighlight
          onSelectedRowsChange={data =>
            this.setState({ selected: data.selectedRows })
          }
          customStyles={selectedStyle}
          subHeaderComponent={
            <CustomHeader
              search={this.search}
              handleSidebar={this.handleSidebar}
              handleFilter={this.handleFilter}
              handleRowsPerPage={this.handleRowsPerPage}
              rowsPerPage={rowsPerPage}
              total={totalRecords}
              index={sortIndex}
            />
          }
          sortIcon={<ChevronDown />}
            selectableRowsComponent={Checkbox}
            selectableRowsComponentProps={{
              color: "primary",
              icon: <Check className="vx-icon" size={12} />,
              label: "",
              size: "sm"
            }}
        />
        <Sidebar
          show={sidebar}
          data={currentData}
          updateData={this.props.updateData}
          addData={this.props.addData}
          handleSidebar={this.handleSidebar}
          thumbView={this.props.thumbView}
          getData={this.props.getData}
          dataParams={this.props.parsedFilter}
          addNew={this.state.addNew}
        />
        <div
          className={classnames("data-list-overlay", {
            show: sidebar
          })}
          onClick={() => this.handleSidebar(false, true)}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    dataList: state.dataList
  }
}

export default connect(mapStateToProps, {
  getData,
  getNameData,
  deleteData,
  updateData,
  addData,
  getInitialData,
  filterData
})(DataListConfig)
