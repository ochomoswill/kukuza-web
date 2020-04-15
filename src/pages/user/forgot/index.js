import React, { Component } from 'react'
import { Button, Form, Input, Result } from 'antd'
import { Helmet } from 'react-helmet'
import styles from './style.module.scss'
import Icon from 'antd/es/icon'

import * as authSelectors from 'redux/auth/selectors'
import * as authActions from 'redux/auth/actions'
import { bindActionCreators } from 'redux'
import { Entities } from '../../../redux/constants'
import { withRouter } from 'react-router'
import ActionContainer from '../../../redux/ActionContainer'
import CustomAlert from '../../../components/KukuzaComponents/CustomAlert'
import { MailOutlined } from '@ant-design/icons'


class ForgotPassword extends Component {
	state = {
		messageBar: {
			show: false,
			type: 'info',
			title: '',
			description: '',
		},
		resetPasswordTracker: false,
	}


	componentDidUpdate(prevProps, prevState, snapshot) {
		/* Compare Login Props */
		if (prevProps.resetPassword !== this.props.resetPassword) {
			const { tracker, data } = this.props.resetPassword.create


			if (tracker.status === 'loading') {
				this.setState({
					...this.state,
					resetPasswordTracker: tracker,
					messageBar: {
						show: false,
						type: 'info',
						title: '',
						description: '',
					},
				})

			}
			if (tracker.status === 'success') {
				// console.log("auth was a success");

				this.setState({
					...this.state,
					resetPasswordTracker: tracker,
					messageBar: {
						show: true,
						type: tracker.status,
						title: 'Password reset was successful.',
						description: ` A new password has been sent to ${data.emailAddress}`,
					},
				})
			}


			if (tracker.status === 'error') {
				this.setState({
					...this.state,
					resetPasswordTracker: tracker,
					messageBar: {
						show: true,
						type: tracker.status,
						title: tracker.errors[0].error,
						description: tracker.errors[0].message,
					},
				})
			}

		}

	}

	/*handleSubmit = e => {
		// this.resetAlert();
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values)

				//this.props.authActions.resetPassword(values.email);
				const { handleRequest } = this.props

				const reqParams = {
					getParams: {
						activePage: this.props.location.pathname,
						userIdentifier: values.email,
					},
				}

				Entities.resetPassword.fnResetPassword(handleRequest, reqParams)

				this.props.form.resetFields()

			}
		})
	}*/

	onFinish = values => {
		console.log('Success:', values);

		const { handleRequest } = this.props

		const reqParams = {
			getParams: {
				activePage: this.props.location.pathname,
				userIdentifier: values.email,
			},
		}

		Entities.resetPassword.fnResetPassword(handleRequest, reqParams);

		// this.props.form.resetFields()
	}

	onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}


	render() {

		const { resetPasswordTracker, messageBar } = this.state

		return (
			<div>
				<Helmet title="ForgotPassword"/>
				<div className={`${styles.title} login-heading`}>
					<h1 className="mb-3 text-white">
						<strong>Forgot Password</strong>
					</h1>
				</div>
				<div className={styles.block}>
					<div className="row">
						<div className="col-xl-12">
							<div className={styles.inner}>
								<div className={styles.form}>


									{
										resetPasswordTracker.status === 'success' ? (
											<Result
												status={messageBar.type}
												title={messageBar.title}
												subTitle={messageBar.description}
												extra={[
													<Button
														type="primary"
														key="console"
														onClick={() => this.props.history.push('/user/login')}
													>
														Return to Log In
													</Button>,
												]}
											/>
										) : (
											<React.Fragment>
												<h4>
													Forgot your password? Don’t panic!
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
														label={'Email Address'}
														name={"email"}
														rules={[{ required: true, message: 'Please input your email address!', type: 'email' }]}
														extra="We'll send password reset link to your email."
													>
															<Input
																prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}
																placeholder="Email Address"
															/>
													</Form.Item>
													<div className="form-actions">
														<Button
															type="primary"
															htmlType="submit"
															className="login-form-button"
															loading={resetPasswordTracker.status === 'loading'}>
															Reset Password
														</Button>
														<span className="ml-3 register-link">
                        <a
													href="#!" onClick={(ev) => {
													ev.preventDefault()
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

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

// export default ForgotPassword

const WrappedForgotForm = withRouter(ForgotPassword)


const entityObject = {}
entityObject[Entities.resetPassword.name] = {
	create: true,
}

const ConnectedForgotForm = () => (
	<ActionContainer entityObject={entityObject}>
		{(props) => <WrappedForgotForm {...props} />}
	</ActionContainer>
)

export default ConnectedForgotForm
