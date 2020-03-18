import React, { Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import { Helmet } from 'react-helmet'
import Loader from 'components/LayoutComponents/Loader'
import PublicLayout from './Public'
import LoginLayout from './Login'
import MainLayout from './Main'
import CacheBuster from '../CacheBuster'
import { getAuthToken, getLogInTime, getSessionTimeToLive, getSessionTimeUnit, getUserDetails } from '../utils/Session'
import timeUtils from '../utils/datetime'

const Layouts = {
  public: PublicLayout,
  login: LoginLayout,
  main: MainLayout,
}

@withRouter
@connect(({ user }) => ({ user }))
class IndexLayout extends React.PureComponent {
  previousPath = ''

  componentDidUpdate(prevProps) {
    const { location } = this.props
    const { prevLocation } = prevProps
    if (location !== prevLocation) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const {
      children,
      location: { pathname, search },
      user,
    } = this.props

    // NProgress Management
    const currentPath = pathname + search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    setTimeout(() => {
      NProgress.done()
      this.previousPath = currentPath
    }, 300)

    // Layout Rendering
    const getLayout = () => {
      if (pathname === '/') {
        return 'public'
      }
      if (/^\/user(?=\/|$)/i.test(pathname)) {
        return 'login'
      }
      return 'main'
    }

    const Container = Layouts[getLayout()]
    // const isUserAuthorized = user.authorized
    const isUserAuthorized = !!getAuthToken()
    // const isUserLoading = user.loading
    const isLoginLayout = getLayout() === 'login'

    const BootstrappedLayout = () => {

    	console.log("@isUserAuthorized ", isUserAuthorized);
    	console.log("@getAuthToken", getAuthToken());
    	console.log("@getUserDetails", getUserDetails());
    	console.log("@getSessionTimeToLive", getSessionTimeToLive());
    	console.log("@getSessionTimeUnit", getSessionTimeUnit());
    	console.log("@getLogInTime", timeUtils.formatDateTime(getLogInTime()));
      // show loader when user in check authorization process, not authorized yet and not on login pages
      /* if (isUserLoading && !isUserAuthorized && !isLoginLayout) {
        return <Loader />
      }*/
      // redirect to login page if current is not login page and user not authorized
      if (!isLoginLayout && !isUserAuthorized) {
        return <Redirect to="/user/login" />
      }
      // redirect to main dashboard when user on login page and authorized
			if (isLoginLayout && isUserAuthorized) {
        return <Redirect to="/dashboard/alpha" />
      }
      // in other case render previously set layout
      return (
        <React.Fragment>
          <CacheBuster>
            {({ loading, isLatestVersion, refreshCacheAndReload }) => {
              if (loading) return null
              if (!loading && !isLatestVersion) {
                refreshCacheAndReload()
              }

              return <Container title={'Some Title'}>{children}</Container>
            }}
          </CacheBuster>
        </React.Fragment>
      )
      /*return (
                <Container title={"Some Title"}>{children}</Container>
      )*/
    }

    return (
      <Fragment>
        <Helmet
          titleTemplate={`${global.appVersion} - ${process.env.REACT_APP_TITLE} | %s`}
          title="React Admin Template"
        />
        {BootstrappedLayout()}
      </Fragment>
    )
  }
}

export default IndexLayout
