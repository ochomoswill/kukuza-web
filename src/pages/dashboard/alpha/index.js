import React from 'react'
import { Helmet } from 'react-helmet'
import PaymentCard from 'components/CleanUIComponents/PaymentCard'
import PaymentAccount from 'components/CleanUIComponents/PaymentAccount'
import DashboardCard from 'components/CleanUIComponents/DashboardCard'
import { withRouter } from 'react-router-dom'
import { Button, Icon, Alert, Table } from 'antd'
import numberUtils from 'utils/number'
import { getUserDetails } from '../../../utils/Session'
import { Entities } from '../../../redux/constants'
import ActionContainer from '../../../redux/ActionContainer'
import {RightOutlined} from '@ant-design/icons'
import timeUtils from '../../../utils/datetime'


class DashboardAlpha extends React.Component {
	state = {
		myTransactions: undefined,
		myTransactionsTracker: undefined,
		myWallets: undefined,
		pageSize: 10,
		pageNumber: 1,
		filterObj: {},
		shareCapital: 25000,
		userDetails: {
			accountNumber: 'NIL',
			userAccountType: 'NIL',
		},
	}

	componentWillMount() {
		if (getUserDetails()) {
      let updatedUserDetails = {
        accountNumber: getUserDetails().accountNumber,
        userAccountType: getUserDetails().userAccountType[1],
      };

      this.setState({
        ...this.state,
        userDetails: updatedUserDetails,
      })
    }
	}

	componentDidMount() {
		console.log('Here is the user data ', getUserDetails())

		// this.props.transactionActions.fetchAllMyTransactions(pageSize, pageNumber, filterObj);
		this.fetchMyTransactions()


		// this.props.walletActions.fetchAllMyWallets()
		this.fetchMyWallets()
	}


