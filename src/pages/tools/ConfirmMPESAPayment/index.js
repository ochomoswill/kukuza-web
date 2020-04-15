import React from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { Button, Descriptions, Form, Input, InputNumber, PageHeader, Result } from 'antd'
import { Entities } from '../../../redux/constants'
import ActionContainer from '../../../redux/ActionContainer'
import { getUserDetails } from '../../../utils/Session'
import numberUtils from '../../../utils/number'
import timeUtils from '../../../utils/datetime'

// @Form.create()
class ConfirmMPESAPayment extends React.Component {
	confirmMPESAPaymentFormRef = React.createRef();
	state = {
		confirmMPESAPayment: { data: [], tracker: undefined },
		transactionDesc: 'CONTRIBUTION',
		contributionMade: {
			status: false,
			type: 'MpesaExpress', // "LipaNaMpesa
		},
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

		Entities.confirmMPESAPayment.fnConfirmMPESAPayment(handleRequest, reqParams)
	}

	componentDidMount() {
		this.setPhoneNumberField()

	}


	setPhoneNumberField = () => {
		if (getUserDetails() !== undefined) {
			this.confirmMPESAPaymentFormRef.current.setFieldsValue({
				phoneNumber:  getUserDetails().phoneNumber
			})
		}
	}


	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.confirmMPESAPayment.readOne) {
			if (prevProps.confirmMPESAPayment.readOne !== this.props.confirmMPESAPayment.readOne) {
				const { tracker, data } = this.props.confirmMPESAPayment.readOne
				const { confirmMPESAPayment } = this.state


				if (tracker.status === 'loading') {
					const theConfirmMPESAPayment = confirmMPESAPayment
					theConfirmMPESAPayment.tracker = tracker
					this.setState({
						confirmMPESAPayment: theConfirmMPESAPayment,
					})


				}
				if (tracker.status === 'success') {
					let contributionMade = {}
					contributionMade['status'] = true
					const theConfirmMPESAPayment = confirmMPESAPayment
					theConfirmMPESAPayment.tracker = tracker
					theConfirmMPESAPayment.data = data
					this.setState({
						confirmMPESAPayment: theConfirmMPESAPayment,
						contributionMade,
					})
				}


				if (tracker.status === 'error') {
					let contributionMade = {}
					contributionMade['status'] = true
					const theConfirmMPESAPayment = confirmMPESAPayment
					theConfirmMPESAPayment.tracker = tracker
					this.setState({
						confirmMPESAPayment: theConfirmMPESAPayment,
						contributionMade,
					})
				}
			}
		}

	}

	onFinish = values => {
		this.confirmMPESAPayment({
			type: 'MISC',
			paymentReference: values.paymentReference,
			phoneNumber: values.phoneNumber,
		})
	}

	resetForm = () => {
		const contributionMade = {
			status: false,
		}
		this.setState({ ...this.state, contributionMade })

		setTimeout(() => {
			this.setPhoneNumberField()
		}, 1000)

	}


	render() {

		const layout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 16 },
		}
		const tailLayout = {
			wrapperCol: { offset: 8, span: 16 },
		}


		const { contributionMade, confirmMPESAPayment } = this.state

		const { form } = this.props

		//console.log("my wallets ", myWallets);
		console.log('contributionMade ', contributionMade)
		console.log('confirmMPESAPayment ', confirmMPESAPayment)

		return (

			<div>
				{/*<Authorize roles={['admin']} redirect to="/dashboard/beta">*/}
				<Helmet title="Confirm M-PESA Payment"/>


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
									title="Confirm M-PESA Payment"
									subTitle="Confirm a transaction's status"
								/>


								{
									contributionMade.status ? (
										<React.Fragment>
											{
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
											}

										</React.Fragment>
									) : (
										<React.Fragment>
											<Form
												ref={this.confirmMPESAPaymentFormRef}
												{...layout}
												onFinish={this.onFinish}
											>
												<Form.Item
													label="Payment Reference"
													name={"paymentReference"}
													rules={[{ required: true, message: 'Please input the Payment Reference!' }]}
												>
														<Input placeholder={'ODE4HOE15I'}/>
												</Form.Item>

												<Form.Item
													label="Phone Number"
													name={'phoneNumber'}
													rules={[{ required: true, message: 'Please input the Phone Number!' }]}
												>
														<InputNumber style={{ width: '100%' }} min={0}/>
												</Form.Item>

												<Form.Item>
													<Button type="primary" htmlType="submit"
																	loading={confirmMPESAPayment.tracker ? confirmMPESAPayment.tracker.status === 'loading' : false}>
														Confirm Payment
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


const WrappedConfirmMPESAPayment = withRouter(ConfirmMPESAPayment)

const entityObject = {}
entityObject[Entities.myWallets.name] = {
	readMany: true,
}

entityObject[Entities.stkPush.name] = {
	create: true,
}

entityObject[Entities.confirmMPESAPayment.name] = {
	readOne: true,
}

const ConnectedConfirmMPESAPayment = () => (
	<ActionContainer entityObject={entityObject}>
		{(props) => <WrappedConfirmMPESAPayment {...props} />}
	</ActionContainer>
)

export default ConnectedConfirmMPESAPayment
