import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { Helmet } from 'react-helmet'
import styles from './style.module.scss'
import Icon from 'antd/es/icon'

import * as authSelectors from 'redux/auth/selectors'
import * as authActions from 'redux/auth/actions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


const mapStateToProps = state => {
  console.log('@mapStateToProps', authSelectors.getResetPwdStatus(state))
  return {
    resetPwd: authSelectors.getResetPwdStatus(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  }
}

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@Form.create()
class Forgot extends Component {
  state = {
    alert: {
      show: false,
      message: undefined,
      description: undefined,
      type: undefined,
      closable: false,
      showIcon: true,
    },
    disableAlert: {
      show: false,
      message: undefined,
      description: undefined,
      type: undefined,
      closable: false,
      showIcon: true,
    },
    loading: false,
  }

  handleSubmit = e => {
    // this.resetAlert();
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)

        if (values.email !== '') {
          //this.props.authActions.resetPassword(values.email);
        } else {
          // this.showAlert("Field Error!", "Email is required!", "error");
        }
      }
    })
  }

  render() {
    const { form: { getFieldDecorator } } = this.props

    const { resetPwd } = this.props

    return (
      <div>
        <Helmet title="Forgot"/>
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
                  <h4>
                    Forgot your password? Don’t panic!
                  </h4>
                  <br/>
                  <Form onSubmit={this.handleSubmit} className="login-form">
                    {/*{
                      alert.show &&
                      <Alert
                        message={alert.message}
                        description={alert.description}
                        type={alert.type}
                        closable={false}
                        showIcon
                      />
                    }*/}


                    <Form.Item extra="We'll send password reset link to your email.">
                      <label className="form-label mb-0">Email Address</label>
                      {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email address!' }],
                      })(
                        <Input
                          prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                          placeholder="Email Address"
                        />,
                      )}
                    </Form.Item>
                    <div className="form-actions">
                      <Button type="primary" htmlType="submit" className="login-form-button"
                              loading={resetPwd ? resetPwd.tracker === 'processing' : false}>
                        Reset Password
                      </Button>
                      <span className="ml-3 register-link">
                        <a href="javascript: void(0);" onClick={() => this.props.history.push('/user/login')}
                           className="text-primary utils__link--underlined">
                          Return to Log In
                        </a>
                      </span>
                    </div>
                    {/*<div className="form-group">
                    <span>Use another service to Log In</span>
                    <div className="mt-2">
                        <a href="javascript: void(0);" className="btn btn-icon mr-2">
                            <i className="icmn-facebook"/>
                        </a>
                        <a href="javascript: void(0);" className="btn btn-icon mr-2">
                            <i className="icmn-google"/>
                        </a>
                        <a href="javascript: void(0);" className="btn btn-icon mr-2">
                            <i className="icmn-windows"/>
                        </a>
                        <a href="javascript: void(0);" className="btn btn-icon mr-2">
                            <i className="icmn-twitter"/>
                        </a>
                    </div>
                </div>*/}
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

export default Forgot
