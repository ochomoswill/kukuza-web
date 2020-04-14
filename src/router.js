import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Loadable from 'react-loadable'

import Loader from 'components/LayoutComponents/Loader'
import IndexLayout from 'layouts'
import NotFoundPage from 'pages/404'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  })

const routes = [
  // System Pages
  {
    path: '/user/login',
    component: loadable(() => import('pages/user/login')),
    exact: true,
  },
  {
    path: '/user/signup',
    component: loadable(() => import('pages/user/signup')),
    exact: true,
  },
  {
    path: '/user/forgot-password',
    component: loadable(() => import('pages/user/forgot')),
    exact: true,
  },

  // Dashboards
  {
    path: '/dashboard/alpha',
    component: loadable(() => import('pages/dashboard/alpha')),
  },

  // Contributions
  {
    path: '/contributions/make',
    component: loadable(() => import('pages/contributions/MakeContributions')),
  },
  {
    path: '/contributions/view',
    component: loadable(() => import('pages/contributions/ViewContributions')),
  },
  // Loans
  {
    path: '/loans/apply',
    component: loadable(() => import('pages/loans/ApplyLoan')),
  },
  {
    path: '/loans/view',
    component: loadable(() => import('pages/loans/MyLoans')),
  },
  {
    path: '/loans/quarantor-requests',
    component: loadable(() => import('pages/loans/GuarantorshipRequests')),
  },
  // Kins
  {
    path: '/kins/view',
    component: loadable(() => import('pages/kins/ViewKins')),
  },
  // Me
  {
    path: '/me/profile',
    component: loadable(() => import('pages/me/Profile')),
  },
  {
    path: '/me/documents',
    component: loadable(() => import('pages/me/Documents')),
  },
  {
    path: '/me/change-password',
    component: loadable(() => import('pages/me/ChangePassword')),
  },
	{
		path: '/tools/confirm-mpesa-payment',
		component: loadable(() => import('pages/tools/ConfirmMPESAPayment')),
	},
]

class Router extends React.Component {
  render() {
    const { history } = this.props
    return (
      <ConnectedRouter history={history}>
        <IndexLayout>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/dashboard/alpha" />} />
            {routes.map(route => (
              <Route
                path={route.path}
                component={route.component}
                key={route.path}
                exact={route.exact}
              />
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </IndexLayout>
      </ConnectedRouter>
    )
  }
}

export default Router
