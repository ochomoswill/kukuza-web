import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Alert, AutoComplete, Collapse, DatePicker, Icon, Select, Steps, Timeline } from 'antd'
import { Helmet } from 'react-helmet'
import { Link , withRouter, Prompt} from 'react-router-dom'
import styles from './style.module.scss'

/* Redux stuff */
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userActions from 'redux/users/actions'
import * as sysActions from 'redux/sys/actions'
import * as integrationActions from 'redux/integrations/actions'
import * as userSelectors from 'redux/users/selectors'
import * as sysSelectors from 'redux/sys/selectors'
import * as integrationSelectors from 'redux/integrations/selectors'

import timeUtils from 'utils/datetime'
import mpesaImage from 'assets/images/mpesa_logo.png'

const Step = Steps.Step;

const mapStateToProps = state => {
  return {
    users: userSelectors.getUsers(state),
    newUser: userSelectors.getNewUser(state),
    preRegRef: sysSelectors.getPreRegRef(state),
    paymentStatus: integrationSelectors.getPaymentStatus(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    sysActions: bindActionCreators(sysActions, dispatch),
    integrationActions: bindActionCreators(integrationActions, dispatch),
  }
};

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@Form.create()
class Login extends Component {
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
  };

  componentDidMount() {
    this.props.sysActions.fetchPreRegReference()
  }

  componentDidUpdate = () => {
    const {shouldBlockNavigation} = this.state;

    if (shouldBlockNavigation.status) {
      window.onbeforeunload = () => true
    } else {
      window.onbeforeunload = undefined
    }
  };

  next() {
    const current = this.state.current + 1;
    this.setState({current})
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({current})

    //console.log()

    //this.props.form.setFieldsValue(this.state.formValues);
  }

  onChangeCategory = value => {
    this.setState({
      categoryValue: value,
    })
  };

  handleSubmit = e => {
    let shouldBlockNavigation = {
      status: true,
      message:
        'Are you sure you want to leave, without signing up! Just pay the registration fees and we are done. Click Cancel to continue with sign up while Click OK to leave the page',
    };

    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        console.log(timeUtils.formatDate(values.dateOfBirth));

        this.setState({
          ...this.state,
          formValues: values,
          shouldBlockNavigation,
        });

        this.next()
      }
    })
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value})
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true})
    }
    callback()
  };

  confirmPayment = () => {
    let shouldBlockNavigation = {
      status: true,
      message:
        'If Payment Confirmation was successful, kindly ensure you click the Sign Up button before you leave! Click Cancel to continue with sign up while Click OK to leave the page',
    };

    this.props.integrationActions.confirmPayment(
      'FIRST TIME REGISTRATION',
      this.props.preRegRef.data,
    );

    this.setState({
      ...this.state,
      shouldBlockNavigation,
    })
  };

  handleSignUp = () => {
    if (this.props.paymentStatus.tracker.status === 'success') {
      this.props.userActions.createUser(this.state.formValues)
    } else {
      this.setState({
        ...this.state,
        signUpApproval: false,
      })
    }
  };

  render() {
    const {
      form: {getFieldDecorator}
    } = this.props;

    const {current, formValues, shouldBlockNavigation} = this.state;
    let {categoryValue} = this.state;

    const steps = [
      {
        title: 'Personal Information',
        icon: <Icon type="user"/>,
        content: (
          <div style={{marginTop: '25px', marginBottom: '25px'}} className="row">
            <div className="col-lg-6">
              <Form.Item label="First Name">
                {getFieldDecorator('firstName', {
                  rules: [
                    {required: true, message: 'Please input your First Name!', whitespace: true},
                  ],
                })(<Input/>)}
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item label="Last Name">{getFieldDecorator('lastName')(<Input/>)}</Form.Item>
            </div>
            {/* <div className="col-lg-4">
                            <Form.Item label="Other Names">{getFieldDecorator('middleName')(<Input/>)}</Form.Item>
                        </div>*/}
            {/*<div className="col-lg-12">
                            <Form.Item label="Username">
                                {getFieldDecorator('username', {
                                    rules: [
                                        {required: true, message: 'Please input your username!', whitespace: true},
                                    ],
                                })(<Input/>)}
                            </Form.Item>
                        </div>*/}
            <div className="col-lg-6">
              <Form.Item label="Date of Birth">
                {getFieldDecorator('dateOfBirth', {
                  rules: [
                    {
                      type: 'object',
                    },
                    {
                      required: true,
                      message: 'Please input your Date of Birth!',
                    },
                  ],
                })(<DatePicker style={{width: '100%'}}/>)}
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item label="ID No. / Passport No.">
                {getFieldDecorator('idNumber', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your ID No. / Passport No.!',
                      whitespace: true,
                    },
                  ],
                })(<Input/>)}
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ],
                })(<Input/>)}
              </Form.Item>
            </div>

            <div className="col-lg-6">
              <Form.Item label="Phone Number">
                {getFieldDecorator('phone', {
                  rules: [{required: true, message: 'Please input your phone number!'}],
                })(<Input style={{width: '100%'}}/>)}
              </Form.Item>
            </div>

            {/*<div className="col-lg-12">
                        <Form.Item
                            label="Select County"
                            hasFeedback
                        >
                            {getFieldDecorator('county', {
                                rules: [
                                    { required: true, message: 'Please select your county!' },
                                ],
                            })(
                                <Select placeholder="Please select a county" style={{width: '100%'}}>
                                    <Option value="nairobi">Nairobi</Option>
                                    <Option value="kisumu">Kisumu</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </div>*/}

            <div className="col-lg-12">
              <Form.Item label="Password">
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input.Password type="password"/>)}
              </Form.Item>
            </div>

            <div className="col-lg-12">
              <Form.Item label="Confirm Password">
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
              </Form.Item>
            </div>
          </div>
        ),
      },
      {
        title: 'Registration Fees',
        icon: <Icon type="credit-card"/>,
        content: (
          <div style={{marginTop: '25px', marginBottom: '25px'}} className="row">
            <div className="col-lg-12">
              <h4 className="text-black mb-3">
                <strong>Payment using MPESA</strong>
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
                  Enter the Account No. <strong>{this.props.preRegRef.data}</strong>
                </Timeline.Item>
                <Timeline.Item>Enter the Amount 1000</Timeline.Item>
                <Timeline.Item>Enter your PIN</Timeline.Item>
              </Timeline>
            </div>
            <div className="col-lg-5">
              <img src={mpesaImage} width="100%"/>
            </div>

            <div className="col-lg-12" style={{marginBottom: '20px'}}>
              {this.props.newUser.tracker.status === 'success' ? (
                <Alert
                  message="Registration was successful"
                  description={
                    'A confirmation email has been sent to your email, ' +
                    this.props.newUser.data.emailAddress
                  }
                  type="success"
                  closable={true}
                  showIcon
                />
              ) : null}

              {this.props.paymentStatus.tracker.status === 'success' ? (
                <Alert
                  message="Registration Payment was successful"
                  description={
                    'Your payment of ' + this.props.paymentStatus.data.amount + ' was received.'
                  }
                  type="success"
                  closable={true}
                  showIcon
                />
              ) : null}

              {this.props.paymentStatus.tracker.status === 'error' ? (
                <Alert
                  message="Registration Payment was unsuccessful"
                  description={this.props.paymentStatus.tracker.errors}
                  type="error"
                  closable={true}
                  showIcon
                />
              ) : null}

              {this.props.newUser.tracker.status === 'error' ? (
                <Alert
                  message="Registration was unsuccessful"
                  description={this.props.newUser.tracker.errors}
                  type="error"
                  closable={true}
                  showIcon
                />
              ) : null}

              {this.state.signUpApproval === false ? (
                <Alert
                  message="Sign Up was unsuccessful"
                  description="Payment of Registration Fees was not confirmed!"
                  type="error"
                  closable={true}
                  showIcon
                />
              ) : null}
            </div>

            <div className="col-lg-12">
              <h4 className="text-black mb-3">
                <strong>Confirm Payment</strong>
              </h4>
            </div>
            <div className="col-lg-8">
              <p className="text-black">
                After receiving the MPESA Confirmation Message, Click the{' '}
                <strong>Confirm Payment</strong> button to confirm you transaction.
              </p>
            </div>
            <div className="col-lg-4">
              <Button
                type="success"
                loading={this.props.paymentStatus.tracker.status === 'processing'}
                style={{float: 'right'}}
                onClick={() => this.confirmPayment()}
              >
                Confirm Payment
              </Button>
            </div>
          </div>
        ),
      },
    ];

    return (
      <div>
        <Helmet title="Login" />
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
                  <h4>
                    Hello, who’s this?
                  </h4>
                  <br />

                  <Prompt when={shouldBlockNavigation.status} message={shouldBlockNavigation.message}/>
                  <div className="row">
                    <div className="col-lg-12">
                      <Steps style={{marginBottom: '20px'}} current={current}>
                        {steps.map(item => (
                          <Step key={item.title} title={item.title} icon={item.icon}/>
                        ))}
                      </Steps>

                      <div className="steps-content">{steps[this.state.current].content}</div>
                      <div className="steps-action form-actions">
                        {this.state.current < steps.length - 1 && (
                          <Button type="primary" className="width-150 mr-4" onClick={this.handleSubmit}>
                            Next
                          </Button>
                        )}
                        {this.state.current === steps.length - 1 && (
                          <Button
                            type="primary"
                            className="width-150 mr-4"
                            loading={this.props.newUser.tracker === 'processing'}
                            disabled={this.props.paymentStatus.tracker.status !== 'success'}
                            onClick={this.handleSignUp}
                          >
                            Sign Up
                          </Button>
                        )}
                        {this.state.current > 0 && (
                          <Button
                            style={{marginLeft: 8}}
                            className="width-150 mr-4"
                            onClick={() => this.prev()}
                          >
                            Previous
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/*<Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                    <Form.Item label="Username" extra={"You can use your Username/Phone No. (2547..)/Email/Acc. No."}>
                      {form.getFieldDecorator('username', {
                        rules: [
                          {
                            type: 'string',
                            message: 'The input is not a valid username',
                          },
                          {
                            required: true,
                            message: 'Please input your username',
                          },
                        ],
                      })(<Input
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        size="default"/>)}
                    </Form.Item>
                    <Form.Item label="Password">
                      {form.getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your password'}],
                      })(<Input.Password
                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="Password"/>)}
                    </Form.Item>
                    <div className="mb-2">
                      <a href="javascript: void(0);" onClick={() => this.props.history.push("/user/forgot-password")} className="utils__link--blue utils__link--underlined">
                        Forgot password
                      </a>
                    </div>
                    <div className="form-actions">
                      <Button
                        type="primary"
                        className="width-150 mr-4"
                        htmlType="submit"
                        loading={loading}
                      >
                        Log In
                      </Button>

                      <span className="ml-3 register-link">
                            Already a member? {' '}
                        <a
                          href="javascript: void(0);"
                          onClick={() => this.props.history.push('/user/login')}
                          className="utils__link--blue utils__link--underlined"
                        >
                                                Log In
                                            </a>
                        </span>
                      <Button
                            className="width-100"
                            htmlType="button"
                            onClick={() => this.props.dispatch(push('/signup'))}
                        >
                            Sign Up
                        </Button>
                    </div>
                    <div className="form-group">
                      <p>Use another service to Log In</p>
                      <div className="mt-2">
                        <a href="javascript: void(0);" className="btn btn-icon mr-2">
                          <i className="icmn-facebook" />
                        </a>
                        <a href="javascript: void(0);" className="btn btn-icon mr-2">
                          <i className="icmn-google" />
                        </a>
                        <a href="javascript: void(0);" className="btn btn-icon mr-2">
                          <i className="icmn-windows" />
                        </a>
                        <a href="javascript: void(0);" className="btn btn-icon mr-2">
                          <i className="icmn-twitter" />
                        </a>
                      </div>
                    </div>
                  </Form>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);
