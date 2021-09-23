import React, { Component } from "react"
import {
  Button,
  Progress,
  Input,
  UncontrolledTooltip
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
  getData,
  getNameData,
  getInitialData,
  deleteData,
  updateData,
  addData,
  filterData,
  resetVitalData,
  getPatientInfo,
  getVitalData,
  resetSearchName
  // eData
} from "../../../redux/actions/data-list"
import Sidebar from "./DataListSidebar"
import Chip from "../../../components/@vuexy/chips/ChipComponent"
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"

import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../assets/scss/pages/data-list.scss"
import { Fragment } from "react"
import pressure_1 from "../../../assets/img/dashboard/ID12_08_vital_pressure1.png"
import pressure_2 from "../../../assets/img/dashboard/ID12_08_vital_pressure2.png"
import pressure_3 from "../../../assets/img/dashboard/ID12_08_vital_pressure3.png"
import pressure_4 from "../../../assets/img/dashboard/ID12_08_vital_pressure4.png"
import pressure_5 from "../../../assets/img/dashboard/ID12_08_vital_pressure5.png"
import pulse_1 from "../../../assets/img/dashboard/ID12_08_vital_pulse1.png"
import pulse_2 from "../../../assets/img/dashboard/ID12_08_vital_pulse2.png"
import pulse_3 from "../../../assets/img/dashboard/ID12_08_vital_pulse3.png"
import pulse_4 from "../../../assets/img/dashboard/ID12_08_vital_pulse4.png"
import pulse_5 from "../../../assets/img/dashboard/ID12_08_vital_pulse5.png"
import weight_1 from "../../../assets/img/dashboard/ID12_08_vital_weight1.png"
import weight_2 from "../../../assets/img/dashboard/ID12_08_vital_weight2.png"
import weight_3 from "../../../assets/img/dashboard/ID12_08_vital_weight3.png"
import weight_4 from "../../../assets/img/dashboard/ID12_08_vital_weight4.png"
import weight_5 from "../../../assets/img/dashboard/ID12_08_vital_weight5.png"
import glucose_1 from "../../../assets/img/dashboard/ID12_08_vital_glucose1.png"
import glucose_2 from "../../../assets/img/dashboard/ID12_08_vital_glucose2.png"
import glucose_3 from "../../../assets/img/dashboard/ID12_08_vital_glucose3.png"
import glucose_4 from "../../../assets/img/dashboard/ID12_08_vital_glucose4.png"
import glucose_5 from "../../../assets/img/dashboard/ID12_08_vital_glucose5.png"
import temperature_1 from "../../../assets/img/dashboard/ID12_08_vital_temperature1.png"
import temperature_2 from "../../../assets/img/dashboard/ID12_08_vital_temperature2.png"
import temperature_3 from "../../../assets/img/dashboard/ID12_08_vital_temperature3.png"
import temperature_4 from "../../../assets/img/dashboard/ID12_08_vital_temperature4.png"
import temperature_5 from "../../../assets/img/dashboard/ID12_08_vital_temperature5.png"
import spo2_1 from "../../../assets/img/dashboard/ID12_08_vital_spo2 1.png"
import spo2_2 from "../../../assets/img/dashboard/ID12_08_vital_spo2 2.png"
import spo2_3 from "../../../assets/img/dashboard/ID12_08_vital_spo2 3.png"
import spo2_4 from "../../../assets/img/dashboard/ID12_08_vital_spo2 4.png"
import spo2_5 from "../../../assets/img/dashboard/ID12_08_vital_spo2 5.png"
import chartimage from "../../../assets/img/dashboard/ID09_07_chart.png"
import { FormattedMessage } from "react-intl"

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
      <div className="actions-right d-flex flex-wrap mt-sm-0 mt-2 col-8">
        <div className="filter-section col-5">
            <Input 
              type="text" 
              placeholder="환자 이름으로 검색" 
              onChange={e => props.handleFilter(e)} 
              onKeyPress={
                (e) => {
                  if(e.key==="Enter"){
                    props.search(e)
                  }
                }
              } 
            />
        </div>
        <Button className="ml-2" color='primary' outline onClick={e => props.search(e)}><FormattedMessage id="검색" /></Button>
      </div>
    </div>
  )
}

