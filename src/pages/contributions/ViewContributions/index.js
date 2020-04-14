import React from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { Entities } from '../../../redux/constants'
import ActionContainer from '../../../redux/ActionContainer'
import timeUtils from '../../../utils/datetime'
import { Button, Col, DatePicker, Modal, PageHeader, Row, Spin, Table, Tooltip , Select} from 'antd'
import moment from 'moment'
import styles from './view_contributions.module.scss'

import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import ContributionsReport from './ViewContributionPDF'
import { PERIOD_DEFINITIONS } from '../../../constants/General'
import numberUtils from '../../../utils/number'

const { RangePicker } = DatePicker
const { Option } = Select

class ViewContributions extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			myTransactions: undefined,
			myTransactionsTracker: undefined,
			showContributionsPreview: false,
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

		this.fetchMyTransactions(reqParams)


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

			filterArr = [`transactionDate:gte:${fromDate}`, `transactionDate:lte:${toDate}`]
		}

		return filterArr;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.myTransactions.readMany) {
			if (prevProps.myTransactions.readMany !== this.props.myTransactions.readMany) {
				const { tracker, data } = this.props.myTransactions.readMany


				if (tracker.status === 'loading') {
					this.setState({
						...this.state,
						myTransactionsTracker: tracker,
					})
				}

				if (tracker.status === 'success') {
					// console.log('my transactions fetch a success')

					if(this.state.periodValue === "range"){
						this.setState({
							...this.state,
							myTransactions: data,
							myTransactionsTracker: tracker,
						})
					}else{
						this.setState({
							...this.state,
							startDate:  PERIOD_DEFINITIONS[this.state.periodValue].startDate,
							endDate: PERIOD_DEFINITIONS[this.state.periodValue].endDate,
							myTransactions: data,
							myTransactionsTracker: tracker,
						})
					}

				}


				if (tracker.status === 'error') {
					this.setState({
						...this.state,
						myTransactionsTracker: tracker,
					})
				}
			}
		}
	}


	fetchMyTransactions = (reqParams = {}) => {
		const { handleRequest } = this.props

		const theReqParams = {
			getParams: {
				activePage: this.props.location.pathname,
				page: -1,
				pageSize: -1,
			},
		}

		Entities.myTransactions.fnGetMyTransactions(handleRequest, { ...theReqParams, ...reqParams })
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

		this.fetchMyTransactions(reqParams);


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

			this.fetchMyTransactions(reqParams);


		}




	}

	render() {

		const columns = [
			{
				title: 'Receipt No.',
				dataIndex: 'receiptNumber',
			},
			{
				title: 'Amount',
				key: 'amountTransacted',
				render: record => numberUtils.NumberToKES(record.amountTransacted),
			},
			{
				title: 'Description',
				dataIndex: 'description',
			},
			{
				title: 'Transaction Date',
				key: 'transactionDate',
				render: record => timeUtils.formatDateTime(record.transactionDate),
			},
		]

		const { myTransactions, myTransactionsTracker, periodValue, showContributionsPreview, showRangePickerModal, startDate, endDate, isDateRangeBtnEnabled} = this.state

		return (

			<div>
				{/*<Authorize roles={['admin']} redirect to="/dashboard/beta">*/}
				<Helmet title="Make Contributions"/>
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
										title="View Contributions"

										subTitle={
											startDate === undefined || endDate === undefined ?
												"All Contributions":
												`Contributions as from ${timeUtils.fullDate(moment(startDate))} to ${timeUtils.fullDate(endDate)}`
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
													this.state.ready && myTransactions ? (
															<Button style={{ marginRight: 5 }}
																			onClick={() => this.showModal("showContributionsPreview")}
																			type="primary">Preview</Button>) :
														<Button style={{ marginRight: 5 }} loading>
															Loading PDF Preview
														</Button>
												}


												{
													this.state.ready && myTransactions ? (
														<PDFDownloadLink
															document={<ContributionsReport statements={myTransactions.records}
																								startDate={startDate}
																								endDate={endDate}/>}
															fileName="my_contributions.pdf">
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
									className={styles.contributionsTable}
									style={{ background: 'white', borderRadius: 2, borderCollapse: 'none' }}
									bordered={true}
									columns={columns}
									rowKey={record => record.id}
									dataSource={myTransactions ? myTransactions.records : []}
									loading={myTransactionsTracker ? myTransactionsTracker.status === 'loading' : false}
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
						title="Contributions Report"
						visible={showContributionsPreview}
						onCancel={() => this.hideModal("showContributionsPreview")}
						centered
						width={'80vw'}
					>
						<div style={{ margin: 0, padding: 0 }}>
							{
								this.state.ready && myTransactions ? (
									<PDFViewer width="100%" style={{ height: '90vh' }}>
										<ContributionsReport
											statements={myTransactions.records}
											startDate={startDate}
											endDate={endDate}
										/>
									</PDFViewer>
								) : <Spin tip="Loading Contributions..."/>
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

const WrappedViewContributions = withRouter(ViewContributions)

const entityObject = {}
entityObject[Entities.myTransactions.name] = {
	read: true,
	readMany: true,
}

const ConnectedViewContributions = () => (
	<ActionContainer entityObject={entityObject}>
		{(props) => <WrappedViewContributions {...props} />}
	</ActionContainer>
)

export default ConnectedViewContributions



