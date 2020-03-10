import React from 'react'
import { Helmet } from 'react-helmet'
import Authorize from 'components/LayoutComponents/Authorize'
import PaymentCard from 'components/CleanUIComponents/PaymentCard'
import PaymentAccount from 'components/CleanUIComponents/PaymentAccount'
import ChartCard from 'components/CleanUIComponents/ChartCard'
import {withRouter} from 'react-router-dom'
import {Button, Icon} from 'antd'

/* Redux Stuff */
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as transactionActions from 'redux/transactions/actions'
import * as walletActions from 'redux/wallets/actions'
import * as transactionSelectors from 'redux/transactions/selectors'
import * as walletSelectors from 'redux/wallets/selectors'
import numberUtils from 'utils/number'
import globalVariables from 'utils/global'

const mapStateToProps = state => {
  return {
    myTransactions: transactionSelectors.getAllMyTransactions(state),
    myWallets: walletSelectors.getAllMyWallets(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    transactionActions: bindActionCreators(transactionActions, dispatch),
    walletActions: bindActionCreators(walletActions, dispatch),
  }
};

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class DashboardAlpha extends React.Component {
  state = {
    pageSize: 10,
    pageNumber: 1,
    filterObj: {},
    shareCapital: 25000,
    userDetails: {
      accountNumber: 'NIL',
      userAccountType: 'NIL',
    },
  };

  componentWillMount() {
    /*if (globalVariables.getUserDetails()) {
      let updatedUserDetails = {
        accountNumber: globalVariables.getUserDetails().user.accountNumber,
        userAccountType: globalVariables.getUserDetails().user.userAccountType[1],
      };

      this.setState({
        ...this.state,
        userDetails: updatedUserDetails,
      })
    }*/
  }

  componentDidMount() {
    console.log('Here is the user data ', globalVariables.getUserDetails());

    const {pageSize, pageNumber, filterObj} = this.state;
    this.props.transactionActions.fetchAllMyTransactions(pageSize, pageNumber, filterObj);
    this.props.walletActions.fetchAllMyWallets()
  }

  render() {

    let guarantors = 0;

    console.log(this.props.myWallets);

    const {
      shareCapital,
      totalContributions,
      bookBalance,
      loanAllowable,
      loan,
      tracker,
    } = this.props.myWallets;
    const {userDetails} = this.state;

    return (

      <div>
        {/*<Authorize roles={['admin']} redirect to="/dashboard/beta">*/}
        <Helmet title="Dashboard Alpha" />
        <div className="utils__title utils__title--flat mb-3">
          <strong className="text-uppercase font-size-16">General Statistics</strong>
        </div>
        <div className="row">
          <div className="col-xl-3">
            <ChartCard
            title={'Transactions'}
            // amount={this.props.myTransactions.pagination.total}
            amount={"KES 0"}
            chartProps={{
              width: 0,
              height: 0,
              lines: [],
            }}
          />

            <div className="row">
              <div className="col-sm-8">
                <span className="text-info" style={{padding: '8px'}}>
                  View your Transactions?
                </span>
              </div>

              <div className="col-sm-4">
                <Button
                  style={{marginBottom: '20px', float: 'right'}}
                  type="primary"
                  onClick={() => this.props.history.push('/view-contributions')}
                >
                  View Transactions
                  <Icon type="right"/>
                </Button>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <ChartCard
              title={'Total Contributions'}
              //amount={'KES ' + numberUtils.numberWithCommas(totalContributions.toFixed(2))}
              amount={'KES 0'}
              chartProps={{
                width: 0,
                height: 0,
                lines: [],
              }}
            />

            <div className="row">
              <div className="col-sm-8">
                <span className="text-info" style={{padding: '8px'}}>
                  Contribute more?{' '}
                </span>
              </div>

              <div className="col-sm-4">
                <Button
                  style={{marginBottom: '20px', float: 'right'}}
                  type="primary"
                  onClick={() => this.props.history.push('/make-contributions')}
                >
                  Make Contribution
                  <Icon type="right"/>
                </Button>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <ChartCard
              title={'Book Balance'}
              // amount={'KES ' + numberUtils.numberWithCommas(bookBalance.toFixed(2))}
              amount={'KES 0'}
              chartProps={{
                width: 0,
                height: 0,
                lines: [],
              }}
            />
            <div className="row">
              <div className="col-sm-8">
                <span className="text-info" style={{padding: '8px'}}>
                  Contribute more?{' '}
                </span>
              </div>

              <div className="col-sm-4">
                <Button
                  style={{marginBottom: '20px', float: 'right'}}
                  type="primary"
                  onClick={() => this.props.history.push('/make-contributions')}
                >
                  Make Contribution
                  <Icon type="right"/>
                </Button>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <ChartCard
              title={'Loan + Interest'}
              // amount={'KES ' + numberUtils.numberWithCommas(loan.toFixed(2))}
              amount={'KES 0'}
              chartProps={{
                width: 0,
                height: 0,
                lines: [],
              }}
            />
            <div className="row">
              <div className="col-sm-8">
                <span className="text-info" style={{padding: '8px'}}>
                  Like to apply for a loan?
                </span>
              </div>

              <div className="col-sm-4">
                <Button
                  style={{marginBottom: '20px', float: 'right'}}
                  type="primary"
                  onClick={() => this.props.history.push('/apply-loan')}
                >
                  Apply Loan
                  <Icon type="right"/>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="utils__title utils__title--flat mb-3">
          <span className="text-uppercase font-size-16">Account Details</span>
          {/*<Button className="ml-3">View All</Button>*/}
        </div>

        <div className="row">
          <div className="col-lg-4">
            <PaymentCard
              icon={'icmn-coin-dollar'}
              name={'Share Capital'}
              // number={userDetails.accountNumber}
              number={"K001-001-003"}
              //type={userDetails.userAccountType}
              type={"Account Type"}
              /*footer={"Expires at 02/20"}*/
              sum={'KES ' + numberUtils.numberWithCommas(shareCapital.toFixed(2))}
            />
          </div>
          <div className="col-lg-4">
            <PaymentCard
              icon={'icmn-drawer'}
              name={'Loan Allowable'}
              //number={userDetails.accountNumber}
              number={"LN001"}
              type={'VERIFIED'}
              /*footer={"Expires at 03/22"}*/
              // sum={'KES ' + numberUtils.numberWithCommas(loanAllowable.toFixed(2))}
              sum={'KES 0'}
            />
          </div>
          <div className="col-lg-4">
            <PaymentCard
              icon={'icmn-user-check'}
              name={'Guarantors'}
              // number={userDetails.accountNumber}
              number={"K001-001-003"}
              type={'0'}
              /*footer={"Locked Temporary"}*/
              sum={'KES 0.00'}
            />
          </div>
        </div>
        <div className="utils__title utils__title--flat mb-3">
          <span className="text-uppercase font-size-16">Profile Details</span>
          {/*<Button className="ml-3">View All</Button>*/}
        </div>
        <div className="row">


          {/* pending - warning , success - success*/}
          <div className="col-lg-4">
            <PaymentAccount
              icon={'icmn-radio-checked'}
              number={'KYC Details'}
              footer={'Documents and Personal Information'}
              sum={'Pending'}
              iconType={'warning'}
              handleOnClick={() => this.props.history.push('/my-documents')}
            />
          </div>
          <div className="col-lg-4">
            <PaymentAccount
              icon={'icmn-radio-checked'}
              number={'Kin Details'}
              footer={'Next of Kin Information'}
              sum={'Pending'}
              iconType={'warning'}
              handleOnClick={() => this.props.history.push('/kin-details')}
            />
          </div>
          <div className="col-lg-4">
            <PaymentAccount
              icon={'icmn-radio-checked'}
              number={'User Profile'}
              footer={'Personal Information and Profile'}
              sum={'Pending'}
              iconType={'warning'}
              disabled={true}
              handleOnClick={() => this.props.history.push('/profile')}
            />
          </div>
          {/*<div className="col-lg-4">
                        <PaymentAccount
                            icon={'icmn-radio-checked'}
                            number={'Bank Details'}
                            footer={'Debit and Credit Account'}
                            sum={'Pending'}
                            iconType={'warning'}
                            disabled={true}
                            handleOnClick={() => this.props.history.push('/kin-details')}
                        />
                    </div>*/}
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                [src\pages\dashboard\alpha\index.js]
              </div>
            </div>
          </div>
        </div>
      </div>
      /*</Authorize>*/
    )
  }
}

export default withRouter(DashboardAlpha)
