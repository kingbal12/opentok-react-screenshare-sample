import React, { Component } from "react"
import {
  Progress,
  Row,
  Col,
  Input,
  Button
} from "reactstrap"
import DataTable from "react-data-table-component"
import classnames from "classnames"
import ReactPaginate from "react-paginate"
import { history } from "../../../../history"
import {
  Edit,
  Trash,
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsDown
} from "react-feather"
import { connect } from "react-redux"
import {
  getPaymentData,
  getNameData,
  getInitialData,
  deleteData,
  updateData,
  addData,
  filterData,
  resetVitalData,
  getPatientInfo,
  getVitalData
} from "../../../../redux/actions/data-list"
import Sidebar from "../notice/DataListSidebar"
import Chip from "../../../../components/@vuexy/chips/ChipComponent"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import "../../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../../assets/scss/pages/data-list.scss"
import moment from "moment"
import { CSVLink, CSVDownload } from "react-csv";
import select from "../../../../assets/img/dashboard/down-chevron.png"

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
    <div></div>
  )
}

class DataListConfig extends Component {
 constructor(props) {
    super(props);
    let lastday = String(new Date(this.state.year, this.state.month, 0).getDate())
    if(this.props.parsedFilter.perPage===undefined) {
      this.props.getPaymentData(
        this.state.user,
        this.state.year+this.state.month+"01",
        this.state.year+this.state.month+ lastday,
        this.state.rowsPerPage, this.state.currentPage)
    }
 }

  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.paydata.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.paydata,
        allData: props.dataList.filteredData,
        totalPages: props.dataList.paytotalPages,
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
    year: moment().format("YYYY"),
    month: moment().format("MM"),
    lastday: "",
    name: "",
    data: [],
    totalPages: 0,
    currentPage: 1,
    columns: [
      {
        name: "No",
        selector: "gender",
        sortable: false,
        minWidth: "150px",
        center: true,
        cell: row => <p className="text-bold-500 mb-0">{row.APPOINT_NUM}</p>
      },
      {
        name: "진료날짜",
        selector: "gender",
        sortable: false,
        center: true,
        cell: row => <p className="text-bold-500 mb-0">{moment(row.APPOINT_TIME).format("MMMM DD, YYYY")}</p>
      },
      {
        name: "환자명",
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
        name: "진료수단",
        selector: "gender",
        sortable: false,
        center: true,
        cell: row => <p className="text-bold-500 mb-0">{row.APPOINT_KIND==="1"?"전화":"화상"}</p>
      },
      {
        name: "금액",
        selector: "age",
        sortable: false,
        center: true,
        cell: row => <p className="text-bold-500 mb-0">{row.PAY_TOTAL}</p>
      },
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
      this.setState({lastday: String(new Date(this.state.year, this.state.month, 0).getDate())})

      this.props.getPaymentData(
        this.state.user,
        this.state.year+this.state.month+"01",
        this.state.year+this.state.month+this.state.lastday,
        this.props.parsedFilter.perPage, 
        this.props.parsedFilter.page)
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
              getPaymentData={this.props.getPaymentData}
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
      this.props.getNameData(5,1,this.state.name)
    }
  }


  handleRowsPerPage = value => {
    let { parsedFilter, getPaymentData } = this.props
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
    history.push(`/pages/paymentmanagement?page=${page}&perPage=${value}`)
    this.setState({currentPage: page, rowsPerPage: value })
    getPaymentData({
      user_id: this.state.user, 
      start_date: this.state.year+this.state.month+"01",
      end_date: this.state.year+this.state.month+this.state.lastday,
      page: parsedFilter.page, 
      perPage: value })
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
    let { parsedFilter, getPaymentData } = this.props
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 5
    let urlPrefix = this.props.thumbView
      ? "/data-list/thumb-view/"
      : "/pages/paymentmanagement"
    history.push(
      `${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`
    )
    // getData({ page: page.selected + 1, perPage: perPage })
    getPaymentData(
      this.state.user,
      this.state.year+this.state.month+"01",
      this.state.year+this.state.month+this.state.lastday,
      perPage, 
      page.selected + 1 )
    this.setState({ currentPage: page.selected })
  }

  getpay = () => {
    this.setState({lastday: String(new Date(this.state.year, this.state.month, 0).getDate())},() => 
    this.props.getPaymentData(
      this.state.user,
      this.state.year+this.state.month+"01",
      this.state.year+this.state.month+this.state.lastday,
      5, 
      1))
    
  }

  check = () => {
    this.setState({lastday: String(new Date(this.state.year, this.state.month, 0).getDate())},() => console.log(this.state))  
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
        <Row>
          <h4 className="text-bold-600">진료비 청구내역</h4>
        </Row>
        <Row className="mt-2">
          <Col lg="6" md="12" className="p-0 d-flex">
            <h4 className="col-2 align-self-center text-bold-600">기간</h4> 
            <Input 
              type="select" 
              name="select"
              id="select"
              className="col-2" 
              value={this.state.year}  onChange={e => this.setState({ year: e.target.value })}>            
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              
            </Input>
            
            <h5 className="align-self-center ml-1 text-bold-600">년</h5> 
            <Input
              style={{marginBottom:"0.5rem"}} 
              type="select" 
              name="select"
              id="select"
              className="col-2 ml-2"  
              value={this.state.month}  onChange={e => this.setState({ month: e.target.value })}>
                
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>                 
            </Input>

            <h5 className="align-self-center  ml-1 text-bold-600">월</h5> 
            <Button className="ml-1" style={{marginBottom:"0.5em"}} color="primary" onClick={this.getpay}>조회</Button>
          </Col>
          
        </Row>
        <Row className="col-12 mt-5 pb-1" style={{borderBottom:"solid silver 1px"}}>
          <Col lg="9" md="12"></Col>
          <Col lg="3" md="12" className="d-flex">
            <h5 className="align-self-end">총</h5>
            <h1 className="align-self-end pl-5">{this.props.dataList.totalpay}</h1>
            <h5 className="align-self-end pl-1">원</h5>
          </Col>
        </Row>
        <div className="data-list-header d-flex justify-content-between flex-wrap mt-2">    
          <h2>이번달 내역</h2>
        </div>

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
          getPaymentData={this.props.getPaymentData}
          dataParams={this.props.parsedFilter}
          addNew={this.state.addNew}
        />
        <div
          className={classnames("data-list-overlay", {
            show: sidebar
          })}
          onClick={() => this.handleSidebar(false, true)}
        />
        <Row className="d-flex mt-5">
          <Col lg="9" md="12"></Col>
          <Col lg="3" md="12">
          <CSVLink data={this.state.data}>
            <Button 
            disabled={this.props.dataList.paydata.length===0?true:false}
            color="primary" 
            type="button"
            
            >
              내역서 다운로드
            </Button>
          </CSVLink>
          </Col>
        </Row>
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
  getPaymentData,
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
