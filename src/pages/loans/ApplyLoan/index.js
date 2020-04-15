import React from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import {
	AutoComplete,
	Button,
	Col,
	Descriptions,
	Divider,
	Form,
	Input,
	InputNumber,
	PageHeader,
	Result,
	Row,
	Select,
} from 'antd'
import { Entities } from '../../../redux/constants'
import ActionContainer from '../../../redux/ActionContainer'
import { getUserDetails } from '../../../utils/Session'
import numberUtils from '../../../utils/number'
import timeUtils from '../../../utils/datetime'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const { Option } = Select

// @Form.create()
class ApplyLoan extends React.Component {
	state = {
		confirmMPESAPayment: { data: [], tracker: undefined },
		loanTypes: { data: [], tracker: undefined },
		transactionDesc: 'CONTRIBUTION',
		contributionMade: {
			status: false,
			type: 'MpesaExpress', // "LipaNaMpesa
		},
		fields: [],
	}


	confirmMPESAPayment = ({ type, paymentReference, phoneNumber }) => {
		const { handleRequest } = this.props

		const reqParams = {
			getParams: {
				activePage: this.props.location.pathname,
				type,
				paymentReference,
				phoneNumber,
			},
		}

		Entities.confirmMPESAPayment.fnApplyLoan(handleRequest, reqParams)
	}


	fetchLoanTypes = () => {
		const { handleRequest } = this.props

		const reqParams = {
			getParams: {
				activePage: this.props.location.pathname,
			},
		}

		Entities.loanTypes.fnGetLoanTypes(handleRequest, reqParams)
	}

	componentDidMount() {
		this.fetchLoanTypes();
	}


	componentDidUpdate(prevProps, prevState, snapshot) {
		/*if (this.props.confirmMPESAPayment.readOne) {
			if (prevProps.confirmMPESAPayment.readOne !== this.props.confirmMPESAPayment.readOne) {
				const { tracker, data } = this.props.confirmMPESAPayment.readOne
				const { confirmMPESAPayment } = this.state


				if (tracker.status === 'loading') {
					const theApplyLoan = confirmMPESAPayment
					theApplyLoan.tracker = tracker
					this.setState({
						confirmMPESAPayment: theApplyLoan,
					})


				}
				if (tracker.status === 'success') {
					let contributionMade = {}
					contributionMade['status'] = true
					const theApplyLoan = confirmMPESAPayment
					theApplyLoan.tracker = tracker
					theApplyLoan.data = data
					this.setState({
						confirmMPESAPayment: theApplyLoan,
						contributionMade,
					})
				}


				if (tracker.status === 'error') {
					let contributionMade = {}
					contributionMade['status'] = true
					const theApplyLoan = confirmMPESAPayment
					theApplyLoan.tracker = tracker
					this.setState({
						confirmMPESAPayment: theApplyLoan,
						contributionMade,
					})
				}
			}
		}*/


		if(this.props.loanTypes.readMany){
			if(prevProps.loanTypes.readMany !== this.props.loanTypes.readMany){
				const { tracker, data } = this.props.loanTypes.readMany
				const { loanTypes } = this.state


				if (tracker.status === 'loading') {
					const theLoanTypes = loanTypes
					theLoanTypes.tracker = tracker
					this.setState({
						loanTypes: theLoanTypes,
					})


				}
				if (tracker.status === 'success') {
					const theLoanTypes = loanTypes
					theLoanTypes.tracker = tracker
					theLoanTypes.data = data.records
					this.setState({
						loanTypes: theLoanTypes,
					})
				}


				if (tracker.status === 'error') {
					const theLoanTypes = loanTypes
					theLoanTypes.tracker = tracker
					this.setState({
						loanTypes: theLoanTypes,
					})
				}
			}
		}

	}


	onFinish = values => {
		console.log('Success:', values)
	}

	onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	onSubmit = event => {
		event.preventDefault()
		const { form } = this.props
		form.validateFieldsAndScroll((error, values) => {
			if (!error) {
				this.confirmMPESAPayment({
					type: 'MISC',
					paymentReference: values.paymentReference,
					phoneNumber: values.phoneNumber,
				})
			}
		})
	}

	resetForm = () => {
		const contributionMade = {
			status: false,
		}
		this.setState({ ...this.state, contributionMade })


	}


	render() {

		const layout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 16 },
		}
		const tailLayout = {
			wrapperCol: { offset: 8, span: 16 },
		}

		const rules = [{ required: true }]


		const { contributionMade, loanTypes } = this.state

		//console.log("my wallets ", myWallets);
		console.log('contributionMade ', contributionMade)

		return (

			<div>
				{/*<Authorize roles={['admin']} redirect to="/dashboard/beta">*/}
				<Helmet title="Apply Loan"/>


				<div className="row">
					<div className="col-lg-12">
						<div className="card border" style={{ borderRadius: 2 }}>
							<div className="card-body">
								<PageHeader
									style={{
										borderBottom: '1px solid rgb(235, 237, 240)',
										margin: '-25px -32px 20px -32px',
									}}
									className="site-page-header"
									//onBack={() => null}
									title="Apply a loan"
									subTitle="Select a loan type and apply for a loan"
								/>


								{
									contributionMade.status ? (
										<React.Fragment>
											{/*{
												!!confirmMPESAPayment.tracker && confirmMPESAPayment.tracker.status === 'success' &&
												<Result
													status={'success'}
													title={'Payment exists'}
													subTitle={
														<Descriptions title="Payment Details" bordered
																					column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
															<Descriptions.Item label="Ref">{confirmMPESAPayment.data.reference}</Descriptions.Item>
															<Descriptions.Item label="Account">{confirmMPESAPayment.data.account}</Descriptions.Item>
															<Descriptions.Item label="Sender">{confirmMPESAPayment.data.sender}</Descriptions.Item>
															<Descriptions.Item
																label="Sender Details">{confirmMPESAPayment.data.senderDetails}</Descriptions.Item>
															<Descriptions.Item
																label="Receiver">{confirmMPESAPayment.data.receiver}</Descriptions.Item>
															<Descriptions.Item
																label="Receiver Details">{confirmMPESAPayment.data.receiverDetails}</Descriptions.Item>
															<Descriptions.Item
																label="Amount">{numberUtils.NumberToKES(confirmMPESAPayment.data.amount)}</Descriptions.Item>
															<Descriptions.Item
																label="Date">{timeUtils.formatDateTime(confirmMPESAPayment.data.dateCreated)}</Descriptions.Item>
														</Descriptions>
													}
													extra={[
														<Button
															//type="primary"
															key="console"
															style={{ background: '#46be8a', color: '#ffffff', border: 'none' }}
															onClick={() => this.props.history.push('/contributions/view')}
														>
															View Contributions
														</Button>,
													]}
												>
												</Result>
											}

											{
												!!confirmMPESAPayment.tracker && confirmMPESAPayment.tracker.status === 'error' &&
												<Result
													status={'error'}
													title={confirmMPESAPayment.tracker.errors[0].error}
													subTitle={<p>{confirmMPESAPayment.tracker.errors[0].message}</p>}
													extra={[
														<Button
															//type="primary"
															key="console"
															style={{ background: '#46be8a', color: '#ffffff', border: 'none' }}
															onClick={() => this.resetForm()}
														>
															Retry
														</Button>,
													]}
												>
												</Result>
											}*/}

										</React.Fragment>
									) : (
										<React.Fragment>
											<Form
												{...layout}
												name="apply_loan"
												onFinish={this.onFinish}
												onFinishFailed={this.onFinishFailed}
											>
												<Form.Item
													label="Loan Type"
													name={'loanType'}
													rules={[{ required: true, message: 'Please select a loan type!' }]}
												>
													<Select placeholder={'Select a Loan Type'}>

														{
															loanTypes.data.length > 0 ? (
																loanTypes.data.map((loanType)=> (
																	<Option key={loanType.id} value={loanType.id}>{loanType.loanTypeName}</Option>
																))
															) : []
														}
													</Select>
												</Form.Item>

												<Form.Item
													label="Amount"
													name={'amount'}
													rules={[{ required: true, message: 'Please input the Amount!' }]}
												>
													<InputNumber style={{ width: '100%' }} min={0}/>
												</Form.Item>

												<Form.Item
													label="Loan Period"
													name={'loanPeriod'}
													rules={[{ required: true, message: 'Please input the Loan Period!' }]}
												>
													<InputNumber style={{ width: '100%' }} min={0}/>
												</Form.Item>
												{/*<Form.List name={"quarantors"}>

												</Form.List>*/}

												<Divider>Guarantors Details</Divider>


												<Form.List name="users">
													{(fields, { add, remove }) => {
														return (
															<div style={{marginBottom: 10}}>
																{fields.map((field, index) => (
																	<Row key={field.key}
																			 gutter={[8, 8]}
																		justify="space-between" align={"middle"}
																	>
																		<Col md={11} sm={24}>
																			<Form.Item
																				noStyle
																				name={[field.name, 'guarantorName']}
																				fieldKey={[field.fieldKey, 'guarantorName']}
																				rules={rules}
																				style={{ width: '100%' }}
																			>
																				<AutoComplete style={{ width: '100%' }} placeholder="Guarantor Name">
																					<AutoComplete.Option value={'ochomoswill'}>ochomoswill</AutoComplete.Option>
																					<AutoComplete.Option value={'dmutende'}>dmutende</AutoComplete.Option>
																					<AutoComplete.Option value={'afrovik'}>afrovik</AutoComplete.Option>
																					<AutoComplete.Option value={'carmoseti'}>carmoseti</AutoComplete.Option>
																				</AutoComplete>
																			</Form.Item>
																		</Col>
																		<Col md={11} sm={24}>
																			<Form.Item
																				noStyle
																				name={[field.name, 'guarantorAmount']}
																				fieldKey={[field.fieldKey, 'guarantorAmount']}
																				rules={rules}
																			>
																				<InputNumber style={{ width: '100%' }} min={0} placeholder="100"/>
																			</Form.Item>
																		</Col>
																		<Col md={1} sm={12}>
																			{/*<Icon type={"minus"} className="dynamic-delete-button" onClick={() => {
																				remove(field.name);
																			}}/>*/}
																			<MinusCircleOutlined
																				className="dynamic-delete-button"
																				onClick={() => {
																					remove(field.name)
																				}}
																			/>
																		</Col>
																	</Row>
																))}
																		<Form.Item noStyle>

																			<Button
																				type="dashed"
																				onClick={() => {
																					add()
																				}}
																				style={{ width: '100%' }}
																			>
																				<PlusOutlined/> Add Guarantor
																				{/*<Icon type={"plus"} /> Add field*/}
																			</Button>

																		</Form.Item>
															</div>
														)
													}}
												</Form.List>

												<Form.Item>
													<Button
														type="primary"
														htmlType="submit"
														// loading={confirmMPESAPayment.tracker ? confirmMPESAPayment.tracker.status === "loading" : false}
													>
														Apply Loan
													</Button>

												</Form.Item>
											</Form>
										</React.Fragment>
									)
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			/*</Authorize>*/
		)
	}
}


const WrappedApplyLoan = withRouter(ApplyLoan)

const entityObject = {}
entityObject[Entities.myWallets.name] = {
	readMany: true,
}

entityObject[Entities.users.name] = {
	readMany: true,
}

entityObject[Entities.loanTypes.name] = {
	readMany: true,
}

entityObject[Entities.myLoans.name] = {
	create: true,
}

const ConnectedApplyLoan = () => (
	<ActionContainer entityObject={entityObject}>
		{(props) => <WrappedApplyLoan {...props} />}
	</ActionContainer>
)

export default ConnectedApplyLoan
