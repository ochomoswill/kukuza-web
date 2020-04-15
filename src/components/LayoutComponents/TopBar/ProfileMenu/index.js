import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from "../../../../redux/auth/actions"

import {withRouter} from "react-router-dom"
import { Menu, Dropdown, Avatar, Badge, Modal } from 'antd'
import { FormattedMessage } from 'react-intl'
import styles from './style.module.scss';
import { ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons'
import { logoutUser } from '../../../../redux/auth/actions'
import { logout } from '../../../../utils/Session'


const { confirm } = Modal;






// @connect(mapStateToProps, mapDispatchToProps)
// @connect(({ user, authReducer }) => ({ user, authReducer }), mapDispatchToProps)
class ProfileMenu extends React.Component {
  state = {
    count: 7,
  }

  logout = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'user/LOGOUT',
    })
  }

  addCount = () => {
    let { count } = this.state
    count += 1
    this.setState({
      count,
    })
  }

	 showLogoutConfirm = (e) => {
  	e.preventDefault();
		confirm({
			title: 'Exit the System',
			icon: <ExclamationCircleOutlined />,
			content: 'Are you sure you would like to exit the system',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk : () => {
				/*const { dispatch } = this.props
				dispatch(logoutUser());*/
				this.props.history.push("/user/login");
				this.props.authActions.logoutUser();
				logout();
			}
		});
	}

  render() {
    const { authReducer } = this.props
    const { count } = this.state
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <strong>
            <FormattedMessage id="topBar.profileMenu.hello" />, {`${authReducer.user.firstName} ${authReducer.user.otherNames} ${authReducer.user.lastName}` || 'Anonymous'}
          </strong>
          <div>
            <strong className="mr-1">
              <FormattedMessage id="topBar.profileMenu.accNo" />:{' '}
            </strong>
            {authReducer.user.accountNumber}
          </div>
          <div>
            <strong>
              <FormattedMessage id="topBar.profileMenu.role" />:{' '}
            </strong>
            {/*{user.role}*/}
            {authReducer.user.userAccountType[1]}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <div>
            <strong>
              <FormattedMessage id="topBar.profileMenu.email" />:{' '}
            </strong>
            {/*{user.email}*/}
						{authReducer.user.emailAddress}
            <br />
            <strong>
              <FormattedMessage id="topBar.profileMenu.phone" />:{' '}
            </strong>
            {/*{user.phone || '-'}*/}
            {authReducer.user.phoneNumber || '-'}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="#!">
            <i className={`${styles.menuIcon} icmn-user`} />
            <FormattedMessage id="topBar.profileMenu.editProfile" />
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="#!" onClick={this.showLogoutConfirm}>
            <i className={`${styles.menuIcon} icmn-exit`} />
            <FormattedMessage id="topBar.profileMenu.logout" />
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
    	<React.Fragment>
				{
					!!authReducer.user &&
					<Dropdown
						overlay={menu}
						trigger={['click']}
						// onVisibleChange={this.addCount}
					>
						<div className={styles.dropdown}>
							{/*<Badge count={count}>*/}
							<Avatar className={styles.avatar} shape="square" size="large" icon={<UserOutlined/>} />
							{/*</Badge>*/}
						</div>
					</Dropdown>
				}

			</React.Fragment>
    )
  }
}


const mapStateToProps = ({ authReducer }) => ({  authReducer });

const mapDispatchToProps = dispatch => {
	return {
		authActions: bindActionCreators(authActions, dispatch),
	}
}

const ConnectedProfileMenu = connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);

export default withRouter(ConnectedProfileMenu)
