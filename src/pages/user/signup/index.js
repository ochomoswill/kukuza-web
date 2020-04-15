import React, { Component } from 'react'
import { Alert, Button, DatePicker, Form, Icon, Input, Result, Steps, Timeline , Tabs, Collapse} from 'antd'
import { Helmet } from 'react-helmet'
import { Prompt, withRouter } from 'react-router-dom'
import styles from './style.module.scss'
/* Redux stuff */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from 'redux/users/actions'
import * as sysActions from 'redux/sys/actions'
import * as userSelectors from 'redux/users/selectors'
import * as sysSelectors from 'redux/sys/selectors'

import timeUtils from 'utils/datetime'
import mpesaImage from 'assets/images/mpesa_logo.png'
import CustomAlert from '../../../components/KukuzaComponents/CustomAlert'
import { PhoneOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'

const Step = Steps.Step
const { Panel } = Collapse;

const mapStateToProps = state => {
	return {
		users: userSelectors.getUsers(state),
		newUser: userSelectors.getNewUser(state),
		preRegRef: sysSelectors.getPreRegRef(state),
	}
}

const mapDispatchToProps = dispatch => {
	return {
		userActions: bindActionCreators(userActions, dispatch),
		sysActions: bindActionCreators(sysActions, dispatch),
	}
}

const { TabPane } = Tabs;
/*@connect(
	mapStateToProps,
	mapDispatchToProps,
)*/
// @Form.create()
class SignUp extends Component {
	state = {
		categoryValue: undefined,
		current: 0,
		confirmDirty: false,
		autoCompleteResult: [],
		formValues: {},
		signUpApproval: null,
		shouldBlockNavigation: {
			status: false,
			message: 'Are you sure you want to leave?',
		},
		messageBar: {
			show: false,
			type: 'info',
			title: '',
			description: '',
		},
		resetPasswordTracker: false,
		showMpesaExpress: false,
		applicationSubmitted: false,
		paymentSubmitted: false
	}

	componentDidMount() {
		// this.props.sysActions.fetchPreRegReference()
	}

	componentDidUpdate = () => {
		const { shouldBlockNavigation } = this.state

		if (shouldBlockNavigation.status) {
			window.onbeforeunload = () => true
		} else {
			window.onbeforeunload = undefined
		}
	}

	next() {
		const current = this.state.current + 1
		this.setState({ current })
	}

	prev() {
		const current = this.state.current - 1
		this.setState({ current })

		//console.log()

		//this.props.form.setFieldsValue(this.state.formValues);
	}

	onChangeCategory = value => {
		this.setState({
			categoryValue: value,
		})
	}

	handleSubmit = e => {
		let shouldBlockNavigation = {
			status: true,
			message:
				'Are you sure you want to leave, without signing up! Just pay the registration fees and we are done. Click Cancel to continue with sign up while Click OK to leave the page',
		}

		e.preventDefault()

		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values)

				console.log(timeUtils.formatDate(values.dateOfBirth))

				this.setState({
					...this.state,
					formValues: values,
					shouldBlockNavigation,
				})

				this.next()
			}
		})
	}

	handleConfirmBlur = e => {
		const value = e.target.value
		this.setState({ confirmDirty: this.state.confirmDirty || !!value })
	}

	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!')
		} else {
			callback()
		}
	}

	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true })
		}
		callback()
	}

	confirmPayment = () => {
		let shouldBlockNavigation = {
			status: true,
			message:
				'If Payment Confirmation was successful, kindly ensure you click the Sign Up button before you leave! Click Cancel to continue with sign up while Click OK to leave the page',
		}

		this.props.integrationActions.confirmPayment(
			'FIRST TIME REGISTRATION',
			this.props.preRegRef.data,
		)

		this.setState({
			...this.state,
			shouldBlockNavigation,
		})
	}

	handleSignUp = () => {
		/*if (this.props.paymentStatus.tracker.status === 'success') {
			this.props.userActions.createUser(this.state.formValues)
		} else {
			this.setState({
				...this.state,
				signUpApproval: false,
			})
		}*/
	}

	onFinish = values => {
		console.log('Success:', values)
	}

	onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	render() {

		const { shouldBlockNavigation } = this.state

		const { resetPasswordTracker, messageBar, applicationSubmitted, paymentSubmitted } = this.state

		return (
			<div>
				<Helmet title="Login"/>
				<div className={`${styles.title} login-heading`}>
					<h1 className="mb-3 text-white">
						<strong>Apply Now</strong>
					</h1>
				</div>
				<div className={styles.block}>
					<div className="row">
						<div className="col-xl-12">
							<div className={styles.inner}>
								<div className={styles.form}>

									{
										applicationSubmitted ? (
											<React.Fragment>
												{
													applicationSubmitted &&
													<Result
														status={"success"}
														title={"Application request submitted successfully"}
														subTitle={<p>To complete the application process, pay the registration fee of <b>KES. 1000</b>. Payment instructions have been sent to your email, <b>ochomoswill@gmail.com</b>. You can alternatively pay now below.</p>}
														extra={[
															<Button
																type="primary"
																key="console"
																onClick={() => this.setState({
																	...this.state,
																	showMpesaExpress: true
																})}
															>
																Pay Now with M-PESA Express
															</Button>,
															<Button
																//type="primary"
																key="console"
																onClick={() => this.props.history.push('/user/login')}
															>
																Return to Log In
															</Button>
														]}
													>

													</Result>
												}


												{
													this.state.showMpesaExpress &&
													<div>
														<div className="row">
															{/*<div className="col-lg-12">
																<h4 className="text-black mb-3">
																	<strong>Payment using MPESA</strong>
																</h4>
															</div>*/}
															<div className="col-lg-7">
																<Timeline>
																	<Timeline.Item>Enter your M-PESA registered transacting Phone Number in the text box below</Timeline.Item>
																	<Timeline.Item>Click ‘Pay Now‘</Timeline.Item>
																	<Timeline.Item>Immediately check your Mobile Phone Handset for a payment request from Safaricom M-PESA</Timeline.Item>
																	<Timeline.Item>Enter your MPESA PIN to complete transaction</Timeline.Item>
																</Timeline>
															</div>
															<div className="col-lg-5">
																<img src={mpesaImage} width="100%"/>
															</div>
														</div>

														<div className={"row"}>
															<div className={"col-lg-12"}>
																<Form onSubmit={this.handleSubmit} className="login-form">
																	<Form.Item
																		label={"Phone Number"}
																		name={"stkPushReceiver"}
																		rules={[{ required: true, message: 'Please input your phone number!' }]}
																	>
																			<Input
																				prefix={<PhoneOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}
																				placeholder="Phone Number"
																			/>
																	</Form.Item>
																	<div className="form-actions">
																		<Button
																			style={{background: "green", borderColor: "green"}}
																			type="primary"
																			htmlType="submit"
																			className="login-form-button"
																			loading={resetPasswordTracker.status === 'loading'}>
																			Pay Now
																		</Button>
																	</div>
																</Form>
															</div>
														</div>
													</div>
												}
											</React.Fragment>
										) : (
											<React.Fragment>
												<h4>
													Hello, who’s this?
												</h4>
												<br/>

												<CustomAlert
													show={messageBar.show}
													title={messageBar.title}
													description={messageBar.description}
													type={messageBar.type}
													showIcon={true}
												/>

												<Form
													layout={"vertical"}
													onFinish={this.onFinish}
													onFinishFailed={this.onFinishFailed}
													className="login-form">
													<Form.Item
														label={"Full Name"}
														name={"fullName"}
														rules={[{ required: true, message: 'Please input your full name!' }]}
														extra={"Format: [FirstName] [MiddleName] [Surname]"}
													>
															<Input
																prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}
																placeholder="Full Name"
															/>
													</Form.Item>

													<Form.Item
														label={"Email Address"}
														name={"email"}
														rules={[{ required: true, message: 'Please input your email address!', type: 'email' }]}
													>
															<Input
																prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}
																placeholder="Email Address"
															/>
													</Form.Item>

													<Form.Item
														label={"Phone Number"}
														name={"phoneNo"}
														rules={[{ required: true, message: 'Please input your phone number!' }]}
													>

															<Input
																prefix={<PhoneOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}
																placeholder="Phone Number"
															/>
													</Form.Item>
													<div className="form-actions">
														<Button
															type="primary"
															htmlType="submit"
															className="login-form-button"
															onClick={() => this.setState({...this.state, applicationSubmitted: true})}
															loading={resetPasswordTracker.status === 'loading'}>
															Apply Now
														</Button>

														<span className="ml-3 register-link">
															<a
																href="#!" onClick={(ev) => {
																	ev.preventDefault();
																	this.props.history.push('/user/login')
															}}
																className="text-primary utils__link--underlined">
																Return to Log In
															</a>
														</span>
													</div>
												</Form>
											</React.Fragment>
										)
									}

									<Prompt when={shouldBlockNavigation.status} message={shouldBlockNavigation.message}/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(SignUp)
