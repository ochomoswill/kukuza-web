import React from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { Button, Form, Icon, Input, PageHeader, Select, Tabs, Timeline, InputNumber, Result } from 'antd'
import mpesaImage from 'assets/images/mpesa_logo.png'
import { Entities } from '../../../redux/constants'
import ActionContainer from '../../../redux/ActionContainer'
import { getUserDetails } from '../../../utils/Session'
import numberUtils from '../../../utils/number'

const { TabPane } = Tabs

const { Option } = Select

@Form.create()
class MakeContributions extends React.Component {
	state = {
		showPaymentOptions: false,
		myWallets: { data: [], tracker: undefined},
		initiateStkPush: { data: [], tracker: undefined},
		confirmMPESAPayment: { data: [], tracker: undefined},
		transactionDesc: "CONTRIBUTION",
		contributionMade: {
			status: false,
			type: "MpesaExpress" // "LipaNaMpesa
		}
	}

	fetchMyWallets = () => {
		const { handleRequest } = this.props

		const reqParams = {
			getParams: {
				activePage: this.props.location.pathname,
				page: -1,
				pageSize: -1,
			},
		}

		Entities.myWallets.fnGetMyWallets(handleRequest, reqParams)
	}

	initiateStkPush = ({amount, phoneNumber, accountReference, transactionDesc}) => {
		const { handleRequest } = this.props

		const reqParams = {
			getParams: {
				activePage: this.props.location.pathname,
				amount,
				phoneNumber,
				accountReference,
				transactionDesc
			},
		}

		Entities.stkPush.fnInitiateStkPush(handleRequest, reqParams)
	}


	confirmMPESAPayment = ({type, paymentReference, phoneNumber}) => {
		const { handleRequest } = this.props

		const reqParams = {
			getParams: {
				activePage: this.props.location.pathname,
				type,
				paymentReference,
				phoneNumber
			},
		}

		Entities.confirmMPESAPayment.fnConfirmMPESAPayment(handleRequest, reqParams)
	}

