import React, { Component } from "react"
import {
  Progress,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col
} from "reactstrap"
import DataTable from "react-data-table-component"
import classnames from "classnames"
import ReactPaginate from "react-paginate"
import { history } from "../../../../history"
import {
  Edit,
  Trash,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from "react-feather"
import { connect } from "react-redux"
import {
  getPastConulstList,
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
} from "../../../../redux/actions/data-list"
import Sidebar from "./DataListSidebar"
import Chip from "../../../../components/@vuexy/chips/ChipComponent"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"

import "../../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../../assets/scss/pages/data-list.scss"
import moment from "moment"
import previmg from "../../../../assets/img/dashboard/ID13_11_file.png"
import prescription from "../../../../assets/img/dashboard/ID14_12_prescription.png"
import { Collapse } from "bootstrap"

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





const ExpandedComponent = props => {
  let file_preview = null;
  let pres_preview = null;
    {props.data===null||props.data.FILE_NAME===""?
      file_preview = 
        <embed
          src={previmg}
          className="dz-img"
          alt=""
        />
      :file_preview = 
        <embed
          width="70px"
          height="80px" 
          src={"https://health.iot4health.co.kr:9300"+props.data.FILE_PATH
          +props.data.FILE_NAME}
          className="dz-img"
          alt=""
          style={{cursor:"pointer"}} 
          // onClick={this.viewFileModal}
        />
    }

    

    {props.data===null||props.data.RX_NAME===""?
      pres_preview = 
        <embed
          src={prescription}
          className="dz-img"
          alt=""
        />
      :pres_preview = 
        <embed 
          width="70px"
          height="80px" 
          src={"https://health.iot4health.co.kr:9300"+props.data.RX_PATH
          +props.data.RX_NAME}
          style={{cursor:"pointer"}} 
          // onClick={this.viewPressModal}
        />
    }
  return(

    <Card style={{background:"#efefef"}}>
      <Card className="p-0 m-0" style={{ marginBottom: '0rem', background:"#efefef"}}>
        <CardBody className="m-0">
          <Row className="m-0">
            <Col className="col-4 m-0">
              <Card className="m-0" style={{height:"23rem"}} >
                <CardHeader><b className="text-primary">MD Note</b></CardHeader>
                <CardBody>
                  <Row>
                    <Col className="col-3 text-center"><b>C.C:</b></Col>
                    <Col className="col-9 align-self-center">{props.data.NOTE_CC}</Col>
                  </Row>
                  <Row className="mt-1">
                    <Col className="col-3  text-center"><b>Diagnosis:</b></Col>
                    <Col className="col-9 align-self-center">{props.data.NOTE_DX}</Col>
                  </Row>
                  <Row className="mt-1">
                    <Col className="col-3  text-center"><b>Tx &#38; Rx: </b></Col>
                    <Col className="col-9 align-self-center">{props.data.NOTE_RX}</Col>
                  </Row>
                  <Row className="mt-1">
                    <Col className="col-4  text-center"><b>Recommendation:</b></Col>
                    <Col className="col-8 align-self-center">{props.data.NOTE_VITAL}</Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col className="col-4 m-0">
              <Card style={{height:"10.5rem"}}>
                <CardHeader><b className="text-primary">Present Condition</b></CardHeader>
                <CardBody>
                  {props.data.SYMPTOM}
                </CardBody>
              </Card>
              <Card style={{height:"10.5rem"}}>
                <CardHeader><b className="text-primary">Files</b></CardHeader>
                <CardBody>
                  {file_preview}
                </CardBody>
              </Card>
            </Col> 
            <Col className="col-4 m-0">
              <Card style={{height:"23rem"}}>
                <CardHeader><b className="text-primary">Prescription</b></CardHeader>
                <CardBody>
                  {pres_preview}
                </CardBody>
              </Card>
            </Col>
          </Row> 
        </CardBody>
      </Card>
    </Card>
  )
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
    <div style={{height:"0%"}}>    
    
    </div>
  )
}

class DataListConfig extends Component {
  constructor(props) {
    super(props);
    if(this.props.parsedFilter.perPage===undefined) {
      this.props.getPastConulstList(this.props.dataList.pid, this.state.rowsPerPage, this.state.currentPage)
    }
    
    
}
  static getDerivedStateFromProps(props, state) {
    if (
      props.dataList.data.length !== state.data.length ||
      state.currentPage !== props.parsedFilter.page
    ) {
      return {
        data: props.dataList.pastconsultlist,
        allData: props.dataList.filteredData,
        totalPages: props.dataList.pastconsulttotal,
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
        name: "진료과/진료의",
        selector: "name",
        sortable: false,
        maxWidth: "300px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.F_NAME}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.PART_NAME} &nbsp; {row.F_NAME}
              </span>
            </div>
          </div>
          
        )
      },
      
      {
        name: "진단명",
        selector: "gender",
        sortable: false,
        maxWidth: "300px",
        cell: row => <p className="text-bold-500 mb-0">{row.NOTE_DX}</p>
      },
      {
        name: "진료일자",
        selector: "age",
        sortable: false,
        cell: row => <p className="text-bold-500 mb-0">{moment(row.APPOINT_TIME).format("MMMM DD, YYYY")}</p>
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
    if(this.props.parsedFilter.perPage!==undefined){
      this.props.getPastConulstList(this.props.dataList.pid,this.props.parsedFilter.perPage, this.props.parsedFilter.page)
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
              getPastConulstList={this.props.getPastConulstList}
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
    let { parsedFilter, getPastConulstList } = this.props
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
    history.push(`/pages/phoneconsulting?page=${page}&perPage=${value}`)
    this.setState({currentPage: page, rowsPerPage: value })
    getPastConulstList({ user_id: this.props.dataList.pid, page: parsedFilter.page, perPage: value })
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
    let { parsedFilter, getPastConulstList } = this.props
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 5
    let urlPrefix = this.props.thumbView
      ? "/data-list/thumb-view/"
      : "/pages/phoneconsulting"
    history.push(
      `${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`
    )
    // getPastConulstList({ page: page.selected + 1, perPage: perPage })
    getPastConulstList(this.props.dataList.pid, perPage, page.selected + 1 )
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
          expandableRows
          expandableRowDisabled={row => row.disabled}
          expandOnRowClicked
          expandableRowsComponent={<ExpandedComponent />}
          pagination
          paginationServer
          expandableIcon={{
            collapsed:<ChevronDown/>,
            expanded:<ChevronUp/>
          }}
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
          // subHeader

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
          getPastConulstList={this.props.getPastConulstList}
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
    dataList: state.dataList,
    cousultlist: state.dataList.pastconsultlist,
  }
}

export default connect(mapStateToProps, {
  getPastConulstList,
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