	fetchMyTransactions = () => {
		const { handleRequest } = this.props

		const reqParams = {
			getParams: {
				activePage: this.props.location.pathname,
				page: -1,
				pageSize: -1,
			},
		}

		Entities.myTransactions.fnGetMyTransactions(handleRequest, reqParams)
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


	componentDidUpdate(prevProps, prevState, snapshot) {
		/* Compare Login Props */

		if (this.props.myTransactions.readMany) {
			if (prevProps.myTransactions.readMany !== this.props.myTransactions.readMany) {
				const { tracker, data } = this.props.myTransactions.readMany


				if (tracker.status === 'loading') {
					this.setState({
						...this.state,
						myTransactionsTracker: tracker,
					})

				}
				if (tracker.status === 'success') {
					console.log('my transactions fetch a success')
					this.setState({
						...this.state,
						myTransactions: data,
						myTransactionsTracker: tracker,
					})
				}


				if (tracker.status === 'error') {
					this.setState({
						...this.state,
						myTransactionsTracker: tracker,
					})
				}
			}
		}

		if (this.props.myWallets.readMany) {
			if (prevProps.myWallets.readMany !== this.props.myWallets.readMany) {
				const { tracker, data } = this.props.myWallets.readMany


				if (tracker.status === 'loading') {
					/*this.setState({
            ...this.state,
            loginTracker: tracker,
            messageBar: {
              show: false,
              type: "info",
              title: "",
              description: ""
            }
          })*/

				}
				if (tracker.status === 'success') {
					console.log('my transactions fetch a success')
					this.setState({
						...this.state,
						myWallets: data,
					})
				}


				if (tracker.status === 'error') {
					/*this.setState({
            ...this.state,
            loginTracker: tracker,
            messageBar: {
              show: true,
              type: tracker.status,
              title: tracker.errors[0].message,
              description: tracker.errors[0].error
            }
          });*/
				}
			}
		}
	}


	render() {

		let guarantors = 0

		console.log(this.props.myWallets)
		console.log(this.props.myTransactions)


		const { userDetails, myTransactions,myTransactionsTracker, myWallets  } = this.state

		console.log('My transactions ', myTransactions)

		let shareCapital = 0;
		let totalContributions = 0;
		let bookBalance = 0;
		let loanAllowable = 0;
		let loan = 0;

		if(myWallets){
			if (myWallets.records !== undefined) {
				if (myWallets.records.length > 0) {
					let myWallet = myWallets.records[0];
					shareCapital = myWallet.shareCapital;
					bookBalance = myWallet.bookBalance;
					if (myWallet) {
						totalContributions = parseInt(myWallet.actualBalance);
						if (myWallet.bookBalance > 0) {
							loanAllowable = 3 * myWallet.bookBalance
						}
					}
				}
			}
		}

		const columns = [
			{
				title: 'Receipt No.',
				dataIndex: 'receiptNumber',
			},
			{
				title: 'Amount',
				key: 'amountTransacted',
				render: record => numberUtils.NumberToKES(record.amountTransacted),
			},
			{
				title: 'Description',
				dataIndex: 'description',
			},
			{
				title: 'Transaction Date',
				key: 'transactionDate',
				render: record => timeUtils.formatDateTime(record.transactionDate),
			},
		];



		return (
			<React.Fragment>

				<div style={{ display: 'flex', flexDirection: 'column'}}>

				<Alert message={
					<div>
						<span>Complete your profile</span>
						<Button type={"link"} size={"small"} style={{float:"right"}} onClick={() => this.props.history.push('/me/profile')}>Complete My Profile</Button>
					</div>
				} banner />

				<Alert message={
					<div>
						<span>Kindly provide your next of Kin Details</span>
						<Button type={"link"} size={"small"} style={{float:"right"}} onClick={() => this.props.history.push('/kins/view')}>Update Kin Details</Button>
					</div>
				} banner />


				<Alert message={
					<div>
						<span>Kindly provide KYC Documents</span>
						<Button type={"link"} size={"small"} style={{float:"right"}} onClick={() => this.props.history.push('/me/documents')}>Update KYC Details</Button>
					</div>
				} banner />
				</div>
				<br />

			<div>
				{/*<Authorize roles={['admin']} redirect to="/dashboard/beta">*/}
				<Helmet title="Dashboard Alpha"/>




				<div className="utils__title utils__title--flat mb-3">
					<span className="text-capitalize font-size-16">General Statistics</span>
				</div>
				<div className="row">
					<div className="col-xl-4">
						<DashboardCard
							title={'Total Contributions'}
							amount={'KES ' + numberUtils.numberWithCommas(totalContributions.toFixed(2))}
							// amount={'KES 0'}
							icon={"reconciliation"}
							link={
								<Button
									type={'link'}
									onClick={() => this.props.history.push('/contributions/view')}>
									View Contributions <Icon type={"right"}/>
								</Button>
							}
						/>
					</div>
					<div className="col-xl-4">
						<DashboardCard
							title={'Book Balance'}
							amount={'KES ' + numberUtils.numberWithCommas(bookBalance.toFixed(2))}
							icon={"wallet"}
							// amount={'KES 0'}
							link={
								<Button
									type={'link'}
									onClick={() => this.props.history.push('/contributions/make')}>
									Make Contribution <Icon type={"right"}/>
								</Button>
							}
						/>
					</div>
					<div className="col-xl-4">
						<DashboardCard
							title={'Loan + Interest'}
							amount={'KES ' + numberUtils.numberWithCommas(loan.toFixed(2))}
							icon={"dollar"}
							// amount={'KES 0'}
							link={
								<Button
									type={'link'}
									onClick={() => this.props.history.push('/loans/view')}>
										View Loans <Icon type={"right"}/>
								</Button>
							}
						/>
					</div>
				</div>
				<div className="utils__title utils__title--flat mb-3">
					<span className="text-capitalize font-size-16">
						Account Details {`- ${userDetails.accountNumber}`}
					</span>
					{/*<Button className="ml-3">View All</Button>*/}
				</div>

				<div className="row">
					<div className="col-lg-4">

						<DashboardCard
							title={'Share Capital'}
							amount={'KES ' + numberUtils.numberWithCommas(shareCapital.toFixed(2))}
							fontIcon={"icmn-coin-dollar"}
							// amount={'KES 0'}

						/>

					</div>
					<div className="col-lg-4">
						<DashboardCard
							title={'Loan Allowable'}
							amount={'KES ' + numberUtils.numberWithCommas(loanAllowable.toFixed(2))}
							fontIcon={"icmn-drawer"}
							// amount={'KES 0'}

						/>
					</div>
					<div className="col-lg-4">
						<DashboardCard
							title={'Guarantors'}
							amount={"0"}
							fontIcon={"icmn-user-check"}
							// amount={'KES 0'}

						/>
					</div>
				</div>


				<div className="utils__title utils__title--flat mb-3">
					<span className="text-capitalize font-size-16">
						Contributions
					</span>
					{/*<Button className="ml-3">View All</Button>*/}
				</div>


					<Table
						style={{background: "white"}}
						bordered={true}
						columns={columns}
						rowKey={record => record.id}
						dataSource={myTransactions ? myTransactions.records.slice(0, 5): []}
						loading={myTransactionsTracker ? myTransactionsTracker.status === 'loading' : false}
						pagination={false}
						scroll={{
							x: true,
							scrollToFirstRowOnChange: true
						}}
					/>



			</div>
			</React.Fragment>
			/*</Authorize>*/
		)
	}
}

// export default withRouter(DashboardAlpha)
const WrappedDashboard = withRouter(DashboardAlpha)


const entityObject = {}
entityObject[Entities.myTransactions.name] = {
	read: true,
	readMany: true,
}

entityObject[Entities.myWallets.name] = {
	read: true,
	readMany: true,
}
const ConnectedDashboard = () => (
	<ActionContainer entityObject={entityObject}>
		{(props) => <WrappedDashboard {...props} />}
	</ActionContainer>
)

export default ConnectedDashboard
