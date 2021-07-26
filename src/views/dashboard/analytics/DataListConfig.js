import React, { Component } from "react"
import {
  Progress
} from "reactstrap"
import DataTable from "react-data-table-component"
import classnames from "classnames"
import ReactPaginate from "react-paginate"
import { history } from "../../../history"
import {
  Edit,
  Trash,
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight
} from "react-feather"
import { connect } from "react-redux"
import {
  getAppData,
  getNameData,
  getInitialData,
  deleteData,
  updateData,
  addData,
  filterData,
  resetVitalData,
  getPatientInfo,
  getVitalData
  // eData
} from "../../../redux/actions/data-list/"
import Sidebar from "./DataListSidebar"
import Chip from "../../../components/@vuexy/chips/ChipComponent"
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../assets/scss/pages/data-list.scss"
import Call from "../../../assets/img/dashboard/ID9_07_table_method_call.png"
import Video from "../../../assets/img/dashboard/ID9_07_table_method_video.png"
import Vital_5 from "../../../assets/img/dashboard/ID9_07_table_vital5.png"
import Vital_4 from "../../../assets/img/dashboard/ID9_07_table_vital4.png"
import chartimage from "../../../assets/img/dashboard/ID09_07_chart.png"
import moment from "moment"


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
    <div className="data-list-header d-flex justify-content-between flex-wrap m-0 p-0">    
      
    </div>
  )
}

class DataListConfig extends Component {
  constructor(props) {
    super(props);
    if(this.props.parsedFilter.perPage===undefined) {
      this.props.getAppData(this.state.user, this.state.rowsPerPage, this.state.currentPage)
    }
    
}
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.apdata.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.apdata,
        allData: props.dataList.filteredData,
        totalPages: props.dataList.aptotalPages,
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
    name: "",
    data: [],
    totalPages: 0,
    currentPage: 1,
    columns: [
      {
        name: "예약시간",
        selector: "gender",
        sortable: false,
        minWidth: "150px",
        center: true,
        cell: row => <p className="text-bold-500 mb-0">{moment(row.APPOINT_TIME).format("hh:mm A")}</p>
      },
      {
        name: "진료수단",
        selector: "gender",
        sortable: false,
        center: true,
        cell: row => <p className="text-bold-500 mb-0">{row.APPOINT_KIND==="1"?<img src={Call} alt="Call" />:
        <img src={Video} alt="Video" />}</p>
      },
      {
        name: "이름",
        selector: "name",
        sortable: false,
        minWidth: "200px",
        center: true,
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.F_NAME}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.F_NAME}
              </span>
            </div>
          </div>
        )
      },
      
      {
        name: "성별",
        selector: "gender",
        sortable: false,
        center: true,
        cell: row => <p className="text-bold-500 mb-0">{row.GENDER==="1"|| row.GENDER==="3"?"M":"F"}</p>
      },
      {
        name: "나이",
        selector: "age",
        sortable: false,
        center: true,
        cell: row => <p className="text-bold-500 mb-0">{(row.AGE)}</p>
      },
      {
        name: "생년월일",
        selector: "birthday",
        sortable: false,
        center: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{(row.BIRTH_DT)}</p>
        )
      },
      {
        name: "진단명",
        center: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.NOTE_DX===""?"-":row.NOTE_DX}</p>
        )
      },
      {
        name: "초진/재진",
        center: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.FIRST_YN}</p>
        )
      },
      {
        name: "주된증상",
        center: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.SYMPTOM}</p>
        )
      },
      {
        name: "VitalData",
        center: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.VITAL_STATE===""?<img src={Vital_5} alt="Vital_5" />:<img src={Vital_4} alt="Vital_4" />}</p>
        )
      },
      {
        name: "차트보기",
        center: true,
        cell: row => (
          <img src={chartimage} alt="chartimage"   onClick={() => this.goPatientList(row.PATIENT_ID)} style={{cursor:"pointer", width:"25px"}}/>

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
    if(this.props.parsedFilter.perPage!==undefined) {

      this.props.getAppData(this.state.user,this.props.parsedFilter.perPage, this.props.parsedFilter.page)
    }
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
          sortable: false,
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
          sortable: false
        },
        {
          name: "Popularity",
          selector: "popularity",
          sortable: false,
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
          sortable: false,
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
          sortable: false,
          cell: row => `$${row.price}`
        },
        {
          name: "Actions",
          sortable: false,
          cell: row => (
            <ActionsComponent
              row={row}
              getAppData={this.props.getAppData}
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

  goPatientList(id) {
    // id.preventDefault()
    this.props.resetVitalData()
    this.props.getPatientInfo(this.state.user,id)
    this.props.getVitalData(id)
  }

  
  handleFilter = e => {
    this.setState({ name: e.target.value })
  }


  search = e => {
    e.preventDefault()
    if(this.state.name!==""){
      this.props.getNameData(this.state.user,5,1,this.state.name)
    }
    
  }


  handleRowsPerPage = value => {
    let { parsedFilter, getAppData } = this.props
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
    history.push(`/analyticsDashboard?page=${page}&perPage=${value}`)
    this.setState({currentPage: page, rowsPerPage: value })
    getAppData({ user_id: this.state.user, page: parsedFilter.page, perPage: value })
    // getData({ user_id: this.state.user, page_num: parsedFilter.page, page_amount: value })
  }

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean })
    if (addNew === true) this.setState({ currentData: null, addNew: true })
  }


  handleCurrentData = obj => {
    this.setState({ currentData: obj })
    this.handleSidebar(true)
  }

  handlePagination = page => {
    let { parsedFilter, getAppData } = this.props
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 5
    let urlPrefix = this.props.thumbView
      ? "/data-list/thumb-view/"
      : "/analyticsDashboard"
    history.push(
      `${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`
    )
    // getData({ page: page.selected + 1, perPage: perPage })
    getAppData(this.state.user, perPage, page.selected + 1 )
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
          className="p-0 m-0" 
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
          // pointerOnHover
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
          getAppData={this.props.getAppData}
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
  getAppData,
  getNameData,
  deleteData,
  updateData,
  addData,
  getInitialData,
  filterData,
  resetVitalData,
  getPatientInfo,
  getVitalData
})(DataListConfig)