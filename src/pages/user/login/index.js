import React, { Component } from 'react'

import { Button, Form, Input } from 'antd'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'

import styles from './style.module.scss'
import Icon from 'antd/es/icon'
import { Entities } from '../../../redux/constants'
import ActionContainer from '../../../redux/ActionContainer'
import CustomAlert from '../../../components/KukuzaComponents/CustomAlert'
import { saveToLocalStorage } from '../../../redux/localStorage'
import { AUTH_DETAILS_LOCAL_STORAGE_KEY } from '../../../constants/General'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as authActions from '../../../redux/auth/actions'
import { LockOutlined, UserOutlined } from '@ant-design/icons'


const mapDispatchToProps = dispatch => {
	return {
		authActions: bindActionCreators(authActions, dispatch),
	}
}

class Login extends Component {
	state = {
		loginTracker: false,
		messageBar: {
			show: false,
			type: 'info',
			title: '',
			description: '',
		},
	}

	static setAuthDetails(authDetails) {
		//localStorage.setItem(General.AUTH_DETAILS_LOCAL_STORAGE_KEY, JSON.stringify(authDetails));

		saveToLocalStorage(authDetails, AUTH_DETAILS_LOCAL_STORAGE_KEY)
	}

	/*onSubmit = event => {
		event.preventDefault()
		const { form } = this.props
		form.validateFields((error, values) => {
			if (!error) {

				/!*const reqParams = {
          url: Entities.login.url,
          method: APIRequestMethod.POST,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          getParams: {
            activePage: this.props.location.pathname,
            username: values.username,
            password: btoa(values.password),
            grant_type: "password",
          }
        };

        let options = {
          reqParams,
          entity: Entities.login.name,
          typeSubString: ActionTypeSubString.create,
        };

        this.props.handleRequest(options);*!/

				const { handleRequest } = this.props

				const reqParams = {
					getParams: {
						activePage: this.props.location.pathname,
						username: values.username,
						password: btoa(values.password),
						grant_type: 'password',
					},
				}

				Entities.login.fnLogin(handleRequest, reqParams)

			}
		})
	}*/

	componentDidUpdate(prevProps, prevState, snapshot) {
		/* Compare Login Props */
		if (prevProps.login !== this.props.login) {
			const { tracker, data } = this.props.login.create


			if (tracker.status === 'loading') {
				this.setState({
					...this.state,
					loginTracker: tracker,
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
					loginTracker: tracker,
					messageBar: {
						show: true,
						type: tracker.status,
						title: 'Success!',
						description: 'Login Successful',
					},
				})

				const { accessToken, user } = data

				Login.setAuthDetails(data)


				this.props.authActions.setAccessToken(accessToken)
				this.props.authActions.setUser(user)
				this.props.authActions.setAuthenticationStatus(true)

				this.props.history.push('/dashboard/alpha')

				// Reset Login Status


				// todo Redirect to Change Password Page is Password Status is RESET
				// user_pwd_status(pin):"RESET"

				/*if (user_account.user_pwd_status === General.USER_ACC_PWD_STATUS_RESET) {
					routeTo({
						history: this.props.history,
						url: General.FORCE_CHANGE_PASSWORD_URL,
						accountType: this.myAccountType,
						state: data
					})
				} else {

				}*/
			}


			if (tracker.status === 'error') {
				this.setState({
					...this.state,
					loginTracker: tracker,
					messageBar: {
						show: true,
						type: tracker.status,
						title: tracker.errors[0].message,
						description: tracker.errors[0].error,
					},
				})


				/*this.props.showMessageBar({
					messageBarId: MessageBarIds.loginForm,
					messageBarType: MessageBarType.error,
					messageBarTitle: "Auth Failed",
					messageBarDesc: `${tracker.errors[0].error}`
				});


				this.resetAuth();
				this.fetchCaptchaSvg();*/
			}

		}

	}

	onFinish = values => {
		console.log('Success:', values);

		const { handleRequest } = this.props

		const reqParams = {
			getParams: {
				activePage: this.props.location.pathname,
				username: values.username,
				password: btoa(values.password),
				grant_type: 'password',
			},
		}

		Entities.login.fnLogin(handleRequest, reqParams)
	}

	onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	render() {

		const { loginTracker, messageBar } = this.state

		/*console.log("Log in prop ", this.props.login);

    if(this.props.login.hasOwnProperty("create")){
			const {tracker, data} = this.props.login.create;

			console.log("@create Log in prop ", this.props.login);
		}*/


		return (
			<div>
				<Helmet title="Login"/>
				<div className={`${styles.title} login-heading`}>
					<h1 className="mb-3 text-white">
						<strong>Log In</strong>
					</h1>
				</div>
				<div className={styles.block}>
					<div className="row">
						<div className="col-xl-12">
							<div className={styles.inner}>
								<div className={styles.form}>
									<h4>
										Hello, who’s this?
									</h4>
									<br/>


									{/*{
										messageBar.show ? (
											<Alert
												style={{marginBottom: 20}}
												message={messageBar.title}
												description={messageBar.description}
												type={messageBar.type}
												showIcon={true}
											/>
										): null
									}*/}

									<CustomAlert
										show={messageBar.show}
										title={messageBar.title}
										description={messageBar.description}
										type={messageBar.type}
										showIcon={true}
									/>


									<Form
										layout="vertical"
										hideRequiredMark
										onFinish={this.onFinish}
										onFinishFailed={this.onFinishFailed}
									>
										<Form.Item
											label="Username"
											name={'username'}
											rules={[
												{
													type: 'string',
													message: 'The input is not a valid username',
												},
												{
													required: true,
													message: 'Please input your username',
												},
											]}
											extra={<p>Use your <b>username</b>, <b>phone number</b>, <b>email</b> or <b>account number</b>
											</p>}
										>
											<Input
											prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}
											size="default"/>
										</Form.Item>
										<Form.Item
											label="Password"
											name={"password"}
											rules={[{ required: true, message: 'Please input your password' }]}
											extra={
												<a href="#!"
													 style={{ float: 'right' }}
													 onClick={(ev) => {
														 ev.preventDefault()
														 this.props.history.push('/user/forgot-password')
													 }
													 }
													 className="utils__link--blue utils__link--underlined">
													Forgot password
												</a>}>
											<Input.Password
												prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }}/>}
												placeholder="Password"/>
										</Form.Item>
										{/*<div className="mb-2">
                      <a href="#!" onClick={() => this.props.history.push("/user/forgot-password")} className="utils__link--blue utils__link--underlined">
                        Forgot password
                      </a>
                    </div>*/}
										<div className="form-actions">
											<Button
												type="primary"
												className="width-150 mr-4"
												htmlType="submit"
												loading={loginTracker.status === 'loading'}
											>
												Log In
											</Button>

											<span className="ml-3 register-link">
                            {/*Don't have account? {' '}*/}
												<a href="#!" onClick={(ev) => {
													ev.preventDefault()
													this.props.history.push('/user/signup')
												}}
													 className="text-primary utils__link--underlined">
                              Apply Now
                            </a>
                        </span>
										</div>
									</Form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


const ConnectedLogIn = connect(
	null,
	mapDispatchToProps
)(Login);

// export default withRouter(Login);
const WrappedLogInForm = withRouter(ConnectedLogIn)


const entityObject = {}
entityObject[Entities.login.name] = {
	create: true,
}

const ConnectedSignInForm = () => (
	<ActionContainer entityObject={entityObject}>
		{(props) => <WrappedLogInForm {...props} />}
	</ActionContainer>
)

export default ConnectedSignInForm
