import React from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { Entities } from '../../../redux/constants'
import ActionContainer from '../../../redux/ActionContainer'
import timeUtils from '../../../utils/datetime'
import { Button, Col, DatePicker, Modal, PageHeader, Row, Spin, Table, Tooltip , Select} from 'antd'
import moment from 'moment'
import styles from './view_loans.module.scss'

import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import LoansReport from './ViewLoanPDF'
import { PERIOD_DEFINITIONS } from '../../../constants/General'
import numberUtils from '../../../utils/number'

const { RangePicker } = DatePicker
const { Option } = Select;


export const getSumGuarantorAmount = guarantorsList => {
	let guarantorAmount = 0;

	if (guarantorsList.length > 0) {
		guarantorsList.map((guarantor, key) => {
			guarantorAmount += guarantor.amount;
			return guarantorAmount
		})
	}

	return guarantorAmount
};

class ViewLoans extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			myLoans: undefined,
			myLoansTracker: undefined,
			showLoansPreview: false,
			showRangePickerModal: false,
			ready: false,
			startDate: moment(timeUtils.CurrentUSDateTime()).subtract(3, 'months'),
			endDate: timeUtils.CurrentUSDateTime(),
			periodValue: "last3Months",
			isDateRangeBtnEnabled: false
		}

	}


	componentDidMount() {

		const { startDate, endDate } = this.state;

		const reqParams = {
			getParams: {
				activePage: this.props.location.pathname,
				page: -1,
				pageSize: -1,
				filterArr: this.getDateRangeFilterArr(startDate, endDate),
			},
		}

		this.fetchMyLoans(reqParams)


		// ************************************************************************************
		// BEGIN HACKY BS - wait 1ms for props and state to settle before rendering the PDF
		// react-pdf crashes if a re-render occurs when it's already rendering.

		this.setState({ ready: false })
		setTimeout(() => {
			this.setState({ ready: true })
		}, 3000)

		// END *******************************************************************************

	}


	getDateRangeFilterArr = (startDate, endDate) => {
		let filterArr;

		if (startDate === undefined || endDate === undefined) {
			filterArr = [];
		} else {
			const fromDate = timeUtils.delimitTimeWithHyphens(
				timeUtils.formatUSDateTime(startDate),
			)
			const toDate = timeUtils.delimitTimeWithHyphens(
				timeUtils.formatUSDateTime(endDate),
			)

			filterArr = [`loanFundDate:gte:${fromDate}`, `loanFundDate:lte:${toDate}`]
		}

		return filterArr;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.myLoans.readMany) {
			if (prevProps.myLoans.readMany !== this.props.myLoans.readMany) {
				const { tracker, data } = this.props.myLoans.readMany


				if (tracker.status === 'loading') {
					this.setState({
						...this.state,
						myLoansTracker: tracker,
					})
				}

				if (tracker.status === 'success') {
					// console.log('my transactions fetch a success')

					if(this.state.periodValue === "range"){
						this.setState({
							...this.state,
							myLoans: data,
							myLoansTracker: tracker,
						})
					}else{
						this.setState({
							...this.state,
							startDate:  PERIOD_DEFINITIONS[this.state.periodValue].startDate,
							endDate: PERIOD_DEFINITIONS[this.state.periodValue].endDate,
							myLoans: data,
							myLoansTracker: tracker,
						})
					}

				}


				if (tracker.status === 'error') {
					this.setState({
						...this.state,
						myLoansTracker: tracker,
					})
				}
			}
		}
	}


	fetchMyLoans = (reqParams = {}) => {
		const { handleRequest } = this.props

		const theReqParams = {
			getParams: {
				activePage: this.props.location.pathname,
				page: -1,
				pageSize: -1,
			},
		}

		Entities.myLoans.fnGetMyLoans(handleRequest, { ...theReqParams, ...reqParams })
	}

	showModal = (modalId) => {
		this.setState({
			[modalId]: true,
		})
	}

	hideModal = (modalId) => {
		// console.log(e)
		this.setState({
			[modalId]: false,
		})
	}




	handleDateRangeChange = (obj) => {
		let startDate = undefined;
		let endDate = undefined;

		if (obj.length !== 0) {
			startDate =  obj[0];
			endDate = obj[1];
		}

		this.setState({
			...this.state,
			startDate,
			endDate,
			isDateRangeBtnEnabled: true
		})
	}


	handleDateRangeFilter = () => {

		const { startDate, endDate } = this.state;

		const reqParams = {
			getParams: {
				activePage: this.props.location.pathname,
				page: -1,
				pageSize: -1,
				filterArr: this.getDateRangeFilterArr(startDate, endDate),
			},
		}

		this.fetchMyLoans(reqParams);


		this.setState({
			...this.state,
			isDateRangeBtnEnabled: false,
			showRangePickerModal: false
		})
	}

	handlePeriodChange = (periodValue) => {

		const startDate = PERIOD_DEFINITIONS[periodValue].startDate;
		const endDate = PERIOD_DEFINITIONS[periodValue].endDate;


		if(periodValue === "range"){
			// this.showModal("showRangePickerModal")

			this.setState({
				...this.state,
				showRangePickerModal: true,
				periodValue: periodValue
			})

		}else{


			const reqParams = {
				getParams: {
					activePage: this.props.location.pathname,
					page: -1,
					pageSize: -1,
					filterArr: this.getDateRangeFilterArr(startDate, endDate),
				},
			}

			this.setState({
				...this.state,
				periodValue: periodValue,
				/*startDate: undefined,
				endDate: undefined*/
			})

			this.fetchMyLoans(reqParams);


		}




	}

	render() {


		/*{
			id: 5
			uid: "FiKX8PzafDEYKAr"
			loanReference: "L1-1343-1003"
			loanStatusId: 1
			loanTypeId: 1
			loanStatusDate: 1546105663593
			loanAmountRequested: 80
			amountFundedToLoan: 0
			loanInterestRate: 1
			loanInterestAccrued: null
			loanFundDate: 1546105663602
			loanFundDueDate: 1548720000000
			otherDescription: null
			metaData: null
			created: 1546105663602
			updated: 1546105663604
			createdById: 5
			updatedById: 5
			userAccountId: 5
			userLoanStatusByLoanStatusId: {id: 1, uid: "NlAbiMx7mINojgv", ulStatusName: "PENDING REVIEW", description: "Loan request is pending review", created: 1545252744181, …}
			userLoanTypeByLoanTypeId: {id: 1, uid: "OkYXsRPPZ03kXwl", loanTypeName: "Standard Loan", loanApprovalTime: 14, loanInterestRate: 1, …}
			guarantorsById: []
		}*/

		const columns = [
			{
				title: 'Ref.',
				key: 'loanReference',
				render: record => record.loanReference,
			},
			{
				title: 'Status',
				key: 'loanStatus',
				render: record => record.userLoanStatusByLoanStatusId.ulStatusName,
			},
			{
				title: 'Status Date',
				key: 'loanStatusDate',
				render: record => timeUtils.formatDateTime(record.loanStatusDate),
			},
			{
				title: 'Interest Rate(%)',
				key: 'loanInterestRate',
				render: record => record.loanInterestRate
			},
			{
				title: 'Interest Accrued',
				key: 'loanInterestAccrued',
				render: record => numberUtils.NumberToKES(numberUtils.zeroNoIsNull(record.loanInterestAccrued))
			},
			{
				title: 'Type',
				key: 'loanTypeName',
				render: record => record.userLoanTypeByLoanTypeId.loanTypeName
			},
			{
				title: 'Start Date',
				key: 'loanFundDate',
				render: record => timeUtils.formatDateTime(record.loanFundDate),
			},
			{
				title: 'End Date',
				key: 'loanFundDueDate',
				render: record => timeUtils.formatDateTime(record.loanFundDueDate),
			},
			{
				title: 'Guaranteed',
				key: 'guaranteed',
				render: record => numberUtils.NumberToKES(getSumGuarantorAmount(record.guarantorsById)),
			},
			{
				title: 'Amount',
				key: 'loanAmountRequested',
				render: record => numberUtils.NumberToKES(record.loanAmountRequested),
			},
			{
				title: 'Amount Funded',
				key: 'amountFundedToLoan',
				render: record => numberUtils.NumberToKES(record.amountFundedToLoan),
			},
			{
				title: 'Balance',
				key: 'loanBalance',
				render: record => numberUtils.NumberToKES((record.loanAmountRequested - record.amountFundedToLoan)),
			},
		]



		const { myLoans, myLoansTracker, periodValue, showLoansPreview, showRangePickerModal, startDate, endDate, isDateRangeBtnEnabled} = this.state

		return (

			<div>
				{/*<Authorize roles={['admin']} redirect to="/dashboard/beta">*/}
				<Helmet title="View Loans"/>
				<div className="row">
					<div className="col-lg-12">
						<div className="card border" style={{ borderRadius: 2 }}>
							<div className="card-body" style={{ padding: '1.92rem 1.9rem' }}>

								<div style={{
									borderBottom: '1px solid rgb(235, 237, 240)',
									margin: '-25px -25px 20px',
								}}>
									<PageHeader
										//onBack={() => null}
										title="View Loans"

										subTitle={
											startDate === undefined || endDate === undefined ?
												"All Loans":
												`Loans as from ${timeUtils.fullDate(moment(startDate))} to ${timeUtils.fullDate(endDate)}`
										}
									/>

									<Row type="flex" justify="space-between" align={'middle'} style={{ padding: '0px 25px 15px 25px' }}>
										<Col sm={24} md={12} lg={12}>
											<div className={styles.periodSelector}>

												<Select style={{width: "150px"}} value={periodValue} onChange={this.handlePeriodChange}>
													<Option value="today">Today</Option>
													<Option value="thisWeek">This Week</Option>
													<Option value="thisMonth">
														This Month
													</Option>
													<Option value="last3Months">Last 3 Months</Option>
													<Option value="lifetime">Lifetime</Option>
													<Option value="range">Range</Option>
												</Select>
											</div>
										</Col>
										<Col sm={24} md={12} lg={12}>
											<div style={{ float: 'right' }}>

												{
													this.state.ready && myLoans ? (
															<Button style={{ marginRight: 5 }}
																			onClick={() => this.showModal("showLoansPreview")}
																			type="primary">Preview</Button>) :
														<Button style={{ marginRight: 5 }} loading>
															Loading PDF Preview
														</Button>
												}


												{
													this.state.ready && myLoans ? (
														<PDFDownloadLink
															document={<LoansReport statements={myLoans.records}
																														 startDate={startDate}
																														 endDate={endDate}/>}
															fileName="my_loans.pdf">
															{({ blob, url, loading, error }) => (
																loading ?
																	<Button loading>
																		Loading
																	</Button> :
																	<Button>Download PDF</Button>
															)}
														</PDFDownloadLink>
													) : <Button loading>
														Loading Download PDF
													</Button>
												}

											</div>
										</Col>
									</Row>
								</div>


								<Table
									className={styles.loansTable}
									style={{ background: 'white', borderRadius: 2, borderCollapse: 'none' }}
									bordered={true}
									columns={columns}
									rowKey={record => record.id}
									dataSource={myLoans ? myLoans.records : []}
									loading={myLoansTracker ? myLoansTracker.status === 'loading' : false}
									pagination={false}
									scroll={{
										x: true,
										scrollToFirstRowOnChange: true
									}}
								/>
							</div>
						</div>
					</div>


					<Modal
						title="Loans Report"
						visible={showLoansPreview}
						onCancel={() => this.hideModal("showLoansPreview")}
						centered
						width={'80vw'}
					>
						<div style={{ margin: 0, padding: 0 }}>
							{
								this.state.ready && myLoans ? (
									<PDFViewer width="100%" style={{ height: '90vh' }}>
										<LoansReport
											statements={myLoans.records}
											startDate={startDate}
											endDate={endDate}
										/>
									</PDFViewer>
								) : <Spin tip="Loading Loans..."/>
							}
						</div>
					</Modal>


					<Modal
						title="Select Range"
						visible={showRangePickerModal}
						onOk={this.handleDateRangeFilter}
						onCancel={() => this.hideModal("showRangePickerModal")}
						centered
						// width={'100vw'}
					>
						<div
							style={{ margin: 0, padding: 0 }}
						>
							<RangePicker
								style={{width: "100%"}}
								separator={'~'}
								showTime
								defaultValue={[moment(startDate), moment(endDate)]}
								format={'DD-MM-YYYY HH:mm'}
								ranges={{
									Today: [moment().startOf('day'), moment().endOf('day')],
									'This Week': [moment().startOf('week'), moment().endOf('week')],
									'This Month': [moment().startOf('month'), moment().endOf('month')],
									'Last 3 Months': [moment().subtract(3, 'months'), moment()],
									'Lifetime': [],
								}}
								onChange={this.handleDateRangeChange}
							/>
						</div>
					</Modal>
				</div>
			</div>
			/*</Authorize>*/
		)
	}
}

const WrappedViewLoans = withRouter(ViewLoans)

const entityObject = {}
entityObject[Entities.myLoans.name] = {
	read: true,
	readMany: true,
}

const ConnectedViewLoans = () => (
	<ActionContainer entityObject={entityObject}>
		{(props) => <WrappedViewLoans {...props} />}
	</ActionContainer>
)

export default ConnectedViewLoans



