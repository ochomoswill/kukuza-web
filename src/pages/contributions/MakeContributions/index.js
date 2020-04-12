import React from 'react'
import { Helmet } from 'react-helmet'
import Authorize from 'components/LayoutComponents/Authorize'
import {withRouter} from 'react-router-dom'
import {PageHeader, Form, Input, Checkbox, Button, Tabs, Timeline, Icon} from 'antd'
import mpesaImage from 'assets/images/mpesa_logo.png'

const { TabPane } = Tabs;


class MakeContributions extends React.Component {
	onFinish = values => {
		console.log('Success:', values);
	};

	onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

  render() {

		const layout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 16 },
		};
		const tailLayout = {
			wrapperCol: { offset: 8, span: 16 },
		};

    return (

      <div>
        {/*<Authorize roles={['admin']} redirect to="/dashboard/beta">*/}
          <Helmet title="Make Contributions" />



          <div className="row">
            <div className="col-lg-12">
              <div className="card border" style={{borderRadius: 2}}>
                <div className="card-body">
									<PageHeader
										style={{
											borderBottom: "1px solid rgb(235, 237, 240)",
											margin: "-25px -32px 20px -32px"
										}}
										className="site-page-header"
										//onBack={() => null}
										title="Make Contributions"
										subTitle="Top up your account"
									/>



											<Form
												{...layout}
												name="basic"
												initialValues={{ remember: true }}
												onFinish={this.onFinish}
												onFinishFailed={this.onFinishFailed}
											>
												<Form.Item
													label="Account"
													name="acc"
													rules={[{ required: true, message: 'Please select an Account!' }]}
												>
													<Input />
												</Form.Item>

												<Form.Item
													label="Amount"
													name="amount"
													rules={[{ required: true, message: 'Please input the amount!' }]}
												>
													<Input />
												</Form.Item>

												<Form.Item
													label="Reference"
													name="reference"
													rules={[{ required: true, message: 'Please input your transaction reference!' }]}
												>
													<Input />
												</Form.Item>


												<Tabs defaultActiveKey="1" size={"small"} style={{ marginBottom: 32 }}>
													<TabPane tab="M-PESA Express" key="1">
														<div className="row">
															<div className="col-lg-12 mb-4">
																<h4 className="text-black">
																	Payment using MPESA
																</h4>
															</div>
															<div className="col-lg-7">
																<Timeline>
																	<Timeline.Item>Enter your M-PESA registered transacting Phone Number in the text box below</Timeline.Item>
																	<Timeline.Item>Click ‘Pay Now‘</Timeline.Item>
																	<Timeline.Item>Immediately check your Mobile Phone Handset for a payment request from Safaricom M-PESA</Timeline.Item>
																	<Timeline.Item>Enter your MPESA PIN to complete transaction</Timeline.Item>
																</Timeline>
															</div>
															<div className="col-lg-5">
																<img src={mpesaImage} width="50%"/>
															</div>
														</div>

														<div className={"row"}>
															<div className={"col-lg-12"}>
																<Form {...layout} onSubmit={this.handleSubmit}>

																	<Form.Item
																		label="Phone Number"
																		name="phoneNo"
																		rules={[{ required: true, message: 'Please input the phone number!' }]}
																	>
																		<Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }}/>} />
																	</Form.Item>
																	{/*<Form.Item label={"Phone Number"}>
																			<Input
																				prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }}/>}
																				placeholder="Phone Number"
																			/>
																	</Form.Item>*/}
																	<div style={{borderTop: "1px solid rgb(235, 237, 240)", paddingTop: 10}}>
																		<Button
																			style={{background: "green", borderColor: "green"}}
																			type="primary"
																			htmlType="submit"
																			className="login-form-button"
																			// loading={resetPasswordTracker.status === 'loading'}
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
																		Enter the Account No. <strong>C0N019</strong>
																	</Timeline.Item>
																	<Timeline.Item>Enter the Amount 1000</Timeline.Item>
																	<Timeline.Item>Enter your PIN</Timeline.Item>
																</Timeline>
															</div>
															<div className="col-lg-5">
																<img src={mpesaImage} width="50%"/>
															</div>
														</div>

														<div className={"row"}>
															<div className={"col-lg-12"}>
																<Form {...layout} onSubmit={this.handleSubmit}>

																	<Form.Item
																		label="M-PESA No."
																		name="mPesaNo"
																		rules={[{ required: true, message: 'Please input the received M-PESA No.!' }]}
																	>
																		<Input />
																	</Form.Item>
																	{/*<Form.Item label={"Phone Number"}>
																			<Input
																				prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }}/>}
																				placeholder="Phone Number"
																			/>
																	</Form.Item>*/}
																	<div style={{borderTop: "1px solid rgb(235, 237, 240)", paddingTop: 10}}>
																		<Button
																			style={{background: "green", borderColor: "green"}}
																			type="primary"
																			htmlType="submit"
																			// loading={resetPasswordTracker.status === 'loading'}
																		>
																			Submit
																		</Button>
																	</div>
																</Form>
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

											</Form>


                </div>
              </div>
            </div>
          </div>
        </div>
      /*</Authorize>*/
    )
  }
}

export default withRouter(MakeContributions)