class DataListConfig extends Component {
  constructor(props) {
    super(props);
    if(this.props.parsedFilter.perPage===undefined) {
      this.props.getData(this.state.user, this.state.rowsPerPage, this.state.currentPage)
    }
    
    
}
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
    name: "",
    data: [],
    totalPages: 0,
    currentPage: 1,
    columns: [  
      {
        name: <FormattedMessage id="name"/>,
        selector: "name",
        sortable: false,
        minWidth: "200px",
        center:true,
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
        name: <FormattedMessage id="성별"/>,
        selector: "gender",
        sortable: false,
        center:true,
        cell: row => <p className="text-bold-500 mb-0">{row.GENDER==="1"||row.GENDER==="3"?"M":"F"}</p>
      },
      {
        name: <FormattedMessage id="나이"/>,
        selector: "age",
        sortable: false,
        center:true,
        cell: row => <p className="text-bold-500 mb-0">{row.AGE}</p>
      },
      {
        name: <FormattedMessage id="생년월일"/>,
        selector: "birthday",
        sortable: false,
        center:true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.BIRTH_DT}</p>
        )
      },
      // {
      //   name: "진단명",
      //   center:true,
      //   cell: row => (
      //     <p className="text-bold-500 text-truncate mb-0">{row.NOTE_DX}</p>
      //   )
      // },
      {
        name: <FormattedMessage id="초진/재진"/>,
        center:true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.FIRST_YN==="Y"?<FormattedMessage id="초진"/>:row.FIRST_YN===""?<FormattedMessage id="초진"/>:<FormattedMessage id="재진"/>}</p>
        )
      },
      {
        name: "Vital Data",
        center:true,
        cell: row => (
          <Fragment>
            {
              row.BP==="00"?<img id="혈압" src={pressure_2} alt="pressure_2"/>:
              row.BP==="01"?<img id="혈압" src={pressure_1} alt="pressure_1"/>:
              row.BP==="99"?<img id="혈압" src={pressure_1} alt="pressure_1"/>:
              row.BP==="02"?<img id="혈압" src={pressure_5} alt="pressure_5"/>:
              row.BP==="03"?<img id="혈압" src={pressure_4} alt="pressure_4"/>:
              row.BP==="04"?<img id="혈압" src={pressure_3} alt="pressure_3"/>:
              null
            }
            {
              row.PULSE==="00"?<img id="맥박" src={pulse_2} alt="pulse_2"/>:
              row.PULSE==="01"?<img id="맥박" src={pulse_1} alt="pulse_1"/>:
              row.PULSE==="99"?<img id="맥박" src={pulse_1} alt="pulse_1"/>:
              row.PULSE==="02"?<img id="맥박" src={pulse_5} alt="pulse_5"/>:
              row.PULSE==="03"?<img id="맥박" src={pulse_4} alt="pulse_4"/>:
              row.PULSE==="04"?<img id="맥박" src={pulse_3} alt="pulse_3"/>:
              null
            }
            {
              row.BW==="00"?<img id="체중" src={weight_2} alt="weight_2"/>:
              row.BW==="01"?<img id="체중" src={weight_1} alt="weight_1"/>:
              row.BW==="99"?<img id="체중" src={weight_1} alt="weight_1"/>:
              row.BW==="02"?<img id="체중" src={weight_5} alt="weight_5"/>:
              row.BW==="03"?<img id="체중" src={weight_4} alt="weight_4"/>:
              row.BW==="04"?<img id="체중" src={weight_3} alt="weight_3"/>:
              null 
            }
            {
              row.BS==="00"?<img id="혈당" src={glucose_2} alt="glucose_2"/>:
              row.BS==="01"?<img id="혈당" src={glucose_1} alt="glucose_1"/>:
              row.BS==="99"?<img id="혈당" src={glucose_1} alt="glucose_1"/>:
              row.BS==="02"?<img id="혈당" src={glucose_5} alt="glucose_5"/>:
              row.BS==="03"?<img id="혈당" src={glucose_4} alt="glucose_4"/>:
              row.BS==="04"?<img id="혈당" src={glucose_3} alt="glucose_3"/>:
              null
            }
            {
              row.TEMPERATURE==="00"?<img id="체온" src={temperature_2} alt="temperature_2"/>:
              row.TEMPERATURE==="01"?<img id="체온" src={temperature_1} alt="temperature_1"/>:
              row.TEMPERATURE==="99"?<img id="체온" src={temperature_1} alt="temperature_1"/>:
              row.TEMPERATURE==="02"?<img id="체온" src={temperature_5} alt="temperature_5"/>:
              row.TEMPERATURE==="03"?<img id="체온" src={temperature_4} alt="temperature_4"/>:
              row.TEMPERATURE==="04"?<img id="체온" src={temperature_3} alt="temperature_3"/>:
              null 
            }
            {
              row.SPO2==="00"?<img id="산소포화도" src={spo2_2} alt="spo2_2"/>:
              row.SPO2==="01"?<img id="산소포화도" src={spo2_1} alt="spo2_1"/>:
              row.SPO2==="99"?<img id="산소포화도" src={spo2_1} alt="spo2_1"/>:
              row.SPO2==="02"?<img id="산소포화도" src={spo2_5} alt="spo2_5"/>:
              row.SPO2==="03"?<img id="산소포화도" src={spo2_4} alt="spo2_4"/>:
              row.SPO2==="04"?<img id="산소포화도" src={spo2_3} alt="spo2_3"/>:
              null
            }
            <UncontrolledTooltip
              placement="bottom"
              target="혈압"
            >
              혈압
            </UncontrolledTooltip>
            <UncontrolledTooltip
              placement="bottom"
              target="맥박"
            >
              맥박
            </UncontrolledTooltip>
            <UncontrolledTooltip
              placement="bottom"
              target="체중"
            >
              체중
            </UncontrolledTooltip>
            <UncontrolledTooltip
              placement="bottom"
              target="혈당"
            >
              혈당
            </UncontrolledTooltip>
            <UncontrolledTooltip
              placement="bottom"
              target="체온"
            >
              체온
            </UncontrolledTooltip>
            <UncontrolledTooltip
              placement="bottom"
              target="산소포화도"
            >
              산소포화도
            </UncontrolledTooltip>
          </Fragment>

          // 가운데로 옮길것
          
        )
      },
      {
        name: <FormattedMessage id="차트보기"/>,
        center:true,
        cell: row => (
          <img src={chartimage} alt="chartimage"  onClick={() => this.goPatientList(row.PATIENT_ID)} style={{cursor:"pointer", width:"25px"}} />
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
    if(this.props.parsedFilter.perPage!==undefined){
      this.props.getData(this.state.user,this.props.parsedFilter.perPage, this.props.parsedFilter.page)
    } else {
      window.onpopstate = () =>{
        if (this.props.dataList.searchName !== "") {
          this.props.getNameData(this.state.user,5,1,this.props.dataList.searchName)
        }
      }
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

  

  goPatientList(id) {
    // id.preventDefault()
    this.props.resetVitalData()
    this.props.getPatientInfo(this.state.user,id,"")
    this.props.getVitalData(id)
  }

  
  handleFilter = e => {
    this.setState({ name: e.target.value })
  }

  handleKeyPress = e => {
    e.preventDefault()
    if(e.key==="Enter"){
      alert("엔터키 눌림")
    }
  }


  search = e => {
    e.preventDefault()
    if(this.state.name!==""){
      this.props.getNameData(this.state.user,5,1,this.state.name)
    }
  }


  handleRowsPerPage = value => {
    let { parsedFilter, getData } = this.props
    let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
    history.push(`/patients-list?page=${page}&perPage=${value}`)
    this.setState({currentPage: page, rowsPerPage: value })
    getData({ user_id: this.state.user, page: parsedFilter.page, perPage: value })
    // getData({ user_id: this.state.user, page_num: parsedFilter.page, page_amount: value })
  }

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean })
    if (addNew === true) this.setState({ currentData: null, addNew: true })
  }

  // handleDelete = row => {
  //   this.props.deleteData(row)
  //   this.props.getData(this.props.parsedFilter)
  //   if (this.state.data.length - 1 === 0) {
  //     let urlPrefix = this.props.thumbView
  //       ? "/data-list/thumb-view/"
  //       : "/patients-list"
  //     history.push(
  //       `${urlPrefix}list-view?page=${parseInt(
  //         this.props.parsedFilter.page - 1
  //       )}&perPage=${this.props.parsedFilter.perPage}`
  //     )
  //     this.props.getData({
  //       page: this.props.parsedFilter.page - 1,
  //       perPage: this.props.parsedFilter.perPage
  //     })
  //   }
  // }

  handleCurrentData = obj => {
    this.setState({ currentData: obj })
    this.handleSidebar(true)
  }

  handlePagination = page => {
    let { parsedFilter, getData } = this.props
    let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 5
    let urlPrefix = this.props.thumbView
      ? "/data-list/thumb-view/"
      : "/patients-list"
    history.push(
      `${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`
    )
    // getData({ page: page.selected + 1, perPage: perPage })
    getData(this.state.user, perPage, page.selected + 1 )
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
  filterData,
  resetVitalData,
  getPatientInfo,
  getVitalData,
  resetSearchName
})(DataListConfig)
