import React from 'react'
import { Layout, Button } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import styles from './style.module.scss'
import KukuzaWhiteLogo from "assets/images/kukuza-white-logo.svg"
import Bg2 from "assets/images/login/bg-2.jpg"

@withRouter
class LoginLayout extends React.PureComponent {
  state = {
    backgroundNumber: 1,
    backgroundEnabled: false,
  }


  isLinkActive = (refUrl) => {
  	// console.log("Current url ", this.props.location.pathname);
  	return refUrl === this.props.location.pathname;
	}

  render() {
    const { children } = this.props

    return (
      <Layout>
        <Layout.Content>
          <div
            className={`${styles.layout}`}
            style={{backgroundImage: `url(${Bg2})`}}
          >
            <div className={styles.header}>
              <div className={styles.logo}>
                <a href="#!">
                  <img
                    src={KukuzaWhiteLogo}
                    alt="Kukuza Investment Group Portal"
                  />
                </a>
              </div>
              {/*<div className={styles.controls}>
                <div className="d-inline-block mr-3">
                  <Button type="default" onClick={this.changeBackground}>
                    Change Background
                  </Button>
                </div>
                <div className="d-inline-block">
                  <Button type="default" onClick={this.toggleBackground}>
                    Toggle Background
                  </Button>
                </div>
              </div>*/}
              <nav className={styles.navigation}>
                <ul className={styles.navigationItems}>
                  <li>
                    <a href="https://kukuza.co.ke">&larr; Website</a>
                  </li>
                  <li>
                    <a
											className={this.isLinkActive("/user/login") ? styles.navigationActive: undefined}
											href="#!"
											onClick={
												(ev) => {
													ev.preventDefault();
													this.props.history.push("/user/login")}
												}
										>
                      Log In
                    </a>
                  </li>
                  <li>
                    <a
											className={this.isLinkActive("/user/signup") ? styles.navigationActive: undefined}
											href="#!"
											onClick={(ev) => {
												ev.preventDefault();
												this.props.history.push("/user/signup")}
											}>
											Apply Now
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={styles.content}>{children}</div>
            {/*<div className={`${styles.footer} text-center`}>
              <ul className="list-unstyled list-inline mb-3">
                <li className="list-inline-item">
                  <a href="#!">Terms of Use</a>
                </li>
                <li className="active list-inline-item">
                  <a href="#!">Compliance</a>
                </li>
                <li className="list-inline-item">
                  <a href="#!">Confidential Information</a>
                </li>
                <li className="list-inline-item">
                  <a href="#!">Support</a>
                </li>
                <li className="list-inline-item">
                  <a href="#!">Contacts</a>
                </li>
              </ul>
              <p>&copy; 2019 Mediatec. All rights reserved.</p>
            </div>*/}
          </div>
        </Layout.Content>
      </Layout>
    )
  }
}

export default LoginLayout;
