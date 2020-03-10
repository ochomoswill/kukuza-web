import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { Helmet } from 'react-helmet'
import { Link , withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './style.module.scss'
import Icon from 'antd/es/icon'
import { Entities } from '../../../redux/constants'
import ActionContainer from '../../../redux/ActionContainer'
import { APIRequestMethod } from '../../../redux/flexi/services'
import { ActionTypeSubString } from '../../../redux/flexi/actions'

@Form.create()
@connect(({ user }) => ({ user }))
class Login extends Component {
  onSubmit = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields((error, values) => {
      if (!error) {

        const reqParams = {
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

        this.props.handleRequest(options);

      }
    })
  }

  render() {
    const {
      form,
      user: { loading },
    } = this.props
    return (
      <div>
        <Helmet title="Login" />
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
                  <br />
                  <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
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
                            Don't have account? {' '}
                        <a href="javascript: void(0);" onClick={() => this.props.history.push('/signup')}
                           className="text-primary utils__link--underlined">
                              Apply Now
                            </a>
                        </span>
                      {/*<Button
                            className="width-100"
                            htmlType="button"
                            onClick={() => this.props.dispatch(push('/signup'))}
                        >
                            Sign Up
                        </Button>*/}
                    </div>
                    {/*<div className="form-group">
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

// export default withRouter(Login);
const WrappedLogInForm = withRouter(Login);


const entityObject = {};
entityObject[Entities.login.name] = {
  create: true,
};

const ConnectedSignInForm = () => (
  <ActionContainer entityObject={entityObject}>
    {(props) => <WrappedLogInForm {...props} />}
  </ActionContainer>
);

export default ConnectedSignInForm;