	componentDidMount() {
		this.fetchMyWallets();
	}


	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.myWallets.readMany) {
			if (prevProps.myWallets.readMany !== this.props.myWallets.readMany) {
				const { tracker, data } = this.props.myWallets.readMany
				const {myWallets} = this.state;



				if (tracker.status === 'loading') {
					const theMyWallets = myWallets;
					theMyWallets.tracker = tracker;
					this.setState({
						myWallets: theMyWallets
					})


				}
				if (tracker.status === 'success') {
					const theMyWallets = myWallets;
					theMyWallets.tracker = tracker;
					theMyWallets.data = data.records;
					this.setState({
						myWallets: theMyWallets
					})
				}


				if (tracker.status === 'error') {
					const theMyWallets = myWallets;
					theMyWallets.tracker = tracker;
					this.setState({
						myWallets: theMyWallets
					})
				}
			}
		}


		if (this.props.stkPush.create) {
			if (prevProps.stkPush.create !== this.props.stkPush.create) {
				const { tracker, data } = this.props.stkPush.create
				const {initiateStkPush} = this.state;



				if (tracker.status === 'loading') {
					const theInitiateSTKPush = initiateStkPush;
					theInitiateSTKPush.tracker = tracker;
					this.setState({
						initiateStkPush: theInitiateSTKPush
					})


				}
				if (tracker.status === 'success') {
					const theInitiateSTKPush = initiateStkPush;
					theInitiateSTKPush.tracker = tracker;
					theInitiateSTKPush.data = data;
					this.setState({
						initiateStkPush: theInitiateSTKPush
					})
				}


				if (tracker.status === 'error') {
					const theInitiateSTKPush = initiateStkPush;
					theInitiateSTKPush.tracker = tracker;
					this.setState({
						initiateStkPush: theInitiateSTKPush
					})
				}
			}
		}


		if (this.props.confirmMPESAPayment.readOne) {
			if (prevProps.confirmMPESAPayment.readOne !== this.props.confirmMPESAPayment.readOne) {
				const { tracker, data } = this.props.confirmMPESAPayment.readOne
				const {confirmMPESAPayment} = this.state;



				if (tracker.status === 'loading') {
					const theConfirmMPESAPayment = confirmMPESAPayment;
					theConfirmMPESAPayment.tracker = tracker;
					this.setState({
						confirmMPESAPayment: theConfirmMPESAPayment
					})


				}
				if (tracker.status === 'success') {
					const theConfirmMPESAPayment = confirmMPESAPayment;
					theConfirmMPESAPayment.tracker = tracker;
					theConfirmMPESAPayment.data = data;
					this.setState({
						confirmMPESAPayment: theConfirmMPESAPayment
					})
				}


				if (tracker.status === 'error') {
					const theConfirmMPESAPayment = confirmMPESAPayment;
					theConfirmMPESAPayment.tracker = tracker;
					this.setState({
						confirmMPESAPayment: theConfirmMPESAPayment
					})
				}
			}
		}

	}

	onSubmit = event => {
		event.preventDefault()
		const { form } = this.props
		form.validateFieldsAndScroll((error, values) => {
			if (!error) {

				console.log('Values ', values)


				this.setState({
					...this.state,
					showPaymentOptions: true,
				})


				setTimeout(() => {
					// server validate
					if (getUserDetails() !== undefined) {
						this.props.form.setFields({
							phoneNo: {
								value: getUserDetails().phoneNumber,
							},
						});
					}
				}, 500);
			}
		})
	}

	handleMpesaExpressSubmit = (event) => {
		event.preventDefault()
		const { form } = this.props
		form.validateFieldsAndScroll(['wallet', 'amount', 'phoneNo'], (error, values) => {
			if (!error) {

				console.log('MpesaExpress Values ', values);
				const {transactionDesc} = this.state;

				setTimeout(() => {
					this.setState({
						...this.state,
						contributionMade: {
							status: true,
							type:"MpesaExpress"
						}
					})
				}, 2000);

				this.initiateStkPush({
					amount:values.amount,
					phoneNumber: numberUtils.sanitizeMobileNo(values.phoneNo),
					accountReference: this.getContributionId(),
					transactionDesc
				})
			}
		})
	}


	handleLipaNaMpesaSubmit = (event) => {
		event.preventDefault()
		const { form } = this.props
		form.validateFieldsAndScroll(['wallet', 'amount',  'mPesaTransactionNo'], (error, values) => {
			if (!error) {

				console.log('LipaNaMpesa Values ', values);

				setTimeout(() => {
					let contributionMade = {};
					contributionMade["status"] = true;
					contributionMade["type"] = "LipaNaMpesa";
					this.setState({
						...this.state,
						contributionMade
					})
				}, 2000);

				this.confirmMPESAPayment({
					type: "MISC",
					paymentReference: values.mPesaTransactionNo,
					phoneNumber: getUserDetails().phoneNumber
				})

			}
		})
	}

	getContributionId = () => {
		if(getUserDetails() !== undefined){
			let accNo = getUserDetails().accountNumber;
			let strArr = accNo.split('-');
			return `CON${strArr[strArr.length - 1]}`;
		}

		return "Something is Wrong";

	}

	render() {

		const layout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 16 },
		}
		const tailLayout = {
			wrapperCol: { offset: 8, span: 16 },
		}


		const { showPaymentOptions, myWallets, contributionMade, initiateStkPush, confirmMPESAPayment } = this.state

		const { form } = this.props

		//console.log("my wallets ", myWallets);
		console.log("contributionMade ", contributionMade);
		console.log("confirmMPESAPayment ", confirmMPESAPayment);

		return (

			<div>
				{/*<Authorize roles={['admin']} redirect to="/dashboard/beta">*/}
				<Helmet title="Make Contributions"/>


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
									title="Make Contributions"
									subTitle="Top up your account"
								/>


								{
									contributionMade.status ? (
										<React.Fragment>

											{
												!!initiateStkPush.tracker && initiateStkPush.tracker.status === "success"  &&
												<Result
													status={"success"}
													title={"Contribution request submitted successfully"}
													subTitle={<p>Immediately check your Mobile Phone Handset for a payment request from Safaricom M-PESA. Enter your MPESA PIN to complete transaction. You will receive an M-PESA message confirming your transaction shortly after.</p>}
													extra={[
														<Button
															//type="primary"
															key="console"
															style={{background: "#46be8a", color: "#ffffff", border: "none"}}
															onClick={() => this.props.history.push('/contributions/view')}
														>
															View Contributions
														</Button>
													]}
												>
												</Result>
											}


											{
												!!confirmMPESAPayment.tracker &&  confirmMPESAPayment.tracker.status === "success"  &&
												<Result
													status={"success"}
													title={"Contribution request submitted successfully"}
													subTitle={<p>Contribution has been received.</p>}
													extra={[
														<Button
															//type="primary"
															key="console"
															style={{background: "#46be8a", color: "#ffffff", border: "none"}}
															onClick={() => this.props.history.push('/contributions/view')}
														>
															View Contributions
														</Button>
													]}
												>
												</Result>
											}


											{
												!!initiateStkPush.tracker && initiateStkPush.tracker.status === "error" &&
												<Result
													status={"error"}
													title={"Contribution request submission failed"}
													subTitle={<p>{initiateStkPush.tracker.error[0]}</p>}
													extra={[
														<Button
															//type="primary"
															key="console"
															style={{background: "#46be8a", color: "#ffffff", border: "none"}}
															onClick={() => {
																const contributionMade = {
																	status: false,
																	type: "MpesaExpress"
																}
																this.setState({...this.state, contributionMade })}
															}
														>
															Retry
														</Button>
													]}
												>
												</Result>
											}

											{
												!!confirmMPESAPayment.tracker &&  confirmMPESAPayment.tracker.status === "error" &&
												<Result
													status={"error"}
													title={"Contribution request submission failed"}
													subTitle={<p>{confirmMPESAPayment.tracker.error[0]}</p>}
													extra={[
														<Button
															//type="primary"
															key="console"
															style={{background: "#46be8a", color: "#ffffff", border: "none"}}
															onClick={() => {
																const contributionMade = {
																	status: false,
																	type: "LipaNaMpesa"
																}
																this.setState({...this.state, contributionMade })}
															}
														>
															Retry
														</Button>
													]}
												>
												</Result>
											}

										</React.Fragment>
									): (
										<React.Fragment>
											<Form
												{...layout}
												onSubmit={this.onSubmit}
											>
												<Form.Item
													label="Wallet"
												>
													{form.getFieldDecorator('wallet', {
														rules: [{ required: true, message: 'Please select a Wallet!' }],
													})(
														<Select placeholder="Please select a Wallet">

															{
																myWallets.data.length > 0 ?
																	myWallets.data.map((myWallet) => (
																		<Option key={myWallet.id} value={myWallet.id}>{myWallet.walletName}</Option>
																	)): []
															}
														</Select>,
													)}

												</Form.Item>

												<Form.Item
													label="Amount"
												>
													{form.getFieldDecorator('amount', {
														rules: [{ required: true, message: 'Please input the amount!' }],
													})(
														<InputNumber min={0}/>,
													)}
												</Form.Item>

												{/*<Form.Item
										label="Reference"
									>
										{form.getFieldDecorator('reference', {
											rules: [{ required: true, message: 'Please input your transaction reference!' }],
										})(
											<Input/>,
										)}
									</Form.Item>*/}

												<Form.Item>

													{
														!showPaymentOptions &&
														<Button type="primary" htmlType="submit">
															Contribute
														</Button>
													}


												</Form.Item>
											</Form>

											{
												showPaymentOptions &&
												<Tabs defaultActiveKey="1" size={'small'} style={{ marginBottom: 32 }}>
													<TabPane tab="M-PESA Express" key="1">
														<div className="row">
															<div className="col-lg-12 mb-4">
																<h4 className="text-black">
																	Payment using MPESA
																</h4>
															</div>
															<div className="col-lg-7">
																<Timeline>
																	<Timeline.Item>Enter your M-PESA registered transacting Phone Number in the text box
																		below</Timeline.Item>
																	<Timeline.Item>Click ‘Pay Now‘</Timeline.Item>
																	<Timeline.Item>Immediately check your Mobile Phone Handset for a payment request from
																		Safaricom M-PESA</Timeline.Item>
																	<Timeline.Item>Enter your MPESA PIN to complete transaction</Timeline.Item>
																</Timeline>
															</div>
															<div className="col-lg-5">
																<img src={mpesaImage} width="50%"/>
															</div>
														</div>

														<div className={'row'}>
															<div className={'col-lg-12'}>
																<Form
																	{...layout}
																	onSubmit={this.handleMpesaExpressSubmit}>

																	<Form.Item
																		label="Phone Number"
																	>
																		{form.getFieldDecorator('phoneNo', {
																			rules: [{ required: true, message: 'Please input the phone number!' }],
																		})(
																			<Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
																		)}

																	</Form.Item>

																	<div style={{ borderTop: '1px solid rgb(235, 237, 240)', paddingTop: 10 }}>
																		<Button
																			style={{ background: 'green', borderColor: 'green' }}
																			type="primary"
																			htmlType="submit"
																			className="login-form-button"
																			loading={initiateStkPush.tracker ? initiateStkPush.tracker.status === 'loading': false}
																		>
																			Pay Now
																		</Button>
																	</div>
																</Form>
															</div>
														</div>
													</TabPane>
													<TabPane tab="Lipa na M-PESA" key="2">
														<div className="row">
															<div className="col-lg-12 mb-4">
																<h4 className="text-black">
																	Payment using MPESA
																</h4>
															</div>
															<div className="col-lg-7">
																<Timeline>
																	<Timeline.Item>Go to Safaricom SIM Toolkit on your mobile phone</Timeline.Item>
																	<Timeline.Item>Click on MPESA</Timeline.Item>
																	<Timeline.Item>Click on Lipa na M-PESA</Timeline.Item>
																	<Timeline.Item>Click on Paybill</Timeline.Item>
																	<Timeline.Item>
																		Enter the Business No. <strong>926056</strong>
																	</Timeline.Item>
																	<Timeline.Item>
																		Enter the Account No. <strong>{this.getContributionId()}</strong>
																	</Timeline.Item>
																	<Timeline.Item>Enter the Amount <strong>{numberUtils.NumberToKES(this.props.form.getFieldValue("amount"))}</strong></Timeline.Item>
																	<Timeline.Item>Enter your PIN</Timeline.Item>
																	<Timeline.Item>You will receive an M-PESA message confirming your transaction shortly after. The Payment Reference Number e.g ODE4XXX15I, can be used to confirm the payment.</Timeline.Item>
																</Timeline>
															</div>
															<div className="col-lg-5">
																<img src={mpesaImage} width="50%"/>
															</div>
														</div>

														<div className={'row'}>
															<div className={'col-lg-12'}>
																{/*<Form
																	{...layout}
																	onSubmit={this.handleLipaNaMpesaSubmit}>*/}

																	{/*<Form.Item
																		label="M-PESA Transaction No."
																	>
																		{form.getFieldDecorator('mPesaTransactionNo', {
																			rules: [{ required: true, message: 'Please input the received M-PESA No.!' }],
																		})(
																			<Input/>
																		)}
																	</Form.Item>*/}
																	<div style={{ borderTop: '1px solid rgb(235, 237, 240)', paddingTop: 10 }}>
																		<Button
																			type="primary"
																			onClick={() => this.props.history.push("/contributions/view")}
																		>
																			View Contributions
																		</Button>

																		<Button
																			style={{marginLeft: 10}}
																			type="outline"
																			onClick={() => this.props.history.push("/tools/confirm-mpesa-payment")}
																		>
																			Confirm Payment
																		</Button>
																		{/*<Button
																			style={{background: "green", color: "#ffffff", border: "none"}}
																			type="primary"
																			htmlType="submit"
																			// disabled={true}
																			// loading={resetPasswordTracker.status === 'loading'}
																		>
																			Submit
																		</Button>*/}
																	</div>
																{/*</Form>*/}
															</div>
														</div>
													</TabPane>

													<TabPane tab="Visa (Coming Soon)" disabled key="3">
														Hold on, VISA is coming soon
													</TabPane>
													<TabPane tab="MasterCard (Coming Soon)" disabled key="4">
														Hold on, MasterCard is coming soon
													</TabPane>
													<TabPane tab="Paypal (Coming Soon)" disabled key="5">
														Hold on, Paypal is coming soon
													</TabPane>
												</Tabs>
											}
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


const WrappedMakeContributions = withRouter(MakeContributions)

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

const ConnectedMakeContributions = () => (
	<ActionContainer entityObject={entityObject}>
		{(props) => <WrappedMakeContributions {...props} />}
	</ActionContainer>
)

export default ConnectedMakeContributions
